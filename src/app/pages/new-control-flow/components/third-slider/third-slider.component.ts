import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SwiperComponent } from '../swiper/swiper.component';
import { Slider } from '../../../../core/interfaces';
import { FakeStoreService } from '../../../../services/fake-store/fake-store.service';

@Component({
  selector: 'app-third-slider',
  standalone: true,
  imports: [SwiperComponent],
  templateUrl: './third-slider.component.html',
  styleUrl: './third-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThirdSliderComponent {
  fakeStoreProducts = signal<Slider[]>([]);

  constructor(private readonly fakeStoreService: FakeStoreService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.fakeStoreService.getProductStore().subscribe({
      next: (res) => {
        this.fakeStoreProducts.set(res);
      },
    });
  }
}
