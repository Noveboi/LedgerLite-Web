import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/login/pages/login-page/login-page.component';
import { RegisterPageComponent } from './features/register/pages/register-page/register-page.component';
import { AnonymousLayoutComponent } from './layout/anonymous-layout/anonymous-layout.component';

export const routes: Routes = [
    { path: 'auth', component: AnonymousLayoutComponent, children: [
        { path: 'login', component: LoginPageComponent },
        { path: 'register', component: RegisterPageComponent }
    ]}
];
