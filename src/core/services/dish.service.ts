import { inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { UNIT_MEASUREMENT, UnitMeasurement } from '../models/ingredient.model';
import { KeyValue } from '@angular/common';
import { Dish } from '../models/dish.model';
import { STORAGE_KEY } from '../models/storage.model';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private readonly storageService = inject(StorageService);

  private _dishes = signal<Dish[]>([]);
  readonly dishes = this._dishes.asReadonly();

  constructor() {
    this.load();
  }

  addDish(dish: Omit<Dish, 'id'>): void {
    const payload: Dish = { ...dish, id: crypto.randomUUID() };
    this._dishes.update((dishes) => [...dishes, payload]);
    this.saveToStorage();
  }

  updateDish(id: string, dish: Partial<Dish>): void {
    this._dishes.update((dishes) => {
      return dishes.map((m) => (m.id === id ? { ...m, ...dish } : m));
    });
    this.saveToStorage();
  }

  getDish(id: string): Dish | undefined {
    return this._dishes().find((dish) => dish.id === id);
  }

  removeDish(id: string): void {
    this._dishes.update((dishes) => dishes.filter((dish) => dish.id !== id));
    this.saveToStorage();
  }

  getUnitMeasurements(): KeyValue<string, UnitMeasurement>[] {
    return Object.entries(UNIT_MEASUREMENT).map(([key, value]) => ({
      value: value.toLowerCase() as UnitMeasurement,
      key,
    }));
  }

  private saveToStorage(): void {
    this.storageService.set(STORAGE_KEY.Dish, this._dishes());
  }

  private load(): void {
    const stored = this.storageService.get<Dish[]>(STORAGE_KEY.Dish);
    this._dishes.set(stored ? stored : []);
  }
}
