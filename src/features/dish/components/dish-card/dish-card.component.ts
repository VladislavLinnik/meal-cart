import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DishIngredientPipe } from '../../pipes/dish-ingredient.pipe';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Dish } from '../../../../core/models/dish.model';
import { RouterLink } from '@angular/router';
import { heroShoppingCart } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-dish-card',
  imports: [DishIngredientPipe, NgIcon, RouterLink, NgIcon],
  viewProviders: [provideIcons({ heroShoppingCart })],
  templateUrl: './dish-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishCardComponent {
  readonly dish = input.required<Dish>();
  readonly isInCart = input.required<boolean>();
  readonly remove = output<string>();
  readonly addToCart = output<Dish>();
  readonly removeFromCart = output<string>();
}
