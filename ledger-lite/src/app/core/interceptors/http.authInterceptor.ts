import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, defer, EMPTY, filter, Observable, retry, retryWhen, switchMap, take, throwError, timeout, timer } from "rxjs";
import { AuthService } from "../services/auth-service";
import { inject } from "@angular/core";

export const authInteceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const auth = inject(AuthService);

  let token = auth.accessToken();

  if (token && !req.url.includes('/refresh') && !req.url.includes('/login')) {
    req = authenticateRequest(req, token);
  }

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && !req.url.includes('/refresh')) {
        return handleUnauthorized(req, next, auth);
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

  return auth.refresh().pipe(
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