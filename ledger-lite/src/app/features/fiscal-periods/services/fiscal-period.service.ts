import { inject, Injectable, signal } from '@angular/core';
import { FiscalPeriod } from '../fiscal-periods.types';
import { ApiService } from '../../../core/services/api/api.service';
import { CreateFiscalPeriodRequest } from '../fiscal-periods.requests';
import { first, Observable, tap } from 'rxjs';
import { SettingsService } from '../../../core/services/storage/settings.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class FiscalPeriodService {
  private api = inject(ApiService);
  private settings = inject(SettingsService);

  private isInitialized = false;

  private fiscalPeriodsSignal = signal<readonly FiscalPeriod[]>([]);
  private selectedPeriodSignal = signal<FiscalPeriod | null>(null);

  fiscalPeriods$ = toObservable(this.fiscalPeriodsSignal);
  fiscalPeriods = this.fiscalPeriodsSignal.asReadonly();

  selectedPeriod$ = toObservable(this.selectedPeriodSignal);
  selectedPeriod = this.selectedPeriodSignal.asReadonly();

  constructor() {
    if (!this.isInitialized) {
      this.getFiscalPeriods();
      this.fiscalPeriods$.pipe(first()).subscribe(periods =>{
        if (periods.length > 0) {
          return this.selectPeriod(periods[0]);
        }
      })
    }
  }

  getFiscalPeriods(): void {
    this.api.get<FiscalPeriod[]>('/periods').subscribe(resp => {
      this.fiscalPeriodsSignal.set(resp);
      this.isInitialized = true;
    })
  }

  createFiscalPeriod(request: CreateFiscalPeriodRequest): Observable<FiscalPeriod> {
    return this.api.post<FiscalPeriod>('/periods', request).pipe(
      tap(() => this.getFiscalPeriods())
    )
  }

  selectPeriod(period: FiscalPeriod) {
    const found = this.fiscalPeriodsSignal().find(x => x.id === period.id);
    if (found) {
      console.log('Select', found);
      this.selectedPeriodSignal.set(found);
    } else {
      console.warn(`Could not find period`, period)
    }
  }
}
