import { Component, inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community'; 
import { AccountBalance } from '../../../reporting.types';
import { TrialBalanceService } from '../../trial-balance.service';
import { FiscalPeriodService } from '../../../../fiscal-periods/services/fiscal-period.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-trial-balance-table',
  imports: [AgGridAngular],
  templateUrl: './trial-balance-table.component.html',
  styleUrl: './trial-balance-table.component.css'
})
export class TrialBalanceTableComponent {
  private trialBalance = inject(TrialBalanceService);
  private periodService = inject(FiscalPeriodService);

  current = this.trialBalance.currentTrialBalance;
  selectedPeriod = this.periodService.selectedPeriod;

  constructor() {
    if (!this.current) {
      this.trialBalance.get();
    }

    this.periodService.selectedPeriod$.pipe(takeUntilDestroyed()).subscribe(period => {
      this.trialBalance.get();
    })
  }

  colDefs: ColDef<AccountBalance>[] = [
    { headerName: 'Account', valueGetter: x => x.data?.account.name ?? ''},
    { field: 'credit', valueFormatter: x => `€${x.value?.toLocaleString() ?? '0'}`},
    { field: 'debit', valueFormatter: x => `€${x.value?.toLocaleString() ?? '0'}`}
  ]

  defaultColDefs: ColDef = {
    flex: 1
  };
}
