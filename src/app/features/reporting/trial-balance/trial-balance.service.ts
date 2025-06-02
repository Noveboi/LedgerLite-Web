import { effect, inject, Injectable, signal } from '@angular/core';
import { TrialBalance } from './trial-balance.types';
import { FiscalPeriodService } from '../../fiscal-periods/services/fiscal-period.service';
import { ApiService } from '../../../core/services/api/api.service';
import { LedgerSignalService } from '../../../core/services/ledger-signal.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../auth/auth-service';
import { Observable } from 'rxjs';
import { FiscalPeriod } from '../../fiscal-periods/fiscal-periods.types';

@Injectable({
  providedIn: 'root'
})
export class TrialBalanceService {
  private api = inject(ApiService);

  get(period: FiscalPeriod): Observable<TrialBalance> {
    return this.api.get<TrialBalance>(`periods/${period.id}/trial-balance`);
  }
}
