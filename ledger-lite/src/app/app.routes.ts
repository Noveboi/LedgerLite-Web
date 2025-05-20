import { Routes } from '@angular/router';
import { AnonymousLayoutComponent } from './layout/anonymous-layout/anonymous-layout.component';
import { isAuthenticatedGuard } from './core/guards/auth.guard';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';

export const routes: Routes = [
    { 
        path: 'auth', 
        component: AnonymousLayoutComponent, 
        loadChildren: () => import('./features/auth/auth.routes').then((x) => x.AUTH_ROUTES) 
    },
    {
        path: '',
        canActivate: [isAuthenticatedGuard()],
        component: HomeLayoutComponent,
        loadChildren: () => import('./features/home/home.routes').then((x) => x.HOME_ROUTES)
    }
];
