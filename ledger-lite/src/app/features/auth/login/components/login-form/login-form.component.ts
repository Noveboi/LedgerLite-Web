import { Component, inject, output, signal } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginRequest } from '../../login.types';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AuthService } from '../../../../../core/services/auth-service';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from "../../../../../core/components/button/button.component";

@Component({
  selector: 'app-login-form',
  imports: [MatFormField, MatInputModule, MatButtonModule, ReactiveFormsModule, MatProgressSpinnerModule, MatIconModule, ButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  private auth = inject(AuthService);

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  emailValidation = signal('')
  passwordValidation = signal('')
  onSubmit = output<LoginRequest>()
  isLoading = this.auth.isLoading;

  constructor() {
    merge(this.loginForm.statusChanges, this.loginForm.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.setValidationErrors())
  }

  private setValidationErrors() {
    const controls = this.loginForm.controls;

    if (controls.username.hasError('email')) {
      this.emailValidation.set('Email is not a valid address')
    } else if (controls.username.hasError('required')) {
      this.emailValidation.set('You must enter a value')
    } 

    if (controls.password.hasError('required')) {
      this.passwordValidation.set('You must enter a value')
    }
  }

  onFormSubmit(e: SubmitEvent) {
    e.preventDefault()

    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.value;

    this.onSubmit.emit({
      email: credentials.username ?? '',
      password: credentials.password ?? ''
    })
  }
}