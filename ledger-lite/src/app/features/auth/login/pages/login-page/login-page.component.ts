import { Component, inject } from '@angular/core';
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { AuthService } from '../../../../../core/services/auth-service';
import { LoginRequest } from '../../login.types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private auth = inject(AuthService)

  errors = this.auth.errors

  handleLogin(request: LoginRequest) {
    this.auth.login(request)
  }
}
