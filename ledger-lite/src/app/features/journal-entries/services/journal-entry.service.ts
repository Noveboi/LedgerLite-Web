import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { UpdateJournalEntryRequest, CreateJournalEntryRequest } from '../journal-entry.requests';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JournalEntryService {
  private api = inject(ApiService);

  updateJournalEntry(request: UpdateJournalEntryRequest) {
    console.log(request);
  }

  addJournalEntry(request: CreateJournalEntryRequest): Observable<unknown> {
    return this.api.post(`/periods/${request.fiscalPeriodId}/entries`, request);
  }
}
