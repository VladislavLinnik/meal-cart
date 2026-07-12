import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { StorageService } from '../core/services/storage.service';
import { LocalStorageService } from '../core/services/local-storage.service';
import { SettingsService } from '../core/services/settings.service';
import { ThemeService } from '../core/services/theme.service';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { provideTranslocoMessageformat } from '@jsverse/transloco-messageformat';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: StorageService, useClass: LocalStorageService },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideZonelessChangeDetection(),
    provideTransloco({
      config: {
        availableLangs: [
          { id: 'en', label: 'English' },
          { id: 'uk', label: 'Українська' },
        ],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideTranslocoMessageformat(),
    provideAppInitializer(() => {
      const settingsService = inject(SettingsService);
      const themeService = inject(ThemeService);
      const translocoService = inject(TranslocoService);

      const settings = settingsService.get();

      themeService.apply(settings?.darkTheme ?? false);
      if (settings?.language) {
        translocoService.setActiveLang(settings.language);
      }
    }),
    provideHttpClient(),
  ],
};
