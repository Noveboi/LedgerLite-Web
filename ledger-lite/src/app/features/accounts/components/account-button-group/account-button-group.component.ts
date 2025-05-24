import { Component, computed, HostListener, input, signal } from '@angular/core';
import { RemoveAccountButtonComponent } from "../remove-account-button/remove-account-button.component";
import { CreateAccountButtonComponent } from "../create-account-button/create-account-button.component";
import { SlimAccount } from '../../accounts.types';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-button-group',
  imports: [RemoveAccountButtonComponent, CreateAccountButtonComponent, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './account-button-group.component.html',
  styleUrl: './account-button-group.component.scss'
})
export class AccountButtonGroupComponent {
  account = input<SlimAccount>();
  showNavigation = input<boolean>(false);

  stopClickPropagation(e: MouseEvent) {
    e.stopPropagation();
  }
}
