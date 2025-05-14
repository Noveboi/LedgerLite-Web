import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment as env } from '../../../environments/environment' ; 
import { LoginRequest, LoginResponse } from '../../features/login/types';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../types/users.types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private auth$ = new BehaviorSubject<AuthState>(initialState);
  private authState = signal<AuthState>(initialState);

  user = computed(() => this.authState().user);
  errors = computed(() => this.authState().errors);

  constructor() {
    // Update the signal every time the subject changes
    this.auth$.pipe(takeUntilDestroyed()).subscribe((u) => {
      this.authState.update(_ => ({...u}));
    });
  }

  login(request: LoginRequest): void {
    const auth = this.auth$.value;

    this.http.post<LoginResponse>(`${env.apiUrl}/login`, request).subscribe({
      next: (resp) => this.auth$.next({
        ...auth, 
        user: resp.user,
        accessToken: resp.accessToken,
        refreshToken: resp.refreshToken}),
      error: () => this.auth$.next({...auth, errors: {...auth.errors, login: 'Wrong username or password.'}})
    })
  }

  register(request: RegisterRequest): void {
    const auth = this.auth$.value;

    this.http.post(`${env.apiUrl}/register`, request).subscribe({
      next: () => this.router.navigate(['auth', 'login']),
      error: (err) => this.auth$.next({...auth, errors: {...auth.errors, register: this.getError(err)}})
    })
  }

  private getError(err: any) {
    if (err instanceof Error) {
      return err.message
    } else {
      return 'Registration is invalid.'
    }
  }
}

interface AuthErrors {
  login: string | null,
  register: string | null
}

interface AuthState {
  user: User | null,
  accessToken: string | null,
  refreshToken: string | null,
  errors: AuthErrors
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  errors: {
    login: null,
    register: null
  }
} 