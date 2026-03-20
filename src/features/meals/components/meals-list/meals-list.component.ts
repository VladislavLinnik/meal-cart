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
  readonly meals: Signal<Meal[]> = this.mealsService.meals;
  private readonly searchSubject = new Subject<string>();

  filteredMeals = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.mealsService.meals();

    return this.meals()
      .filter((meal) => meal.name.toLowerCase().includes(query));
  });

  searchQuery = toSignal(
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      ),
    { initialValue: '' },
  );

  onSearch(value: string): void {
    this.searchSubject.next(value);
  }

  remove(id: string): void {
    this.mealsService.removeMeal(id);
  }
}
