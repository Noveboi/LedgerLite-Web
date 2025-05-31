import { Component, inject, input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog"
import { MatButtonModule } from '@angular/material/button';
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';
import { SlimAccount } from '../../accounts.types';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuItem } from '@angular/material/menu';

@Component({
  selector: 'app-create-account-button',
  imports: [MatButtonModule, MatIconModule, MatMenuItem],
  templateUrl: './create-account-button.component.html',
  styleUrl: './create-account-button.component.css'
})
export class CreateAccountButtonComponent {
  private dialog = inject(MatDialog);
  
  parent = input<SlimAccount>();
  appearance = input<'menu' | 'regular'>('regular');

  openCreateAccountDialog() {
    this.dialog.open(CreateAccountDialogComponent, {
      data: this.parent(),
      disableClose: true
    });
  }
}
