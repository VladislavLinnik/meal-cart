import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencil, heroPlus, heroTrash } from '@ng-icons/heroicons/outline';
import { RouterLink } from '@angular/router';
import { Dish } from '../../../../core/models/dish.model';
import { DishService } from '../../../../core/services/dish.service';
import { DishIngredientPipe } from '../../pipes/dish-ingredient.pipe';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
} from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartService } from '../../../../core/services/cart.service';
import { CartDish } from '../../../../core/models/cart.model';

@Component({
  selector: 'app-dishes-list',
  imports: [NgIcon, RouterLink, DishIngredientPipe],
  templateUrl: './dishes-list.component.html',
  viewProviders: [provideIcons({ heroPencil, heroTrash, heroPlus })],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishesListComponent {
  private readonly dishService = inject(DishService);
  private readonly cartService = inject(CartService);
  readonly dishes: Signal<Dish[]> = this.dishService.dishes;
  readonly cart: Signal<CartDish[]> = this.cartService.cart;
  private readonly searchSubject = new Subject<string>();

  readonly filteredDishes = computed<Dish[]>(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.dishService.dishes();

    return this.dishes().filter((dish) => dish.name.toLowerCase().includes(query));
  });

  readonly cartDishIds = computed<Set<string>>(() => {
    return new Set(this.cart().map((dish: Dish) => dish.id));
  });

  readonly searchQuery = toSignal(
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()),
    {
      initialValue: '',
    },
  );

  onSearch(value: string): void {
    this.searchSubject.next(value);
  }

  remove(id: string): void {
    this.dishService.removeDish(id);
    this.cartService.removeDish(id);
  }

  addToCart(dish: Dish): void {
    this.cartService.addDish(dish);
  }

  removeFromCart(id: string): void {
    this.cartService.removeDish(id);
  }
}
