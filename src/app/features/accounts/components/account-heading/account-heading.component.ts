import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Account } from '../../accounts.types';

@Component({
  selector: 'app-account-heading',
  imports: [MatIcon],
  templateUrl: './account-heading.component.html',
  styleUrl: './account-heading.component.css'
})
export class AccountHeadingComponent {
  account = input.required<Account>();
}
