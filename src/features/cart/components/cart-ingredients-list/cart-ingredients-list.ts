import { ChangeDetectionStrategy, Component, inject, output, Signal } from '@angular/core';
import { CART_PAGE_VIEW, CartPageView } from '../../models/page-view.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeft } from '@ng-icons/heroicons/outline';
import { CartProgress } from '../cart-progress/cart-progress';
import { CartMeal } from '../../../../core/models/cart.model';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-cart-ingredients-list',
  imports: [NgIcon, CartProgress],
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
}
