import {Component, input, signal} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-password-input',
  imports: [MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.css'
})
export class PasswordInputComponent {
  formControl = input.required<FormControl>();

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
