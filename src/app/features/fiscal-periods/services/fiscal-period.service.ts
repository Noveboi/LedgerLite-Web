import { inject, Injectable, signal } from '@angular/core';
import { FiscalPeriod } from '../fiscal-periods.types';
import { ApiService } from '../../../core/services/api/api.service';
import { CreateFiscalPeriodRequest } from '../fiscal-periods.requests';
import { Observable, tap } from 'rxjs';
import { SettingsService } from '../../../core/services/storage/settings.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { LedgerSignalService } from '../../../core/services/ledger-signal.service';

@Injectable({
  providedIn: 'root'
})
export class FiscalPeriodService {
  private api = inject(ApiService);
  private settings = inject(SettingsService);
  private signals = inject(LedgerSignalService);

  private fiscalPeriodsSignal = this.signals.make<readonly FiscalPeriod[]>([]);
  private _selectedPeriod$ = this.signals.makeObservable<FiscalPeriod | null>(null, {
    onAuthorized: () => {
      const periodId = this.settings.current().selectedPeriodId;
      this.getAndSelectPeriod(periodId);
    }
  })

  fiscalPeriods = this.fiscalPeriodsSignal.asReadonly();
  selectedPeriod$ = this._selectedPeriod$.asObservable();
  selectedPeriod = toSignal(this._selectedPeriod$);

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
      
      this._selectedPeriod$.next(found);
    }
  }

  private getFiscalPeriods(): Observable<FiscalPeriod[]> {
    return this.api.get<FiscalPeriod[]>('/periods').pipe(
      tap(resp => {
        this.fiscalPeriodsSignal.set(resp);
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
