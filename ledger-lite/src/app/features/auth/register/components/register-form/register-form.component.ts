import { Component, computed, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterRequest } from '../../register.types';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from "../../../../../core/components/button/button.component";
import { AuthService } from '../../../../../core/services/auth-service';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, MatFormField, MatInputModule, MatButtonModule, RouterLink, ButtonComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  private auth = inject(AuthService);

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    username: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  }, (group): { [key: string]: any } | null => {
    const password = group.get('password');
    const confirm = group.get('confirmPassword');

    return null;
  })

  registerStates = RegisterStatus;
  status = signal(RegisterStatus.SubmittingRequiredCredentials);
  register = output<RegisterRequest>();
  isLoading = this.auth.isLoading;

  nextState() {
    if (this.status() >= 1) 
      return;
    this.status.update(x => x + 1);
  }

  previousState() {
    if (this.status() <= 0)
      return;

    this.status.update(x => x - 1);
  }

  invokeRegister(e?: SubmitEvent) {
    e?.preventDefault()
    
    const form = this.registerForm;
    if (form.invalid) {
      return;
    }

    const fields = form.value;
    
    this.register.emit({
      email: fields.email!,
      password: fields.password!,
      username: fields.username,
      firstName: fields.firstName,
      lastName: fields.lastName
    })
  }
}

enum RegisterStatus {
  SubmittingRequiredCredentials = 0,
  SubmittingAdditionalInformation = 1
}