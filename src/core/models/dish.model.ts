import { Ingredient } from './ingredient.model';

export interface Dish {
  id: string;
  name: string;
  ingredients: Ingredient[];
}
