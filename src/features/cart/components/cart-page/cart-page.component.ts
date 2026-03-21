import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { CART_PAGE_VIEW, CartPageView } from '../../models/page-view.model';
import { CartMealsList } from '../cart-meals-list/cart-meals-list';
import { CartIngredientsList } from '../cart-ingredients-list/cart-ingredients-list';
import { STORAGE_KEY } from '../../../../core/models/storage.model';

@Component({
  selector: 'app-cart-page',
  imports: [CartMealsList, CartIngredientsList],
  templateUrl: './cart-page.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPageComponent {
  readonly pageView = signal<CartPageView>(CART_PAGE_VIEW.Meals);
  readonly CART_PAGE_VIEW = CART_PAGE_VIEW;

  constructor() {
    const storagePageView = JSON.parse(localStorage.getItem(STORAGE_KEY.CartView) || "null");
    const isValid = Object.values(CART_PAGE_VIEW).includes(storagePageView);

    if (isValid) this.changePageView(storagePageView);

    effect(() => {
      localStorage.setItem(STORAGE_KEY.CartView, JSON.stringify(this.pageView()));
    });
  }

  changePageView(pageView: CartPageView): void {
    this.pageView.set(pageView);
  }
}
