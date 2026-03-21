import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
  Signal,
} from '@angular/core';
import { CART_PAGE_VIEW, CartPageView } from '../../models/page-view.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeft } from '@ng-icons/heroicons/outline';
import { CartProgress } from '../cart-progress/cart-progress';
import { CartMeal } from '../../../../core/models/cart.model';
import { CartService } from '../../../../core/services/cart.service';
import { Ingredient } from '../../../../core/models/ingredient.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-cart-ingredients-list',
  imports: [NgIcon, CartProgress, NgClass],
  viewProviders: [provideIcons({ heroArrowLeft })],
  templateUrl: './cart-ingredients-list.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartIngredientsList {
  readonly changeViewSelected = output<CartPageView>();
  readonly cartService = inject(CartService);
  readonly cart: Signal<CartMeal[]> = this.cartService.cart;

  readonly CART_PAGE_VIEW = CART_PAGE_VIEW;

  readonly progress = computed(() => {
    const items = this.ingredients();
    const selected = items.filter((x) => x.selected).length;
    return {
      selected,
      total: items.length,
      percent: items.length ? (selected / items.length) * 100 : 0,
    };
  });

  readonly ingredients = computed(() => {
    const map = new Map<string, Ingredient>();

    for (const meal of this.cart()) {
      for (const ingredient of meal.ingredients) {
        const key = `${ingredient.name}_${ingredient.unit}`;

        map.set(key, {
          ...ingredient,
          amount: (map.get(key)?.amount ?? 0) + ingredient.amount,
          selected: ingredient.selected,
        });
      }
    }

    return [...map.values()];
  });

  toggleIngredient(ingredient: Ingredient): void {
    this.cartService.updateSelectedIngredient(ingredient);
  }
}
