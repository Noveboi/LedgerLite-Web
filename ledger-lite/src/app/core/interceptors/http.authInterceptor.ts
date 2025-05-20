import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth-service";
import { inject } from "@angular/core";

export const authInteceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const auth = inject(AuthService);
    const token = auth.accessToken();
    if (token === null)
        return next(req);

    const authReq = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${token}`)
    })

    return next(authReq);
}