import { inject, Injectable } from '@angular/core';
import { TrialBalance } from './trial-balance.types';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/services/api/api.service';
import { FiscalPeriod } from '../../../fiscal-periods/fiscal-periods.types';

@Injectable({
  providedIn: 'root'
})
export class TrialBalanceService {
  private api = inject(ApiService);

  get(period: FiscalPeriod): Observable<TrialBalance> {
    return this.api.get<TrialBalance>(`periods/${period.id}/trial-balance`);
  }
}
