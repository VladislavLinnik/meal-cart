import { inject, Service, signal } from '@angular/core';
import { StorageService } from './storage.service';
import {
  Unit,
  UNIT_TRANSLATION_KEYS,
} from '../models/ingredient.model';
import { KeyValue } from '@angular/common';
import { Dish } from '../models/dish.model';
import { STORAGE_KEY } from '../models/storage.model';
import { CartService } from './cart.service';
import { TranslocoService } from '@jsverse/transloco';

@Service()
export class DishService {
  private readonly storageService = inject(StorageService);
  private readonly cartService = inject(CartService);
  private readonly translocoService = inject(TranslocoService);

  private _dishes = signal<Dish[]>([]);
  readonly dishes = this._dishes.asReadonly();

  constructor() {
    this.load();
  }

  addDish(dish: Omit<Dish, 'id'>): void {
    const payload: Dish = { ...dish, id: crypto.randomUUID() };
    this._dishes.update((dishes) => [...dishes, payload]);
    this.saveToStorage();
    this.cartService.addDish(payload);
  }

  updateDish(id: string, dish: Partial<Dish>): void {
    this._dishes.update((dishes) => {
      return dishes.map((m) => (m.id === id ? { ...m, ...dish } : m));
    });
    this.cartService.updateDish(id, dish);
    this.saveToStorage();
  }

  getDish(id: string): Dish | undefined {
    return this._dishes().find((dish) => dish.id === id);
  }

  removeDish(id: string): void {
    this._dishes.update((dishes) => dishes.filter((dish) => dish.id !== id));
    this.cartService.removeDish(id);
    this.saveToStorage();
  }

  getUnitMeasurements(): KeyValue<Unit, string>[] {
    return (Object.keys(UNIT_TRANSLATION_KEYS) as Unit[]).map((key) => ({
      key,
      value: this.translocoService.translate(UNIT_TRANSLATION_KEYS[key]),
    }));
  }

  private saveToStorage(): void {
    this.storageService.set<Dish[]>(STORAGE_KEY.Dish, this._dishes());
  }

  private load(): void {
    const stored = this.storageService.get<Dish[]>(STORAGE_KEY.Dish);
    this._dishes.set(stored ? stored : []);
  }
}
