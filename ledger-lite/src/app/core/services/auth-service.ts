import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginRequest, LoginResponse } from '../../features/auth/login/login.types';
import { RegisterRequest } from '../../features/auth/register/register.types';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../../features/users/users.types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ApiService } from './api/api.service';
import { SettingsService } from './storage/settings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);
  private settings = inject(SettingsService);

  private auth$ = new BehaviorSubject<AuthState>(initialState);
  private authState = signal<AuthState>(initialState);

  isLoading = signal(false);
  accessToken = computed(() => this.authState().accessToken);
  user = computed(() => this.authState().user);

  constructor() {
    // Update the signal every time the subject changes
    this.auth$
    .pipe(
      takeUntilDestroyed()
    )
    .subscribe(state => {
      this.authState.update(_ => ({...state}));
      this.isLoading.set(false);
    });
  }

  refresh(): void {
    const auth = this.auth$.value;
    this.api.get<User>('/me').subscribe({
      next: (resp) => {
        this.auth$.next({
          ...auth,
          user: resp 
        });
      },
      error: (err) => console.log(err)
    })
  }

  private getUserAndHome(): void {
    if (this.authState().accessToken === null) {
      throw new Error('Cannot get user without an access token.')
    }
    const auth = this.auth$.value;
    this.api.get<User>('/me').subscribe((resp) => {
      this.auth$.next({
        ...auth,
        user: resp
      });
      this.router.navigate(['']);
    })
  }

  tryGetTokenFromSettings(): string | null {
    const current = this.settings.current();
    if (current.accessToken) {
      this.refresh()
      this.setStateTokens(current.accessToken, current.refreshToken)
    }

    return current.accessToken;
  }

  login(request: LoginRequest): void {
    this.isLoading.set(true);

    this.api.post<LoginResponse>('/login', request).subscribe((resp) => {
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
    this.isLoading.set(true);
    this.api.post(`/register`, request).subscribe(() => this.router.navigate(['auth', 'login']))
  }

  logout(): void {
    this.auth$.next(initialState);
    this.settings.current.update(s => ({
        ...s,
        accessToken: null,
        refreshToken: null
      }))
    this.router.navigate([''])
  }

  private setStateTokens(access: string | null, refresh: string | null): void {
    this.auth$.next({
        ...this.auth$.value,
        accessToken: access,
        refreshToken: refresh
      });
  }
}

interface AuthState {
  user: User | null,
  accessToken: string | null,
  refreshToken: string | null,
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
} 
