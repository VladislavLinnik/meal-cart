import { ValueOf } from './utils.model';

export interface Ingredient {
  name: string;
  amount: number;
  unit: keyof typeof UNIT_MEASUREMENT;
  selected?: boolean;
  sources?: IngredientSources[];
}

export interface IngredientSources {
  mealName: string;
  quantity: number;
}

export const UNIT_MEASUREMENT = {
  Kg: 'кг',
  Gr: 'г',
  Lt: 'л',
  Ml: 'мл',
  Piece: 'шт',
  Pack: 'уп',
} as const;

export type UnitMeasurement = ValueOf<typeof UNIT_MEASUREMENT>;
