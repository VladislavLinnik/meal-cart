import { ChangeDetectionStrategy, Component, inject, output, Signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRight, heroMinus, heroPlus, heroTrash } from '@ng-icons/heroicons/outline';
import { CART_PAGE_VIEW, CartPageView } from '../../models/page-view.model';
import { CartService } from '../../../../core/services/cart.service';
import { CartMeal } from '../../../../core/models/cart.model';
import { RouterLink } from '@angular/router';
import { I18nPluralPipe } from '@angular/common';

@Component({
  selector: 'app-cart-meals-list',
  imports: [NgIcon, RouterLink, I18nPluralPipe],
  viewProviders: [provideIcons({ heroArrowRight, heroMinus, heroPlus, heroTrash })],
  templateUrl: './cart-meals-list.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartMealsList {
  readonly changeViewSelected = output<CartPageView>();
  readonly cartService = inject(CartService);
  readonly cart: Signal<CartMeal[]> = this.cartService.cart;

  readonly CART_PAGE_VIEW = CART_PAGE_VIEW;

  pluralMap: { [k: string]: string } = {
    '=1': '# інгредієнт',
    '=2': '# інгредієнта',
    '=3': '# інгредієнта',
    '=4': '# інгредієнта',
    other: '# інгредієнтів',
  };

  removeAll(): void {
    this.cart().forEach((cart: CartMeal) => {
      this.removeFromCart(cart.id)
    });
  };

  removeFromCart(id: string): void {
    this.cartService.removeMeal(id);
  }

  updateQuantity(id: string, quantity: number): void {
    this.cartService.updateQuantity(id, quantity);
  }
}
