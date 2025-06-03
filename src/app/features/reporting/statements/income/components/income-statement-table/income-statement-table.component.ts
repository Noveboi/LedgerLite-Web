import { Component, inject } from '@angular/core';
import { IncomeService } from '../../income.service';
import { IncomeStatement } from '../../income.types';
import { currency, pipePeriod } from '../../../../reporting.utils';
import { FiscalPeriodService } from '../../../../../fiscal-periods/services/fiscal-period.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, RowClassRules } from 'ag-grid-community'
import { AsyncPipe } from '@angular/common';
import { map, switchMap } from 'rxjs';

interface IncomeStatementData {
  title: string,
  amount: number,
  type: 'revenue' | 'direct' | 'indirect' | 'notoperating' | 'metric'
}

@Component({
  selector: 'app-income-statement-table',
  imports: [AgGridAngular, AsyncPipe],
  templateUrl: './income-statement-table.component.html',
  styleUrl: './income-statement-table.component.css'
})
export class IncomeStatementTableComponent {
  private income = inject(IncomeService);
  private period = inject(FiscalPeriodService);

  protected period$ = this.period.selectedPeriod$;
  protected current$ = pipePeriod(this.period$).pipe(
    switchMap(period => this.income.get(period)),
    map(this.transform)
  )

  protected colDefs: ColDef[] = [
    { field: 'title' },
    { field: 'amount', valueFormatter: x => currency(x.value) }
  ]

  protected rowClassRules: RowClassRules<IncomeStatementData> = {
    'metric-row': params => params.data?.type === 'metric'
  }

  private transform(inc: IncomeStatement): IncomeStatementData[] {
    return [
      { title: 'Revenue', amount: inc.revenue, type: 'revenue' },
      { title: 'Direct Expenses', amount: inc.directExpenses, type: 'direct' },
      { title: 'Gross Profit', amount: inc.grossProfit, type: 'metric' },
      { title: 'Indirect Expenses', amount: inc.indirectExpenses, type: 'indirect' },
      { title: 'Operating Profit', amount: inc.operatingProfit, type: 'metric' },
      { title: 'Interest Expense', amount: inc.interest, type: 'notoperating' },
      { title: 'Tax Expense', amount: inc.tax, type: 'notoperating' },
      { title: 'Net Profit', amount: inc.netProfit, type: 'metric' }
    ]
  }
}
