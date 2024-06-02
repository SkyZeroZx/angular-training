import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { SwiperComponent } from '../swiper/swiper.component';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-second-slider',
  standalone: true,
  imports: [SwiperComponent],
  templateUrl: './second-slider.component.html',
  styleUrl: './second-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondSliderComponent implements OnInit {
  listProducts = signal<any[]>([]);

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.listProducts.set(res);
      },
    });
  }
}
