import { inject, Injectable, signal } from '@angular/core';
import { TrialBalance } from './trial-balance.types';
import { FiscalPeriodService } from '../../fiscal-periods/services/fiscal-period.service';
import { ApiService } from '../../../core/services/api/api.service';
import { EMPTY, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrialBalanceService {
  private periodService = inject(FiscalPeriodService);
  private api = inject(ApiService);

  private _currentTrialBalance = signal<TrialBalance | null>(null);

  currentTrialBalance = this._currentTrialBalance.asReadonly();
  
  get(): void {
    const period = this.periodService.selectedPeriod();
    
    if (!period) {
      return;
    }

    this.api.get<TrialBalance>(`periods/${period.id}/trial-balance`).subscribe(
      (resp) => this._currentTrialBalance.set(resp));
  }
}
