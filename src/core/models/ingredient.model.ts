export const UNIT_MEASUREMENT = {
  Kg: 'кг',
  Gr: 'г',
  Lt: 'л',
  Ml: 'мл',
  Piece: 'шт',
  Pack: 'уп',
} as const;

export type Unit = keyof typeof UNIT_MEASUREMENT;

export interface Ingredient {
  name: string;
  amount: number;
  unit: Unit;
  selected?: boolean;
  sources?: IngredientSources[];
}

export interface IngredientSources {
  dishName: string;
  quantity: number;
}

export const UNIT_TRANSLATION_KEYS: Record<Unit, string> = {
  Kg: 'units.kg',
  Gr: 'units.gr',
  Lt: 'units.lt',
  Ml: 'units.ml',
  Piece: 'units.piece',
  Pack: 'units.pack',
} as const;
