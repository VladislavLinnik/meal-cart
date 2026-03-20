import { Meal } from './meals.model';

export interface CartMeal extends Meal {
  quantity: number;
}
