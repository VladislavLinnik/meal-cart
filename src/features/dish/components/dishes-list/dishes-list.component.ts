import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencil, heroPlus, heroTrash } from '@ng-icons/heroicons/outline';
import { RouterLink } from '@angular/router';
import { Dish } from '../../../../core/models/dish.model';
import { DishService } from '../../../../core/services/dish.service';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
} from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartService } from '../../../../core/services/cart.service';
import { DishCardComponent } from '../dish-card/dish-card.component';

@Component({
  selector: 'app-dishes-list',
  imports: [NgIcon, RouterLink, DishCardComponent],
  templateUrl: './dishes-list.component.html',
  viewProviders: [provideIcons({ heroPencil, heroTrash, heroPlus })],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishesListComponent {
  protected readonly dishService = inject(DishService);
  private readonly cartService = inject(CartService);
  private readonly searchSubject = new Subject<string>();

  readonly filteredDishes = computed<Dish[]>(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.dishService.dishes();

    return this.dishService.dishes().filter((dish) => dish.name.toLowerCase().includes(query));
  });

  readonly cartDishIds = computed<Set<string>>(() => {
    return new Set(this.cartService.cart().map((dish: Dish) => dish.id));
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
  }

  addToCart(dish: Dish): void {
    this.cartService.addDish(dish);
  }

  removeFromCart(id: string): void {
    this.cartService.removeDish(id);
  }
}
