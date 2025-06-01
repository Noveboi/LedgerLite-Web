import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SlimAccount } from '../../accounts.types';
import { CreateAccountButtonComponent } from "../create-account-button/create-account-button.component";
import { RemoveAccountButtonComponent } from "../remove-account-button/remove-account-button.component";
import { PermissionsService } from '../../../../core/permissions/permissions.service';

@Component({
  selector: 'app-account-menu',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, CreateAccountButtonComponent, RemoveAccountButtonComponent],
  templateUrl: './account-menu.component.html',
  styleUrl: './account-menu.component.css'
})
export class AccountMenuComponent {
  private perms = inject(PermissionsService);
  account = input.required<SlimAccount>();

  canModify = this.perms.isAllowedToModify;
  stopPropagation = (e: MouseEvent) => e.stopPropagation(); 
}
