import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgContentFallbackComponent } from './ng-content-fallback.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: NgContentFallbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class NgContentFallbackRoutingModule {}
