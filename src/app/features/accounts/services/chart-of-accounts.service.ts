import { inject, Injectable } from '@angular/core';
import { Account, AccountWithLines, ChartAccountNode, ChartOfAccounts, SlimAccount } from '../accounts.types';
import { CreateAccountRequest } from '../accounts.requests';
import { ApiService } from '../../../core/services/api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FiscalPeriodService } from '../../fiscal-periods/services/fiscal-period.service';
import { LedgerSignalService } from '../../../core/services/ledger-signal.service';
import { map } from 'rxjs';

const initialChart: ChartOfAccounts = {id: '', accounts: []} 

@Injectable({
  providedIn: 'root'
})
export class ChartOfAccountsService {
  private api = inject(ApiService);
  private snackbar = inject(MatSnackBar);
  private periodService = inject(FiscalPeriodService);
  private signals = inject(LedgerSignalService);

  private selectedAccountSignal = this.signals.make<AccountWithLines | null>(null);
  private _chart$ = this.signals.makeObservable<ChartOfAccounts>(initialChart, {
    onAuthorized: () => this.getChartOfAccounts()
  })

  public chart$ = this._chart$.asObservable();
  
  selectedAccount = this.selectedAccountSignal.asReadonly();

  allAccounts$ = this._chart$.pipe(
    map(chart => this.getAllAccounts(chart))
  );

  private getAllAccounts(chart: ChartOfAccounts): SlimAccount[] {
    const accounts: SlimAccount[] = [];
    chart.accounts.forEach(node => accounts.push(...this.getAllAccountsRecursive(node)));
    return accounts;
  }

  private getAllAccountsRecursive(node: ChartAccountNode): SlimAccount[] {
    const accounts: SlimAccount[] = node.account.isControl ? [] : [node.account];
    node.children.forEach(child => accounts.push(...this.getAllAccountsRecursive(child)))
    return accounts;
  }
  
  getChartOfAccounts(): void {
    this.api.get<ChartOfAccounts>(`/accounts`).subscribe(resp => this._chart$.next(resp));
  }

  createAccount(request: CreateAccountRequest): void {
    this.api.post<Account>("/accounts", request).subscribe((resp) => {
      this.snackbar.open(`Successfully created account ${resp?.name ?? 'N/F'}!`)
      this.getChartOfAccounts();
    });
  }

  removeAccount(id: string): void {
    this.api.delete<Account>(`/accounts/${id}`).subscribe((resp) => {
      this.snackbar.open(`Removed account "${resp?.name ?? 'N/F'}"`)
      this.getChartOfAccounts();
    })
  }

  refreshSelectedAccount() { 
    const selected = this.selectedAccount();
    if (selected) {
      this.getAccount(selected.account.id);
    }
  }

  getAccount(id: string): void {
    const period = this.periodService.selectedPeriod();

    const route = `/accounts/${id}${ period ? `/period/${period.id}` : ''}`

    this.api.get<AccountWithLines>(route).subscribe(resp => this.selectedAccountSignal.set(resp));
  }
}
