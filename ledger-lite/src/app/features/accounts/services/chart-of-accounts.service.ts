import { inject, Injectable, signal } from '@angular/core';
import { Account, ChartOfAccounts } from '../accounts.types';
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

  chart = this.chartSignal.asReadonly();
  chart$ = toObservable(this.chartSignal);
  
  getChartOfAccounts(): void {
    this.api.get<ChartOfAccounts>(`/accounts`)
      .subscribe(resp => this.chartSignal.set(resp));
  }

  createAccount(request: CreateAccountRequest): void {
    this.api.post<Account>("/accounts", request)
      .subscribe((resp) => {
        this.snackbar.open(`Successfully created account ${resp.name}!`)
        return this.getChartOfAccounts();
      });
  }
}
