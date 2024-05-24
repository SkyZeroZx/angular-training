import { Route } from '@angular/router';
import { ContentComponent } from './layout';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('@/pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'product',
    component: ContentComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@/pages/product/product.module').then((m) => m.ProductModule),
      },
    ],
  },
  {
    path: 'error',
    loadChildren: () =>
      import('@/pages/error/error.module').then((m) => m.ErrorModule),
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' },
];
