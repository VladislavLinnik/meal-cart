import { Component, inject, output, Signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRight, heroMinus, heroPlus, heroTrash } from '@ng-icons/heroicons/outline';
import { CART_PAGE_VIEW, CartPageView } from '../../models/page-view.model';
import { CartService } from '../../../../core/services/cart.service';
import { CartDish } from '../../../../core/models/cart.model';
import { RouterLink } from '@angular/router';
import { injectConfirmChecker } from '../../../../core/utils/confirm-checker';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-cart-dishes-list',
  imports: [NgIcon, RouterLink, TranslocoPipe],
  viewProviders: [provideIcons({ heroArrowRight, heroMinus, heroPlus, heroTrash })],
  templateUrl: './cart-dishes-list.html',
})
export class CartDishesList {
  readonly changeViewSelected = output<CartPageView>();
  readonly cartService = inject(CartService);
  readonly cart: Signal<CartDish[]> = this.cartService.cart;
  private readonly confirmChecker = injectConfirmChecker();
  private readonly translocoService = inject(TranslocoService);

  readonly CART_PAGE_VIEW = CART_PAGE_VIEW;

  removeAll(): void {
    this.confirmChecker(() => this.cartService.clear(), {
      message: this.translocoService.translate('cart.removeAllConfirmMessage'),
      confirmText: this.translocoService.translate('cart.removeAllConfirmButton'),
    });
  }

  removeFromCart(id: string): void {
    this.confirmChecker(() => this.cartService.removeDish(id), {
      message: this.translocoService.translate('cart.removeItemConfirmMessage'),
      confirmText: this.translocoService.translate('cart.removeItemConfirmButton'),
    });
  }

  updateQuantity(id: string, quantity: number): void {
    this.cartService.updateQuantity(id, quantity);
  }
}
