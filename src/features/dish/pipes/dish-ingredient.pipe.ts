import { inject, Pipe, PipeTransform } from '@angular/core';
import {
  Ingredient,
  UNIT_TRANSLATION_KEYS,
} from '../../../core/models/ingredient.model';
import { TranslocoService } from '@jsverse/transloco';

@Pipe({
  name: 'appDishIngredient',
})
export class DishIngredientPipe implements PipeTransform {
  private readonly translocoService = inject(TranslocoService);

  transform(value: Ingredient): string {
    const unitLabel = this.translocoService.translate(UNIT_TRANSLATION_KEYS[value.unit]);
    return `${value.name} ${value.amount}${unitLabel}`;
  }
}
