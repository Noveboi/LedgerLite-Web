import { Route } from "@angular/router";
import { HomePageComponent } from "./home/home-page/home-page.component";
import { isInOrganizationGuard } from "../core/guards/organization.guard";

export const HOME_ROUTES: Route[] = [
    { 
        path: '', 
        canActivate: [isInOrganizationGuard()],
        component: HomePageComponent,
    },
    {
        path: 'accounts',
        loadChildren: () => import('./accounts/accounts.routes').then(x => x.ACCOUNT_ROUTES)
    }
]