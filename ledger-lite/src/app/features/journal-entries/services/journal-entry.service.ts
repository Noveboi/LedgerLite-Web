import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class JournalEntryService {
  private api = inject(ApiService);
}
