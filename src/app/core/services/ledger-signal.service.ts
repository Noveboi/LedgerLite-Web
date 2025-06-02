import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../features/auth/auth-service';
import { v4 } from 'uuid';
import { BehaviorSubject, distinctUntilChanged, filter, Observable, Subject, tap } from 'rxjs';

interface LedgerSignalOptions {
  onAuthorized: () => void
}

@Injectable({
  providedIn: 'root'
})
export class LedgerSignalService {
  private auth = inject(AuthService);

  private authorized$ =  this.auth.user$.pipe(
    filter(x => x !== null),
    distinctUntilChanged((prev, current) => prev.id === current.id),
  );

  make<T>(initialValue: T, options?: LedgerSignalOptions): WritableSignal<T> {
    const sig = signal(initialValue);

    if (options) {
      this.authorized$.subscribe(() => options.onAuthorized());
    }

    return sig;
  }

  makeObservable<T>(initialValue: T, options?: LedgerSignalOptions): Subject<T> {
    const observable = new BehaviorSubject(initialValue);
    
    if (options) {
      this.authorized$.subscribe(() => options.onAuthorized());
    }

    return observable;
  }
}
