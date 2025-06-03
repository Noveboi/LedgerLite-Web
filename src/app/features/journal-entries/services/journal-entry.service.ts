import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { UpdateJournalEntryRequest, CreateJournalEntryRequest } from '../journal-entry.requests';
import { Observable } from 'rxjs';
import { FiscalPeriodService } from '../../fiscal-periods/services/fiscal-period.service';
import { ChartOfAccountsService } from '../../accounts/services/chart-of-accounts.service';

@Injectable({
  providedIn: 'root'
})
export class JournalEntryService {
  private api = inject(ApiService);
  private periods = inject(FiscalPeriodService);
  private accounts = inject(ChartOfAccountsService);

  updateJournalEntry(request: UpdateJournalEntryRequest) {
    const period = this.periods.selectedPeriod();
    if (!period) {
      console.log('No period selected');
      return;
    }

    return this.api.put(`/periods/${period.id}/entries/lines/${request.lineId}`, request).subscribe(() => {
      this.accounts.refreshSelectedAccount();
    });
  }

  addJournalEntry(request: CreateJournalEntryRequest): Observable<unknown> {
    return this.api.post(`/periods/${request.fiscalPeriodId}/entries`, request);
  }
}
