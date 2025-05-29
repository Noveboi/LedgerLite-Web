import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../features/auth/auth-service";
import { inject } from "@angular/core";
import { tryGetUser } from "./auth.guard";

export const isInOrganizationGuard = (): CanActivateFn => {
    return () => {
        const auth = inject(AuthService);
        const router = inject(Router);

        const user = auth.user();
        if (!user) {
            return tryGetUser(auth, router);
        }

        if (user.organization) {
            return true;
        }

        return router.parseUrl('organizations')
    }
}

export const isNotInOrganizationGuard = (): CanActivateFn => {
    return () => {
        const auth = inject(AuthService);
        const router = inject(Router);

        const user = auth.user();
        if (!user) {
            return tryGetUser(auth, router);
        }

        if (user.organization) {
            return router.parseUrl('');
        }

        return true;
    }
}