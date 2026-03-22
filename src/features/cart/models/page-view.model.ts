import { ValueOf } from '../../../core/models/utils.model';

export const CART_PAGE_VIEW = {
  Ingredients: 'ingredients',
  Dish: 'dish',
} as const;

export type CartPageView = ValueOf<typeof CART_PAGE_VIEW>;
