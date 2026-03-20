import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { StorageService } from '../core/services/storage.service';
import { LocalStorageService } from '../core/services/local-storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: StorageService, useClass: LocalStorageService },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideZonelessChangeDetection(),
  ],
};
