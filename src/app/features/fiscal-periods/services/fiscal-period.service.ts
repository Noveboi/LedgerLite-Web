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

  fiscalPeriods = this.fiscalPeriodsSignal.asReadonly();

  selectedPeriod$ = toObservable(this.selectedPeriodSignal);
  selectedPeriod = this.selectedPeriodSignal.asReadonly();

  constructor() {
    if (!this.isInitialized) {
      const periodId = this.settings.current().selectedPeriodId;
      this.getAndSelectPeriod(periodId);
    }
  }

  createFiscalPeriod(request: CreateFiscalPeriodRequest): Observable<FiscalPeriod> {
    return this.api.post<FiscalPeriod>('/periods', request).pipe(
      tap(period => this.getAndSelectPeriod(period.id))
    )
  }

  selectPeriod(period: FiscalPeriod) {
    const found = this.fiscalPeriodsSignal().find(x => x.id === period.id);
    if (found) {
      const periodId = this.settings.current().selectedPeriodId;
      if (found.id !== periodId) {
        this.settings.current.update(x => ({...x, selectedPeriodId: found.id}));
      }
      this.selectedPeriodSignal.set(found);
    }
  }

    private getFiscalPeriods(): Observable<FiscalPeriod[]> {
      return this.api.get<FiscalPeriod[]>('/periods').pipe(
        tap(resp => {
          this.fiscalPeriodsSignal.set(resp);
          this.isInitialized = true;
        })
      );
    }

  private getAndSelectPeriod(periodId: string | null): void {
    if (!periodId)
      return;

    this.getFiscalPeriods().subscribe(periods => {
      const period = periods.find(x => x.id == periodId);

      if (period) {
        this.selectPeriod(period);
      } 
    });
  }
}
