import { Component, computed, effect, inject } from '@angular/core';
import { RegisterFormComponent } from "../../components/register-form/register-form.component";
import { RegisterRequest } from '../../register.types';
import { AuthService } from '../../../auth-service';
import { navigateToHomeIfAuthenticated } from '../../../auth.utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => navigateToHomeIfAuthenticated(this.auth, this.router))
  }

  register(request: RegisterRequest) {
    this.auth.register(request);
  }
}
