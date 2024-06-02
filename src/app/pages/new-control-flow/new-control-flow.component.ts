import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FirstSliderComponent } from './components/first-slider/first-slider.component';
import { SecondSliderComponent } from './components/second-slider/second-slider.component';
import { ThirdSliderComponent } from './components/third-slider/third-slider.component';

@Component({
  selector: 'app-new-control-flow',
  standalone: true,
  imports: [FirstSliderComponent, SecondSliderComponent, ThirdSliderComponent],
  templateUrl: './new-control-flow.component.html',
  styleUrl: './new-control-flow.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewControlFlowComponent {}
