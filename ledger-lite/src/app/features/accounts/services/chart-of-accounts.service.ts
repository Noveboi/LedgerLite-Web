import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ChartOfAccounts } from '../accounts.types';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartOfAccountsService {
  private http = inject(HttpClient);
  
  getChartOfAccounts(): Observable<ChartOfAccounts> {
    return this.http.get<ChartOfAccounts>(`${environment.apiUrl}/accounts`);
  }
}
