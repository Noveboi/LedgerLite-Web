import { Injectable, OnDestroy, signal, Signal, WritableSignal } from '@angular/core';
import { UserSettings } from '../../types/config.types';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  current: WritableSignal<UserSettings>;

  constructor() {
    this.current = signal(this.getUserSettings());
    
    toObservable(this.current)
      .subscribe(x => this.setUserSettings(x));
  }

  private setUserSettings(settings: UserSettings): void {
    localStorage.setItem('settings', JSON.stringify(settings))
  }

  private getUserSettings(): UserSettings {
    const settingsJson = localStorage.getItem('settings');
    if (!settingsJson) {
      return new UserSettings();
    }

    return JSON.parse(settingsJson);
  }
}
