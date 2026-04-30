import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  {
    path: 'menu',
    loadComponent: () =>
      import('./components/menu/menu.component').then((m) => m.MenuComponent),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./components/order-history/order-history.component').then(
        (m) => m.OrderHistoryComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
  },
  { path: '**', redirectTo: 'menu' },
];
