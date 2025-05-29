import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SlimAccount } from '../../accounts.types';
import { CreateAccountButtonComponent } from "../create-account-button/create-account-button.component";
import { RemoveAccountButtonComponent } from "../remove-account-button/remove-account-button.component";

@Component({
  selector: 'app-account-menu',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, CreateAccountButtonComponent, RemoveAccountButtonComponent],
  templateUrl: './account-menu.component.html',
  styleUrl: './account-menu.component.css'
})
export class AccountMenuComponent {
  account = input.required<SlimAccount>();

  stopPropagation = (e: MouseEvent) => e.stopPropagation(); 
}
