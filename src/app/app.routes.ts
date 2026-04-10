import { Routes } from '@angular/router';

const ROUTE_TOKENS = {
  DISHES: 'dishes',
  DISHES_NEW: 'dishes/new',
  DISHES_EDIT: 'dishes/:id',
  CART: 'cart',
  SETTINGS: 'settings',
} as const;


export const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTE_TOKENS.DISHES,
    pathMatch: 'full',
  },
  {
    path: ROUTE_TOKENS.DISHES,
    loadComponent: () =>
      import('../features/dish/components/dishes-list/dishes-list.component').then(
        (m) => m.DishesListComponent,
      ),
  },
  {
    path: ROUTE_TOKENS.DISHES_NEW,
    loadComponent: () =>
      import('../features/dish/components/dish-form/dish-form.component').then(
        (m) => m.DishFormComponent,
      ),
  },
  {
    path: ROUTE_TOKENS.DISHES_EDIT,
    loadComponent: () =>
      import('../features/dish/components/dish-form/dish-form.component').then(
        (m) => m.DishFormComponent,
      ),
  },
  {
    path: ROUTE_TOKENS.CART,
    loadComponent: () =>
      import('../features/cart/components/cart-page/cart-page.component').then(
        (m) => m.CartPageComponent,
      ),
  },
  {
    path: ROUTE_TOKENS.SETTINGS,
    loadComponent: () => import('../features/settings/components/settings/settings.component'),
  },
  { path: '**', redirectTo: ROUTE_TOKENS.DISHES },
];
