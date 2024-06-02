import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
} from '@angular/core';
import { SwiperDirective } from './directive/swiper.directive';

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [SwiperDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwiperComponent implements OnInit {
  list = input.required<any[]>();

  ngOnInit(): void {
    console.log('Initializing Swiper');
  }
}
