import { CanActivateFn, GuardResult, MaybeAsync, Router } from "@angular/router";
import { AuthService } from "../../features/auth/auth-service";
import { inject } from "@angular/core";

export const isAuthenticatedGuard = (): CanActivateFn => {
    return () => {
        const auth = inject(AuthService);
        const router = inject(Router);

        if (auth.user()) {
            return true;
        } 

        return tryGetUser(auth, router);
    }
}

export const tryGetUser = (auth: AuthService, router: Router): MaybeAsync<GuardResult> => {
    const tokenFromStorage = auth.tryGetTokenFromSettings();
    if (tokenFromStorage) {
        auth.getUser()
        return true;
    }

    return router.parseUrl('auth/login');
}