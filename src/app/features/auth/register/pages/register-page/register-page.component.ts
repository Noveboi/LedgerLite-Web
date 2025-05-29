import { Component, computed, inject } from '@angular/core';
import { RegisterFormComponent } from "../../components/register-form/register-form.component";
import { RegisterRequest } from '../../register.types';
import { AuthService } from '../../../../../core/services/auth-service';

@Component({
  selector: 'app-register-page',
  imports: [RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  private auth = inject(AuthService);
  
  register(request: RegisterRequest) {
    this.auth.register(request);
  }
}
