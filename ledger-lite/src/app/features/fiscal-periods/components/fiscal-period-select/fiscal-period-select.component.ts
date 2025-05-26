import { Component, computed, inject } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FiscalPeriod } from '../../fiscal-periods.types';
import { FiscalPeriodService } from '../../services/fiscal-period.service';
import { AddFiscalPeriodButtonComponent } from "../add-fiscal-period-button/add-fiscal-period-button.component";

@Component({
  selector: 'app-fiscal-period-select',
  imports: [MatSelectModule, AddFiscalPeriodButtonComponent],
  templateUrl: './fiscal-period-select.component.html',
  styleUrl: './fiscal-period-select.component.css'
})
export class FiscalPeriodSelectComponent {
  private periodService = inject(FiscalPeriodService)

  selectedPeriod = this.periodService.selectedPeriod;
  fiscalPeriods = this.periodService.fiscalPeriods;

  onPeriodSelected(e: MatSelectChange<FiscalPeriod>) {
    if (!e.value) {
      throw new Error('Selected nothing.')
    }

    this.periodService.selectPeriod(e.value);
  }
}
