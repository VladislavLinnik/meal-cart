import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DishIngredientPipe } from '../../pipes/dish-ingredient.pipe';
import { NgIcon } from '@ng-icons/core';
import { Dish } from '../../../../core/models/dish.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dish-card',
  imports: [DishIngredientPipe, NgIcon, RouterLink],
  templateUrl: './dish-card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishCardComponent {
  readonly dish = input.required<Dish>();
  readonly isInCart = input.required<boolean>();
  readonly remove = output<string>();
  readonly addToCart = output<Dish>();
  readonly removeFromCart = output<string>();
}
