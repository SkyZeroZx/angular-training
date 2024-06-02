import { NgModule } from '@angular/core';
import { CounterDownComponent } from './counter-down.component';
import { CounterDownRoutingModule } from './counter-down.routing';
import { SpinnerCounterComponent } from './components/spinner-counter/spinner-counter.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CounterDownComponent],
  imports: [CounterDownRoutingModule, SpinnerCounterComponent, MatButtonModule],
})
export class CounterDownModule {}
