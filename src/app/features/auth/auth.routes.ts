import { Route } from "@angular/router";
import { LoginPageComponent } from "./login/pages/login-page/login-page.component";
import { RegisterPageComponent } from "./register/pages/register-page/register-page.component";

export const AUTH_ROUTES: Route[] = [
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
] 