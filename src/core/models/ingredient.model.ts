import { ValueOf } from './utils.model';

export interface Ingredient {
  name: string;
  amount: number;
  unit: keyof typeof UNIT_MEASUREMENT;
}

export const UNIT_MEASUREMENT = {
  Kg: 'кг',
  Gr: 'г',
  Lt: 'л',
  Ml: 'мл',
  Piece: 'шт',
} as const;

export type UnitMeasurement = ValueOf<typeof UNIT_MEASUREMENT>;
