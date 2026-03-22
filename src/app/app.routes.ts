import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dishes',
    pathMatch: 'full',
  },
  {
    path: 'dishes',
    loadComponent: () =>
      import('../features/dish/components/dishes-list/dishes-list.component').then(
        (m) => m.DishesListComponent,
      ),
  },
  {
    path: 'dishes/new',
    loadComponent: () =>
      import('../features/dish/components/dish-form/dish-form.component').then(
        (m) => m.DishFormComponent,
      ),
  },
  {
    path: 'dishes/:id',
    loadComponent: () =>
      import('../features/dish/components/dish-form/dish-form.component').then(
        (m) => m.DishFormComponent,
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('../features/cart/components/cart-page/cart-page.component').then(
        (m) => m.CartPageComponent,
      ),
  },
  { path: '**', redirectTo: 'dishes' },
];
