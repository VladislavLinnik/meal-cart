import { Dish } from './dish.model';

export interface CartDish extends Dish {
  quantity: number;
}
