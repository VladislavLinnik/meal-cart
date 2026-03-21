import { ValueOf } from './utils.model';

export const STORAGE_KEY = {
  Meals: 'meals',
  Cart: 'cart',
  CartView: 'cartView',
} as const;

export type StorageKey = ValueOf<typeof STORAGE_KEY>;
