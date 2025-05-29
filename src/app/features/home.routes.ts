import { Route } from "@angular/router";
import { HomePageComponent } from "./home/home-page/home-page.component";

export const HOME_ROUTES: Route[] = [
    { 
        path: '', 
        component: HomePageComponent, 
    },
    { 
        path: 'organizations', 
        loadChildren: () => import('./organizations/organizations.routes').then(x => x.ORG_ROUTES)
    }, 
    {
        path: 'accounts',
        loadChildren: () => import('./accounts/accounts.routes').then(x => x.ACCOUNT_ROUTES)
    }
]