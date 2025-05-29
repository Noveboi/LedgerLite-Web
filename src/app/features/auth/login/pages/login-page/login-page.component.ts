import { Component, effect, inject } from '@angular/core';
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { AuthService } from '../../../auth-service';
import { LoginRequest } from '../../login.types';
import { Router, RouterLink } from '@angular/router';
import { navigateToHomeIfAuthenticated } from '../../../auth.utils';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private auth = inject(AuthService)
  private router = inject(Router);

  constructor() {
    effect(() => navigateToHomeIfAuthenticated(this.auth, this.router))
  }

  handleLogin(request: LoginRequest) {
    this.auth.login(request)
  }
}
