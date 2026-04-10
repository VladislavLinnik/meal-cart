import { inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { STORAGE_KEY } from '../models/storage.model';
import { Settings } from '../../features/settings/models/settings.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  readonly DEFAULT_SETTINGS: Settings = {
    confirmToRemove: true,
    darkTheme: false,
  };

  readonly isDarkMode = signal<boolean>(false);
  private readonly storageService = inject(StorageService);

  get(): Settings | null {
    return this.storageService.get<Settings>(STORAGE_KEY.Settings) ?? this.DEFAULT_SETTINGS;
  }

  set(settings: Settings): void {
    this.storageService.set<Settings>(STORAGE_KEY.Settings, settings);
  }
}
