import { StorageKey } from '../models/storage.model';

export abstract class StorageService {
  abstract get<T>(key: StorageKey): T | null;
  abstract set<T>(key: StorageKey, value: T): void;
  abstract remove(key: StorageKey): void;
}
