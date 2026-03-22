import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { CartDish } from '../models/cart.model';
import { Dish } from '../models/dish.model';
import { STORAGE_KEY } from '../models/storage.model';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly storageService = inject(StorageService);

  private _cart = signal<CartDish[]>([]);
  readonly cart = this._cart.asReadonly();

  readonly totalDishesInCart = computed(() => this._cart().length);

  constructor() {
    this.load();
  }

  addDish(dish: Dish): void {
    const payload: CartDish = { ...dish,
      ingredients: dish.ingredients.map((ing: Ingredient) => ({
        ...ing,
        name: ing.name.toLowerCase().trim()
      })),
      quantity: 1
    };
    this._cart.update((cart) => [...cart, payload]);
    this.saveToStorage();
  }

  updateDish(id: string, dish: Partial<Dish>): void {
    this._cart.update((cart) => {
      return cart.map((m) => (m.id === id ? { ...m, ...dish } : m));
    });
    this.saveToStorage();
  }

  removeDish(id: string): void {
    this._cart.update((cart) => cart.filter((cart) => cart.id !== id));
    this.saveToStorage();
  }

  updateQuantity(id: string, step: number): void {
    this._cart.update((dishes) =>
      dishes.map((m) => (m.id === id ? { ...m, quantity: Math.max(m.quantity + step, 1) } : m)),
    );
    this.saveToStorage();
  }

  updateSelectedIngredient(ingredient: Ingredient): void {
    const key = `${ingredient.name}_${ingredient.unit}`;

    this._cart.update((cart) =>
      cart.map((dish) => ({
        ...dish,
        ingredients: dish.ingredients.map((ing) =>
          `${ing.name}_${ing.unit}` === key ? { ...ing, selected: !ing.selected } : ing,
        ),
      })),
    );

    this.saveToStorage();
  }

  private saveToStorage(): void {
    this.storageService.set(STORAGE_KEY.Cart, this._cart());
  }

  private load(): void {
    const stored = this.storageService.get<CartDish[]>(STORAGE_KEY.Cart);
    this._cart.set(stored ? stored : []);
  }
}
