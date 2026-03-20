import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'meals',
    pathMatch: 'full',
  },
  {
    path: 'meals',
    loadComponent: () =>
      import('../features/meals/components/meals-list/meals-list.component').then(
        (m) => m.MealsListComponent,
      ),
  },
  {
    path: 'meals/new',
    loadComponent: () =>
      import('../features/meals/components/meals-form/meals-form.component').then(
        (m) => m.MealsFormComponent,
      ),
  },
  {
    path: 'meals/:id',
    loadComponent: () =>
      import('../features/meals/components/meals-form/meals-form.component').then(
        (m) => m.MealsFormComponent,
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('../features/cart/components/cart-page/cart-page.component').then(
        (m) => m.CartPageComponent,
      ),
  },
  { path: '**', redirectTo: 'meals' },
];
