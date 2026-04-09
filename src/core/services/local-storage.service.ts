import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { StorageKey } from '../models/storage.model';

@Injectable()
export class LocalStorageService extends StorageService {
  get<T>(key: StorageKey): T | null {
    const item = localStorage.getItem(key);
    let output: T | null;

    try {
      output = item ? JSON.parse(item) : null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to parse JSON:', error.message);
      } else {
        console.log('Unexpected error type:', error);
      }

      return null;
    }

    return output;
  }

  set<T>(key: StorageKey, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: StorageKey): void {
    localStorage.removeItem(key);
  }
}
