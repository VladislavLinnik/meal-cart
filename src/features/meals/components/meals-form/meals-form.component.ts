import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeft, heroPlus } from '@ng-icons/heroicons/outline';
import { Router, RouterLink } from '@angular/router';
import { MealsService } from '../../../../core/services/meals.service';
import { Ingredient, UnitMeasurement } from '../../../../core/models/ingredient.model';
import { KeyValue, NgClass } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meal } from '../../../../core/models/meals.model';
import { asGroup } from '../../../../core/utils/form.helper';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-meals-form',
  imports: [NgIcon, RouterLink, ReactiveFormsModule, NgClass],
  viewProviders: [provideIcons({ heroArrowLeft, heroPlus })],
  templateUrl: './meals-form.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealsFormComponent implements OnInit {
  readonly id = input<string>();

  private readonly router = inject(Router);
  private readonly mealsService = inject(MealsService);
  private readonly cartService = inject(CartService);
  private readonly fb = inject(FormBuilder);

  readonly asGroup = asGroup;
  readonly units: KeyValue<string, UnitMeasurement>[] = this.mealsService.getUnitMeasurements();
  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([]),
  });

  ngOnInit(): void {
    if (this.isEditMode) this.getMeal();
    else this.addIngredient();
  }

  get ingredients(): FormArray {
    return this.form.controls['ingredients'] as FormArray;
  }

  get isEditMode(): boolean {
    return !!this.id();
  }

  addIngredient(ingredient?: Ingredient): void {
    const formGroup = this.fb.group({
      name: [ingredient?.name ?? '', [Validators.required, Validators.maxLength(50)]],
      amount: [ingredient?.amount ?? '', Validators.required],
      unit: [ingredient?.unit ?? 'Piece', Validators.required],
    });
    this.ingredients.push(formGroup);
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  save(): void {
    if (this.form.invalid) return;

    if (this.isEditMode) {
      this.mealsService.updateMeal(this.id()!, this.form.getRawValue() as Partial<Meal>);
      this.cartService.updateMeal(this.id()!, this.form.getRawValue() as Partial<Meal>);
      void this.router.navigate(['meals']);
    } else {
      this.mealsService.addMeal(this.form.getRawValue() as Omit<Meal, 'id'>);
      void this.router.navigate(['meals']);
    }
  }

  getMeal(): void {
    if (!this.isEditMode) return;

    const meal = this.mealsService.getMeal(this.id()!);
    if (!meal) {
      void this.router.navigate(['meals']);
      return;
    }

    this.form.patchValue({ name: meal.name });

    meal.ingredients.forEach((ingredient) => this.addIngredient(ingredient));
  }
}
