import { Router } from "@angular/router"
import { AuthService } from "./auth-service"

export const navigateToHomeIfAuthenticated = (auth: AuthService, router: Router) => {
    if (auth.user()) {
        router.navigate(['home']);
    }
}