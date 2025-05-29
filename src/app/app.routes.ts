import { Routes } from '@angular/router';
import { AnonymousLayoutComponent } from './layout/anonymous-layout/anonymous-layout.component';
import { isAuthenticatedGuard } from './core/guards/auth.guard';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { isNotInOrganizationGuard } from './core/guards/organization.guard';

export const routes: Routes = [
    { 
        path: 'auth', 
        component: AnonymousLayoutComponent, 
        loadChildren: () => import('./features/auth/auth.routes').then((x) => x.AUTH_ROUTES) 
    },
    {
        path: 'home',
        canActivate: [isAuthenticatedGuard()],
        component: HomeLayoutComponent,
        loadChildren: () => import('./features/home.routes').then((x) => x.HOME_ROUTES)
    },
    { 
        path: 'organizations', 
        canActivate: [isNotInOrganizationGuard()],
        loadChildren: () => import('./features/organizations/organizations.routes').then(x => x.ORG_ROUTES)
    }, 
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth'
    }
];
