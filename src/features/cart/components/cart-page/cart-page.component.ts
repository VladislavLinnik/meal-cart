import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CART_PAGE_VIEW, CartPageView } from '../../models/page-view.model';
import { CartMealsList } from '../cart-meals-list/cart-meals-list';
import { CartIngredientsList } from '../cart-ingredients-list/cart-ingredients-list';

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

  changePageView(pageView: CartPageView): void {
    this.pageView.set(pageView);
  }
}
