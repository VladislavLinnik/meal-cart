import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient, UNIT_MEASUREMENT } from '../../../core/models/ingredient.model';

@Pipe({
  name: 'appMealIngredient',
  standalone: true,
})
export class MealIngredientPipe implements PipeTransform {
  transform(value: Ingredient): string {
    return `${value.name} ${value.amount}${UNIT_MEASUREMENT[value.unit]}`;
  }
}
