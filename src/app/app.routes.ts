import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'counter-down',
    loadChildren: () =>
      import('./pages/counter-down/counter-down.module').then(
        (m) => m.CounterDownModule,
      ),
  },
  {
    path: 'ng-content-fallback',
    loadChildren: () =>
      import('./pages/ng-content-fallback/ng-content-fallack.module').then(
        (m) => m.NgContentFallbackModule,
      ),
  },
  {
    path: 'new-control-flow',
    loadComponent: () =>
      import('./pages/new-control-flow/new-control-flow.component').then(
        (c) => c.NewControlFlowComponent,
      ),
  },
  {
    path: 'legacy-counter-down',
    redirectTo: 'counter-down',
  },
];
