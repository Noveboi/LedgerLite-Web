import { Route } from "@angular/router";
import { isInOrganizationGuard } from "../core/guards/organization.guard";
import { HomePageComponent } from "./home/home-page.component";
import { OrganizationPageComponent } from "./organizations/pages/organization-page/organization-page.component";

export const HOME_ROUTES: Route[] = [
    { 
        path: '', 
        canActivate: [isInOrganizationGuard()],
        component: HomePageComponent,
    },
    {
        path: 'accounts',
        loadChildren: () => import('./accounts/accounts.routes').then(x => x.ACCOUNT_ROUTES)
    },
    {
        path: 'reports',
        loadChildren: () => import('./reporting/reporting.routes').then(x => x.REPORTING_ROUTES)
    },
    {
        path: 'organization',
        component: OrganizationPageComponent
    }
]