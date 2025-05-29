import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateAccountFormComponent } from "../create-account-form/create-account-form.component";
import { SlimAccount } from '../../accounts.types';
import { ChartOfAccountsService } from '../../services/chart-of-accounts.service';
import { CreateAccountRequest } from '../../accounts.requests';
import { ExternalSubmitDirective } from '../../../../directives/external-submit.directive';

@Component({
  selector: 'app-create-account-dialog',
  imports: [MatDialogModule, MatButtonModule, CreateAccountFormComponent, ExternalSubmitDirective],
  templateUrl: './create-account-dialog.component.html',
  styleUrl: './create-account-dialog.component.css'
})
export class CreateAccountDialogComponent {
  private accountService = inject(ChartOfAccountsService);
  private dialogRef = inject(MatDialogRef);
  parent: SlimAccount | undefined = inject(MAT_DIALOG_DATA);

  createAccount(request: CreateAccountRequest) {
    this.accountService.createAccount(request);
    this.dialogRef.close();
  }
}
