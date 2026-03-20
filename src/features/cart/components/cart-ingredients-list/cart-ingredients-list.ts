import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CART_PAGE_VIEW, CartPageView } from '../../models/page-view.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeft } from '@ng-icons/heroicons/outline';
import { CartProgress } from '../cart-progress/cart-progress';

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

  readonly CART_PAGE_VIEW = CART_PAGE_VIEW;
}
