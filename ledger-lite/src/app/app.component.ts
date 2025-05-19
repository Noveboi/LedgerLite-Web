import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SettingsService } from './core/services/storage/settings.service';
import { SystemTheme } from './core/types/config.types';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private settingsService = inject(SettingsService);
  private settings = this.settingsService.current;

  appClass = computed(() => `ll-app ${this.settings().systemTheme === SystemTheme.Dark ? 'dark' : ''}`)
}
