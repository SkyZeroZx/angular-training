import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterDownComponent } from './counter-down.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: CounterDownComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class CounterDownRoutingModule {}
