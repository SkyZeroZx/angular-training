import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { LegacySpinnerCounterComponent } from './components/legacy-spinner-counter/legacy-spinner-counter.component';
 import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-counter-down-legacy',
  standalone: true,
  imports: [LegacySpinnerCounterComponent, MatButtonModule],
  templateUrl: './counter-down-legacy.component.html',
  styleUrl: './counter-down-legacy.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterDownLegacyComponent {
  @ViewChild(LegacySpinnerCounterComponent)
  spinnerCounterDown!: LegacySpinnerCounterComponent;

  show = true;

  restartCounter() {
    this.spinnerCounterDown.restartCounter();
  }

  hideCounter() {
    this.show = false;
  }

  showCounter() {
    this.show = true;
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
