import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
} from '@angular/core';
import { SwiperDirective } from './directive/swiper.directive';
import { SwiperOptions } from 'swiper/types';

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

  config: SwiperOptions = {
    spaceBetween: 6,
    lazyPreloadPrevNext: 0,
    navigation: true,
    pagination: false,
    autoHeight: false,
    loop: true,
    breakpoints: {
      600: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      601: {
        slidesPerView: 2,
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1000: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  };

  ngOnInit(): void {
    console.log('Initializing Swiper');
  }
}
