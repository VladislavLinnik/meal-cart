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
import { Meal } from '../../../../core/models/meals.model';
import { MealsService } from '../../../../core/services/meals.service';
import { MealIngredientPipe } from '../../pipes/meal-ingredient.pipe';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
} from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartService } from '../../../../core/services/cart.service';
import { CartMeal } from '../../../../core/models/cart.model';

@Component({
  selector: 'app-meals-list',
  imports: [NgIcon, RouterLink, MealIngredientPipe],
  templateUrl: './meals-list.component.html',
  viewProviders: [provideIcons({ heroPencil, heroTrash, heroPlus })],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealsListComponent {
  private readonly mealsService = inject(MealsService);
  private readonly cartService = inject(CartService);
  readonly meals: Signal<Meal[]> = this.mealsService.meals;
  readonly cart: Signal<CartMeal[]> = this.cartService.cart;
  private readonly searchSubject = new Subject<string>();

  readonly filteredMeals = computed<Meal[]>(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.mealsService.meals();

    return this.meals().filter((meal) => meal.name.toLowerCase().includes(query));
  });

  readonly cartMealIds = computed<Set<string>>(() => {
    return new Set(this.cart().map((meal: Meal) => meal.id));
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
    this.mealsService.removeMeal(id);
    this.cartService.removeMeal(id);
  }

  addToCart(meal: Meal): void {
    this.cartService.addMeal(meal);
  }

  removeFromCart(id: string): void {
    this.cartService.removeMeal(id);
  }
}
