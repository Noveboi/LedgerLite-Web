import { Component, inject, signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community'; 
import { TrialBalanceService } from '../../trial-balance.service';
import { TrialBalance } from '../../trial-balance.types';
import { AsyncPipe } from '@angular/common';
import { FiscalPeriodService } from '../../../../../fiscal-periods/services/fiscal-period.service';
import { AccountBalance } from '../../../../reporting.types';
import { onPeriodSelect } from '../../../../reporting.utils';

@Component({
  selector: 'app-trial-balance-table',
  imports: [AgGridAngular, AsyncPipe],
  templateUrl: './trial-balance-table.component.html',
  styleUrl: './trial-balance-table.component.css'
})
export class TrialBalanceTableComponent {
  private trialBalance = inject(TrialBalanceService);
  private periodService = inject(FiscalPeriodService);

  protected current = signal<TrialBalance | null>(null);
  protected selectedPeriod$ = this.periodService.selectedPeriod$;

  constructor() {
    onPeriodSelect(this.selectedPeriod$, period => this.trialBalance.get(period).subscribe(tb => this.current.set(tb)))
  }

  protected colDefs: ColDef<AccountBalance>[] = [
    { 
      headerName: 'Account', 
      colId: 'account',
      valueGetter: x => x.data?.account.name ?? '',
      flex: 2
    },
    { 
      field: 'credit', 
      valueFormatter: x => `€${x.value?.toLocaleString() ?? '0'}`
    },
    { 
      field: 'debit', 
      valueFormatter: x => `€${x.value?.toLocaleString() ?? '0'}`
    }
  ]

  protected defaultColDefs: ColDef = {
    flex: 1
  };

  protected onGridReady(event: GridReadyEvent<AccountBalance, any>) {
    const api = event.api;
    const footer = this.makeFooterRow(api);
    api.setGridOption('pinnedBottomRowData', [footer]); 
  }

  private makeFooterRow(api: GridApi<AccountBalance>) {
    const trial = this.current();
    let columns: { [key: string]: any} = {};
    api.getAllGridColumns().forEach(col => columns[col.getId()] = null);

    columns['account'] = { name: 'Totals' }
    columns['debit'] = trial?.totalDebits;
    columns['credit'] = trial?.totalCredits;
    
    return columns;
  }
}
