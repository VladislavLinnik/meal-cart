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
import { CartDish } from '../../../../core/models/cart.model';
import { CartService } from '../../../../core/services/cart.service';
import { Ingredient, UNIT_MEASUREMENT } from '../../../../core/models/ingredient.model';
import { NgClass } from '@angular/common';
import { FormatIngredientSourcesPipe } from '../../pipes/format-ingredient-sources.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-ingredients-list',
  imports: [NgIcon, CartProgress, NgClass, FormatIngredientSourcesPipe, RouterLink],
  viewProviders: [provideIcons({ heroArrowLeft })],
  templateUrl: './cart-ingredients-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartIngredientsList {
  readonly changeViewSelected = output<CartPageView>();
  readonly cartService = inject(CartService);
  readonly cart: Signal<CartDish[]> = this.cartService.cart;

  readonly CART_PAGE_VIEW = CART_PAGE_VIEW;
  readonly UNIT_MEASUREMENT = UNIT_MEASUREMENT;

  readonly progress = computed(() => {
    const items = this.ingredients();
    const selected = items.filter((x) => x.selected).length;
    return {
      selected,
      total: items.length,
      percent: items.length ? (selected / items.length) * 100 : 0,
    };
  });

  readonly ingredients = computed<Ingredient[]>(() => {
    const map = new Map<string, Ingredient>();

    for (const cartDish of this.cart()) {
      for (const ingredient of cartDish.ingredients) {
        const key = `${ingredient.name}_${ingredient.unit}`;
        const existing = map.get(key);
        const newSource = {
          dishName: cartDish.name,
          quantity: cartDish.quantity,
        };

        map.set(key, {
          ...ingredient,
          amount: ((existing?.amount ?? 0) + ingredient.amount) * cartDish.quantity,
          selected: ingredient.selected,
          sources: existing ? [...existing.sources!, newSource] : [newSource],
        });
      }
    }

    return [...map.values()];
  });

  toggleIngredient(ingredient: Ingredient): void {
    this.cartService.updateSelectedIngredient(ingredient);
  }
}
