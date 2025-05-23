import { Component, input } from '@angular/core';
import { RemoveAccountButtonComponent } from "../remove-account-button/remove-account-button.component";
import { CreateAccountButtonComponent } from "../create-account-button/create-account-button.component";
import { SlimAccount } from '../../accounts.types';

@Component({
  selector: 'app-account-button-group',
  imports: [RemoveAccountButtonComponent, CreateAccountButtonComponent],
  templateUrl: './account-button-group.component.html',
  styleUrl: './account-button-group.component.css'
})
export class AccountButtonGroupComponent {
  account = input<SlimAccount>();
}
