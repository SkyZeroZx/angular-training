import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SwiperComponent } from '../swiper/swiper.component';
import { Slider } from '../../../../core/interfaces';

@Component({
  selector: 'app-first-slider',
  standalone: true,
  imports: [SwiperComponent],
  templateUrl: './first-slider.component.html',
  styleUrl: './first-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstSliderComponent {
  initialList: Slider[] = [
    {
      id: 1,
      image: 'https://swiperjs.com/demos/images/nature-1.jpg',
    },
    {
      id: 2,
      image: 'https://swiperjs.com/demos/images/nature-2.jpg',
    },
    {
      id: 3,
      image: 'https://swiperjs.com/demos/images/nature-3.jpg',
    },
    {
      id: 4,
      image: 'https://swiperjs.com/demos/images/nature-4.jpg',
    },
    {
      id: 5,
      image: 'https://swiperjs.com/demos/images/nature-5.jpg',
    },
    {
      id: 6,
      image: 'https://swiperjs.com/demos/images/nature-6.jpg',
    },
  ];
}
