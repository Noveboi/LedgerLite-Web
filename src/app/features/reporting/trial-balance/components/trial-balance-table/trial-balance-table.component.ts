import { Component, inject, signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community'; 
import { AccountBalance } from '../../../reporting.types';
import { TrialBalanceService } from '../../trial-balance.service';
import { FiscalPeriodService } from '../../../../fiscal-periods/services/fiscal-period.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TrialBalance } from '../../trial-balance.types';
import { distinct, distinctUntilChanged, filter } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-trial-balance-table',
  imports: [AgGridAngular, AsyncPipe],
  templateUrl: './trial-balance-table.component.html',
  styleUrl: './trial-balance-table.component.css'
})
export class TrialBalanceTableComponent {
  private trialBalance = inject(TrialBalanceService);
  private periodService = inject(FiscalPeriodService);

  current = signal<TrialBalance | null>(null);
  selectedPeriod$ = this.periodService.selectedPeriod$;

  constructor() {
    this.selectedPeriod$.pipe(
      takeUntilDestroyed(),
      filter(x => x !== null),
      distinct(x => x.id))
    .subscribe(period => this.trialBalance.get(period).subscribe(tb => this.current.set(tb)))
  }

  colDefs: ColDef<AccountBalance>[] = [
    { 
      headerName: 'Account', 
      valueGetter: x => x.data?.account.name ?? '',
      flex: 2
    },
    { field: 'credit', valueFormatter: x => `€${x.value?.toLocaleString() ?? '0'}`},
    { field: 'debit', valueFormatter: x => `€${x.value?.toLocaleString() ?? '0'}`}
  ]

  defaultColDefs: ColDef = {
    flex: 1
  };
}
