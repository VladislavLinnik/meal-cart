import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { CartMeal } from '../models/cart.model';
import { Meal } from '../models/meals.model';
import { STORAGE_KEY } from '../models/storage.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly storageService = inject(StorageService);

  private _cart = signal<CartMeal[]>([]);
  readonly cart = this._cart.asReadonly();

  readonly totalMealsInCart = computed(() => this._cart().length);

  constructor() {
    this.load();
  }

  addMeal(meal: Meal): void {
    const payload: CartMeal = { ...meal, quantity: 1 };
    this._cart.update((cart) => [...cart, payload]);
    this.saveToStorage();
  }

  updateMeal(id: string, meal: Partial<Meal>): void {
    this._cart.update((cart) => {
      return cart.map((m) => (m.id === id ? { ...m, ...meal } : m));
    });
    this.saveToStorage();
  }

  removeMeal(id: string): void {
    this._cart.update((cart) => cart.filter((cart) => cart.id !== id));
    this.saveToStorage();
  }

  updateQuantity(id: string, step: number): void {
    this._cart.update((meals) =>
      meals.map((m) => (m.id === id ? { ...m, quantity: Math.max(m.quantity + step, 1) } : m)),
    );
    this.saveToStorage();
  }

  private saveToStorage(): void {
    this.storageService.set(STORAGE_KEY.Cart, this._cart());
  }

  private load(): void {
    const stored = this.storageService.get<CartMeal[]>(STORAGE_KEY.Cart);
    this._cart.set(stored ? stored : []);
  }
}
