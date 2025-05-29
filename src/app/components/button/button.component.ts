import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

type ButtonType = 'submit' | 'button' | 'reset';

@Component({
  selector: 'app-button',
  imports: [MatIconModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  isLoading = input(false);
  type = input<ButtonType>('button')
}
