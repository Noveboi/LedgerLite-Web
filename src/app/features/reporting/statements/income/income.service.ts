import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { FiscalPeriod } from '../../../fiscal-periods/fiscal-periods.types';
import { IncomeStatement } from './income.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private api = inject(ApiService);
  
  get(period: FiscalPeriod): Observable<IncomeStatement> {
    return this.api.get<IncomeStatement>(`periods/${period.id}/income`);
  }
}
