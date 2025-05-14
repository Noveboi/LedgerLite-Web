import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth-service";
import { inject } from "@angular/core";

export const isAuthenticatedGuard = (): CanActivateFn => {
    return () => {
        const auth = inject(AuthService);
        const router = inject(Router);

        if (auth.user()) {
            return true;
        }

        return router.parseUrl('auth/login')
    }
}