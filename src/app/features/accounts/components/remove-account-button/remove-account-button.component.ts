import { Component, inject, input } from '@angular/core';
import { SlimAccount } from '../../accounts.types';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RemoveAccountDialogComponent } from '../remove-account-dialog/remove-account-dialog.component';
import { ChartOfAccountsService } from '../../services/chart-of-accounts.service';
import { MatMenuItem } from '@angular/material/menu';

@Component({
  selector: 'app-remove-account-button',
  imports: [MatIconModule, MatButtonModule, MatMenuItem],
  templateUrl: './remove-account-button.component.html',
  styleUrl: './remove-account-button.component.css'
})
export class RemoveAccountButtonComponent {
  account = input.required<SlimAccount>();
  dialog = inject(MatDialog);
  accountService = inject(ChartOfAccountsService);

  handleRemove() {
    const dialogRef = this.dialog.open(RemoveAccountDialogComponent, {
      data: this.account
    })

    dialogRef.afterClosed().subscribe(shouldRemove => {
      const account = this.account();
      if (!shouldRemove || !account)
        return;
      
      this.accountService.removeAccount(account.id);
    })
  }
}
