import { inject, Injectable } from '@angular/core';
import { formatNumber } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import { Dish } from '../models/dish.model';
import { UNIT_TRANSLATION_KEYS } from '../models/ingredient.model';

@Injectable({ providedIn: 'root' })
export class DishClipboardService {
  private readonly translocoService = inject(TranslocoService);

  async copy(dishes: readonly (Dish & { quantity?: number })[]): Promise<void> {
    if (!dishes.length) return;

    const text = dishes
      .map((dish) => {
        const quantity = dish.quantity ?? 1;
        const title = dish.quantity === undefined ? dish.name : `${dish.name} ×${quantity}`;
        const ingredients = dish.ingredients.map((ingredient) => {
          const amount = formatNumber(ingredient.amount * quantity, 'en-US', '1.0-2');
          const unit = this.translocoService.translate(UNIT_TRANSLATION_KEYS[ingredient.unit]);
          return `- ${ingredient.name}: ${amount} ${unit}`;
        });

        return [title, ...ingredients].join('\n');
      })
      .join('\n\n');

    await navigator.clipboard.writeText(text);
  }
}
