import { Component, output, signal } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginRequest } from '../../login.types';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from "../../../../../components/button/button.component";

@Component({
  selector: 'app-login-form',
  imports: [MatFormField, MatInputModule, MatButtonModule, ReactiveFormsModule, MatProgressSpinnerModule, MatIconModule, ButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  protected loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  protected hide = signal(true);
  protected clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public onSubmit = output<LoginRequest>()

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