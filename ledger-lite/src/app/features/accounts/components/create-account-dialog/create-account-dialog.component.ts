import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CreateAccountFormComponent } from "../create-account-form/create-account-form.component";
import { SlimAccount } from '../../accounts.types';

@Component({
  selector: 'app-create-account-dialog',
  imports: [MatDialogModule, MatButtonModule, CreateAccountFormComponent],
  templateUrl: './create-account-dialog.component.html',
  styleUrl: './create-account-dialog.component.css'
})
export class CreateAccountDialogComponent {
  parent: SlimAccount | undefined = inject(MAT_DIALOG_DATA);
}
