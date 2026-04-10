import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { StorageService } from '../core/services/storage.service';
import { LocalStorageService } from '../core/services/local-storage.service';
import { SettingsService } from '../core/services/settings.service';
import { ThemeService } from '../core/services/theme.service';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: StorageService, useClass: LocalStorageService },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideZonelessChangeDetection(),
    provideAppInitializer(() => {
      const settingsService = inject(SettingsService);
      const themeService = inject(ThemeService);
      themeService.apply(settingsService.get()?.darkTheme ?? false);
    }),
  ],
};
