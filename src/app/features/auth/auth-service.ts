import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginRequest, AccessTokenResponse } from './login/login.types';
import { RegisterRequest } from './register/register.types';
import { User } from '../users/users.types';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api/api.service';
import { SettingsService } from '../../core/services/storage/settings.service';
import { BehaviorSubject, distinct, distinctUntilChanged, distinctUntilKeyChanged, EMPTY, filter, Observable, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);
  private settings = inject(SettingsService);
  private snackbar = inject(MatSnackBar);

  private authState = signal<AuthState>(initialState);

  accessToken = computed(() => this.authState().accessToken);
  isRefreshing = computed(() => this.authState().isRefreshing);
  user$ = new BehaviorSubject<User | null>(null);
  user = toSignal(this.user$);

  refreshToken(): Observable<AccessTokenResponse> {
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

  getUser(): Observable<User> {
    return this.api.get<User>('/me').pipe(tap(resp => this.user$.next(resp)));
  }

  tryGetTokenFromSettings(): string | null {
    const current = this.settings.current();
    if (current.accessToken) {
      this.getUser().subscribe();
      this.setStateTokens(current.accessToken, current.refreshToken)
    }

    return current.accessToken;
  }

  login(request: LoginRequest): void {
    this.api.post<AccessTokenResponse>('/login', request).subscribe({
      next: (resp) => {
        this.setStateTokens(resp.accessToken, resp.refreshToken)
        this.settings.current.update(s => ({
          ...s,
          accessToken: resp.accessToken,
          refreshToken: resp.refreshToken 
        }))

        this.getUserAndHome();
      },
      error: () => this.snackbar.open('Wrong username or password.', '', {
        duration: 1250
      })
    })
  }

  register(request: RegisterRequest): void {
    this.api.post(`/register`, request).subscribe(() => this.router.navigate(['auth', 'login']))
  }

  logout(): void {
    this.user$.next(null);
    this.authState.set(initialState);
    this.settings.current.update(s => ({
        ...s,
        accessToken: null,
        refreshToken: null
      }))

    this.router.navigate([''])
  }

  private getUserAndHome(): void {
    if (this.authState().accessToken === null) {
      throw new Error('Cannot get user without an access token.')
    }
    this.getUser().subscribe(() => {
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
  accessToken: string | null,
  refreshToken: string | null,
  isRefreshing: boolean
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isRefreshing: false
} 