import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeft, heroPlus } from '@ng-icons/heroicons/outline';
import { Router, RouterLink } from '@angular/router';
import { DishService } from '../../../../core/services/dish.service';
import { Ingredient, UnitMeasurement } from '../../../../core/models/ingredient.model';
import { KeyValue, NgClass } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dish } from '../../../../core/models/dish.model';
import { asGroup } from '../../../../core/utils/form.helper';

@Component({
  selector: 'app-dish-form',
  imports: [NgIcon, RouterLink, ReactiveFormsModule, NgClass],
  viewProviders: [provideIcons({ heroArrowLeft, heroPlus })],
  templateUrl: './dish-form.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishFormComponent implements OnInit {
  readonly id = input<string>();

  private readonly router = inject(Router);
  private readonly dishService = inject(DishService);
  private readonly fb = inject(FormBuilder);

  readonly asGroup = asGroup;
  readonly units: KeyValue<string, UnitMeasurement>[] = this.dishService.getUnitMeasurements();
  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([]),
  });

  ngOnInit(): void {
    if (this.isEditMode()) this.getDish();
    else this.addIngredient();
  }

  get ingredients(): FormArray {
    return this.form.controls['ingredients'] as FormArray;
  }

  readonly isEditMode = computed(() => !!this.id());

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

    if (this.isEditMode()) {
      this.dishService.updateDish(this.id()!, this.form.getRawValue() as Partial<Dish>);
    } else {
      this.dishService.addDish(this.form.getRawValue() as Omit<Dish, 'id'>);
    }

    void this.router.navigate(['dishes']);
  }

  getDish(): void {
    const dish = this.dishService.getDish(this.id()!);
    if (!dish) {
      void this.router.navigate(['dishes']);
      return;
    }

    this.form.patchValue({ name: dish.name });

    dish.ingredients.forEach((ingredient) => this.addIngredient(ingredient));
  }
}
