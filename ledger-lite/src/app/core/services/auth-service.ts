import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment' ; 
import { LoginRequest, LoginResponse } from '../../features/login/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  login(request: LoginRequest): void {
    this.http.post<LoginResponse>(`${env.apiUrl}/login`, request).subscribe(response => {
      console.log(response)
    })
  }
}
