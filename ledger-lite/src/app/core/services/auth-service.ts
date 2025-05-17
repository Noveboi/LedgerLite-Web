import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment as env } from '../../../environments/environment' ; 
import { LoginRequest, LoginResponse } from '../../features/auth/login/login.types';
import { RegisterRequest } from '../../features/auth/register/register.types';
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

  isLoading = signal(false);
  accessToken = computed(() => this.authState().accessToken);
  user = computed(() => this.authState().user);
  errors = computed(() => this.authState().errors);

  constructor() {
    // Update the signal every time the subject changes
    this.auth$.pipe(takeUntilDestroyed()).subscribe(state => {
      this.authState.update(_ => ({...state}));
      this.isLoading.set(false);
    });
  }

  private getUserAndHome(): void {
    if (this.authState().accessToken === null) {
      throw new Error('Cannot get user without an access token.')
    }
    const auth = this.auth$.value;

    this.http.get<User>(`${env.apiUrl}/me`).subscribe({
      next: (resp) => {
        this.auth$.next({
          ...auth,
          user: resp
        });

        this.router.navigate(['home']);
      },
      error: (err) => console.log(err)
    })
  }

  login(request: LoginRequest): void {
    const auth = this.auth$.value;
    this.isLoading.set(true);

    this.http.post<LoginResponse>(`${env.apiUrl}/login`, request).subscribe({
      next: (resp) => {
        this.auth$.next({
          ...auth,
          errors: noErrors,
          accessToken: resp.accessToken,
          refreshToken: resp.refreshToken
        });

        console.log('Calling getUser');
        this.getUserAndHome();
      },
      error: () => this.auth$.next({...auth, errors: {...auth.errors, login: 'Wrong username or password.'}})
    })
  }

  register(request: RegisterRequest): void {
    const auth = this.auth$.value;
    this.isLoading.set(true);

    this.http.post(`${env.apiUrl}/register`, request).subscribe({
      next: () => this.router.navigate(['auth', 'login']),
      error: (err) => this.auth$.next({...auth, errors: {...auth.errors, register: this.getError(err)}})
    })
  }

  logout(): void {
    this.auth$.next(initialState);
    this.router.navigate([''])
  }

  private getError(err: any) {
    if (err.errors) {
      return err.errors.join(', ')
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
const noErrors: AuthErrors = {login: null, register: null}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  errors: noErrors
} 
