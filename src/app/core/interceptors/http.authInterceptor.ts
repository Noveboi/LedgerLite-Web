import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, defer, EMPTY, filter, map, Observable, switchMap, take, throwError, timeout, timer } from "rxjs";
import { AuthService } from "../../features/auth/auth-service";
import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IncomeStatementPageComponent } from "../../features/reporting/pages/income-statement-page/income-statement-page.component";

export const authInteceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const auth = inject(AuthService);
  const snackbar = inject(MatSnackBar);

  let token = auth.accessToken();

  const pipedNext = (req: HttpRequest<unknown>) => { 
    return next(req).pipe(
      catchError(err => {
        if (!(err instanceof HttpErrorResponse)) 
          return throwError(() => err);

        if (err.status === 0) {
          snackbar.open('Servers are offline.')
          return EMPTY;
        }

        return throwError(() => err);
      })
    )
  }

  if (req.url.includes('/login')) {
    return pipedNext(req).pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => err);
      })
    );
  }

  if (token && !req.url.includes('/refresh')) {
    req = authenticateRequest(req, token);
  }

  return pipedNext(req).pipe(
    catchError((error: unknown) => {
      if (!(error instanceof HttpErrorResponse)){
        return throwError(() => error);
      }

      if (error.status === 401 && !req.url.includes('/refresh')) {
        return handleUnauthorized(req, next, auth);
      }

      if (error.status === 403) {
        snackbar.open('You are unauthorized to perform this action.')
      }

      return throwError(() => error);
    })
  );
}

const handleUnauthorized = (req: HttpRequest<unknown>, next: HttpHandlerFn, auth: AuthService) => {
  const addAuthorizationHeader = () => { 
    const newToken = auth.accessToken();
    if (newToken) {
      return next(authenticateRequest(req, newToken))
    }
    return throwError(() => new Error('Token refresh failed.'))
  } 
  
  if (auth.isRefreshing()) {
    return waitForRefreshCompletion(auth).pipe(
      switchMap(() => addAuthorizationHeader())
    )
  }

  return auth.refreshToken().pipe(
    switchMap(() => addAuthorizationHeader())
  );
}

const waitForRefreshCompletion = (auth: AuthService) => {
  return defer(() => {
    return timer(0, 100).pipe(
      filter(() => !auth.isRefreshing()),
      take(1),
      timeout(5000)
    )
  })
}

const authenticateRequest = (req: HttpRequest<unknown>, accessToken: string): HttpRequest<unknown> => {
  return req.clone({
    setHeaders: { Authorization: `Bearer ${accessToken}` }
  })
} 