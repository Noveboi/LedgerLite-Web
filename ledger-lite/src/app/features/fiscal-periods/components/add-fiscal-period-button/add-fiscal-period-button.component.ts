import { Component, inject, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFiscalPeriodDialogComponent } from '../add-fiscal-period-dialog/add-fiscal-period-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-fiscal-period-button',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './add-fiscal-period-button.component.html',
  styleUrl: './add-fiscal-period-button.component.css'
})
export class AddFiscalPeriodButtonComponent {
  private dialog = inject(MatDialog);

  appearance = input<'regular' | 'compact'>();

  openDialog(e: MouseEvent) {
    e.stopPropagation();
    this.dialog.open(AddFiscalPeriodDialogComponent)
  }
}
