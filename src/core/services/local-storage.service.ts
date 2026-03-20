import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { StorageKey } from '../models/storage.model';

@Injectable()
export class LocalStorageService extends StorageService {
  get<T>(key: StorageKey): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  set<T>(key: StorageKey, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: StorageKey): void {
    localStorage.removeItem(key);
  }
}
