import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateAccountFormComponent } from "../create-account-form/create-account-form.component";

@Component({
  selector: 'app-create-account-dialog',
  imports: [MatDialogModule, MatButtonModule, CreateAccountFormComponent],
  templateUrl: './create-account-dialog.component.html',
  styleUrl: './create-account-dialog.component.css'
})
export class CreateAccountDialogComponent {

}
