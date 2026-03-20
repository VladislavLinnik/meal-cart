import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRight, heroMinus, heroPlus, heroTrash } from '@ng-icons/heroicons/outline';
import { CART_PAGE_VIEW, CartPageView } from '../../models/page-view.model';

@Component({
  selector: 'app-cart-meals-list',
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroArrowRight, heroMinus, heroPlus, heroTrash })],
  templateUrl: './cart-meals-list.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartMealsList {
  readonly changeViewSelected = output<CartPageView>();

  readonly CART_PAGE_VIEW = CART_PAGE_VIEW;
}
