import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private prefix = environment.apiUrl;
  private http = inject(HttpClient);

  get<TResponse>(route: string, params?: HttpParams): Observable<TResponse> {
    return this.http.get<TResponse>(this.getUrl(route), {params: params});
  }

  post<TResponse>(route: string, body: any): Observable<TResponse> {
    return this.http.post<TResponse>(this.getUrl(route), body);
  }

  put<TResponse>(route: string, body?: any): Observable<TResponse> {
    return this.http.put<TResponse>(this.getUrl(route), body);
  }

  delete<TResponse>(route: string): Observable<TResponse> {
    return this.http.delete<TResponse>(this.getUrl(route));
  }

  private getUrl(route: string) {
    return route.startsWith('/') 
      ? `${this.prefix}${route}`
      : `${this.prefix}/${route}`;
  }
}
