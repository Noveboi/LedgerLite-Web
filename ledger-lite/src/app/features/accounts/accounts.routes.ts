import { Routes } from "@angular/router";
import { AccountPageComponent } from "./pages/account-page/account-page.component";

export const ACCOUNT_ROUTES: Routes = [
    { path: ':id', component: AccountPageComponent }
]