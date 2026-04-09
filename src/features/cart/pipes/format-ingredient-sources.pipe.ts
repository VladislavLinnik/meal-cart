import { Pipe, PipeTransform } from '@angular/core';
import { IngredientSources } from '../../../core/models/ingredient.model';

@Pipe({
  name: 'appFormatIngredientSources',
})
export class FormatIngredientSourcesPipe implements PipeTransform {
  transform(sources: IngredientSources[] | undefined): string {
    return (sources || [])
      .map((source) => `${source.dishName} x${source.quantity}`)
      .join(', ');
  }
}
