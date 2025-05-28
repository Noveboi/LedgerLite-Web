import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { UpdateJournalEntryRequest, CreateJournalEntryRequest } from '../journal-entry.requests';
import { FiscalPeriodService } from '../../fiscal-periods/services/fiscal-period.service';

@Injectable({
  providedIn: 'root'
})
export class JournalEntryService {
  private api = inject(ApiService);
  private periodService = inject(FiscalPeriodService);

  updateJournalEntry(request: UpdateJournalEntryRequest) {
    console.log(request);
  }

  addJournalEntry(request: CreateJournalEntryRequest) {
    console.log(request);
  }
}
