import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FiscalPeriodService } from '../../services/fiscal-period.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getDateString } from '../../../../core/services/dates/dates.utilities';

@Component({
  selector: 'app-add-fiscal-period-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatInput, MatButtonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-fiscal-period-form.component.html',
  styleUrl: './add-fiscal-period-form.component.css'
})
export class AddFiscalPeriodFormComponent {
  private periodService = inject(FiscalPeriodService);
  private snackbar = inject(MatSnackBar);
  onValidSubmit = output();

  periodForm = new FormGroup({
    startDate: new FormControl<Date | null>(null, [Validators.required]),
    endDate: new FormControl<Date | null>(null, [Validators.required]),
    name: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.periodForm.invalid) {
      return;
    }

    const value = this.periodForm.value;
    if (!value.name || !value.startDate || !value.endDate) {
      throw new Error('Null fields are not valid.')
    }

    this.periodService.createFiscalPeriod({
      name: value.name,
      startDate: getDateString(value.startDate),
      endDate: getDateString(value.endDate)
    }).subscribe(resp => {
      this.snackbar.open(`Successfully created period '${resp.name}'`)
      this.onValidSubmit.emit();
      this.periodService.selectPeriod(resp);
    })
  }
}