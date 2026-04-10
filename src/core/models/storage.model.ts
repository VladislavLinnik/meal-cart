import { ValueOf } from './utils.model';

export const STORAGE_KEY = {
  Dish: 'dish',
  Cart: 'cart',
  CartView: 'cartView',
  Settings: 'settings',
} as const;

export type StorageKey = ValueOf<typeof STORAGE_KEY>;
