import { Component, inject } from '@angular/core';
import { MatDialog } from "@angular/material/dialog"
import { CreateAccountFormComponent } from '../create-account-form/create-account-form.component';
import { MatButtonModule } from '@angular/material/button';
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';

@Component({
  selector: 'app-create-account-button',
  imports: [MatButtonModule],
  templateUrl: './create-account-button.component.html',
  styleUrl: './create-account-button.component.css'
})
export class CreateAccountButtonComponent {
  private dialog = inject(MatDialog)

  openCreateAccountDialog() {
    this.dialog.open(CreateAccountDialogComponent)
  }
}
