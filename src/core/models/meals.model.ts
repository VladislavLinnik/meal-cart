import { Ingredient } from './ingredient.model';

export interface Meal {
  id: string;
  name: string;
  ingredients: Ingredient[];
}
