import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { UNIT_MEASUREMENT, UnitMeasurement } from '../models/ingredient.model';
import { KeyValue } from '@angular/common';
import { Meal } from '../models/meals.model';
import { STORAGE_KEY } from '../models/storage.model';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  private readonly storageService = inject(StorageService);

  private _meals = signal<Meal[]>([]);
  readonly meals = this._meals.asReadonly();

  readonly totalMeals = computed(() => this._meals().length);

  constructor() {
    this.loadMeals();
  }

  addMeal(meal: Omit<Meal, 'id'>): void {
    const payload: Meal = { ...meal, id: crypto.randomUUID() };
    this._meals.update((meals) => [...meals, payload]);
    this.saveMeals();
  }

  updateMeal(id: string, meal: Partial<Meal>): void {
    this._meals.update((meals) => {
      return meals.map((m) => (m.id === id ? { ...m, ...meal } : m));
    });
    this.saveMeals();
  }

  getMeal(id: string): Meal | undefined {
    return this._meals().find((meal) => meal.id === id);
  }

  removeMeal(id: string): void {
    this._meals.update((meals) => meals.filter((meal) => meal.id !== id));
    this.saveMeals();
  }

  getUnitMeasurements(): KeyValue<string, UnitMeasurement>[] {
    return Object.entries(UNIT_MEASUREMENT).map(([key, value]) => ({
      value: value.toLowerCase() as UnitMeasurement,
      key,
    }));
  }

  private saveMeals(): void {
    this.storageService.set(STORAGE_KEY.Meals, this._meals());
  }

  private loadMeals(): void {
    const stored = this.storageService.get<Meal[]>(STORAGE_KEY.Meals);
    this._meals.set(stored ? stored : []);
  }
}
