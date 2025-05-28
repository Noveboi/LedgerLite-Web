import { inject, Injectable, signal } from '@angular/core';
import { Account, AccountWithLines, ChartAccountNode, ChartOfAccounts, SlimAccount } from '../accounts.types';
import { CreateAccountRequest } from '../accounts.requests';
import { toObservable } from '@angular/core/rxjs-interop';
import { ApiService } from '../../../core/services/api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const initialChart: ChartOfAccounts = {id: '', accounts: []} 

@Injectable({
  providedIn: 'root'
})
export class ChartOfAccountsService {
  private api = inject(ApiService);
  private snackbar = inject(MatSnackBar);
  private chartSignal = signal<ChartOfAccounts>(initialChart);
  private selectedAccountSignal = signal<AccountWithLines | null>(null);
  
  selectedAccount = this.selectedAccountSignal.asReadonly();
  chart = this.chartSignal.asReadonly();
  chart$ = toObservable(this.chartSignal);

  constructor() {
    if (this.chartSignal() === initialChart) {
      this.getChartOfAccounts();
    }
  }

  getAllAccounts(): SlimAccount[] {
    const accounts: SlimAccount[] = [];
    this.chart().accounts.forEach(node => accounts.push(...this.getAllAccountsRecursive(node)));
    return accounts;
  }

  private getAllAccountsRecursive(node: ChartAccountNode): SlimAccount[] {
    const accounts: SlimAccount[] = [node.account];
    node.children.forEach(child => accounts.push(...this.getAllAccountsRecursive(child)))
    return accounts;
  }
  
  getChartOfAccounts(): void {
    this.api.get<ChartOfAccounts>(`/accounts`).subscribe(resp => this.chartSignal.set(resp));
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

  getAccount(id: string): void {
    this.api.get<AccountWithLines>(`/accounts/${id}`).subscribe(resp => this.selectedAccountSignal.set(resp));
  }
}
