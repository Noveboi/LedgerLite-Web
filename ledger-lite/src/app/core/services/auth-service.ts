import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginRequest, AccessTokenResponse } from '../../features/auth/login/login.types';
import { RegisterRequest } from '../../features/auth/register/register.types';
import { User } from '../../features/users/users.types';
import { Router } from '@angular/router';
import { ApiService } from './api/api.service';
import { SettingsService } from './storage/settings.service';
import { EMPTY, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);
  private settings = inject(SettingsService);

  private authState = signal<AuthState>(initialState);

  accessToken = computed(() => this.authState().accessToken);
  isRefreshing = computed(() => this.authState().isRefreshing);
  user = computed(() => this.authState().user);

  refresh(): Observable<AccessTokenResponse> {
    this.authState.update(x => ({...x, isRefreshing: true}))
    const refreshToken = this.authState().refreshToken;

    if (!refreshToken) {
      this.authState.update(x => ({...x, isRefreshing: false}))
      return EMPTY;
    }

    return this.api.post<AccessTokenResponse>('/refresh', { refreshToken }).pipe(
      tap({
        next: resp => {
          this.setStateTokens(resp.accessToken, resp.refreshToken, false)
        },
        error: err => {
          console.error(err);
          this.logout();
        }
      })
    )
  }

  getUser(): void {
    this.api.get<User>('/me').subscribe({
      next: (resp) => this.authState.update(x => ({...x, user: resp})),
      error: (err) => console.log(err)
    })
  }

  tryGetTokenFromSettings(): string | null {
    const current = this.settings.current();
    if (current.accessToken) {
      this.getUser()
      this.setStateTokens(current.accessToken, current.refreshToken)
    }

    return current.accessToken;
  }

  login(request: LoginRequest): void {
    this.api.post<AccessTokenResponse>('/login', request).subscribe((resp) => {
      this.setStateTokens(resp.accessToken, resp.refreshToken)
      this.settings.current.update(s => ({
        ...s,
        accessToken: resp.accessToken,
        refreshToken: resp.refreshToken 
      }))

      this.getUserAndHome();
    })
  }

  register(request: RegisterRequest): void {
    this.api.post(`/register`, request).subscribe(() => this.router.navigate(['auth', 'login']))
  }

  logout(): void {
    this.authState.set(initialState);
    this.settings.current.update(s => ({
        ...s,
        accessToken: null,
        refreshToken: null
      }))

    this.router.navigate(['auth', 'login'])
  }

    private getUserAndHome(): void {
      if (this.authState().accessToken === null) {
        throw new Error('Cannot get user without an access token.')
      }
      this.api.get<User>('/me').subscribe((resp) => {
        this.authState.update(x => ({ ...x, user: resp }));
        this.router.navigate(['']);
      });
    }

  private setStateTokens(access: string | null, refresh: string | null, isRefreshing?: boolean): void {
    this.authState.update(x => ({
      ...x, 
      accessToken: access, 
      refreshToken: refresh,
      isRefreshing: isRefreshing ?? x.isRefreshing}));
  }
}

interface AuthState {
  user: User | null,
  accessToken: string | null,
  refreshToken: string | null,
  isRefreshing: boolean
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isRefreshing: false
} 
