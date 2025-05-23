import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-account-dialog',
  imports: [MatDialogModule, MatDialogTitle, MatButtonModule],
  templateUrl: './remove-account-dialog.component.html',
  styleUrl: './remove-account-dialog.component.css'
})
export class RemoveAccountDialogComponent {
  account = inject(MAT_DIALOG_DATA);
}
