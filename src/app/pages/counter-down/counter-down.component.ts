import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
} from '@angular/core';
import { SpinnerCounterComponent } from './components/spinner-counter/spinner-counter.component';

@Component({
  selector: 'app-counter-down',
  templateUrl: './counter-down.component.html',
  styleUrl: './counter-down.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterDownComponent {
  spinnerCounterDown = viewChild.required(SpinnerCounterComponent);

  show = signal(true);

  restartCounter() {
    this.spinnerCounterDown().restartCounter();
  }

  hideCounter() {
    this.show.set(false);
  }

  showCounter() {
    this.show.set(true);
  }

  counterChange(counter: number): void {
    console.log('counterChange', { counter });
  }

  updateTimer() {
    console.log('updateTimer');
  }

  onDestroy() {
    console.log('onDestroy');
  }

  completed() {
    this.hideCounter();
    console.log('completed');
  }
}
