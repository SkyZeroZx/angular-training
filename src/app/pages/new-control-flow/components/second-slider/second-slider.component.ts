import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { SwiperComponent } from '../swiper/swiper.component';
import { ProductDummyService } from '../../../../services/products/product.service';
import { Slider } from '../../../../core/interfaces';

@Component({
  selector: 'app-second-slider',
  standalone: true,
  imports: [SwiperComponent],
  templateUrl: './second-slider.component.html',
  styleUrl: './second-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondSliderComponent implements OnInit {
  listProducts: Slider[] = [];

  constructor(
    private readonly productDummyService: ProductDummyService,
    private readonly changeDetectoRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productDummyService.getProducts().subscribe({
      next: (res) => {
        this.listProducts = res;
        this.changeDetectoRef.markForCheck();
      },
    });
  }
}
