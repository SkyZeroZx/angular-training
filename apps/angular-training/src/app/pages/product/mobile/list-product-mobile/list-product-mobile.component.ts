import { PRODUCT_PAGINATION_OPTIONS } from '@/core/constant';
import { MetadataPagination } from '@/core/interface/pagination';
import { Product, ProductPaginationOptions } from '@/core/interface/product';
import { ProductService } from '@/services/product';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-list-product-mobile',
  templateUrl: './list-product-mobile.component.html',
  styleUrl: './list-product-mobile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListProductMobileComponent implements OnInit {
  products = signal<Product[]>([]);

  metadataPagination = signal<MetadataPagination>(null);

  queryParams = signal<ProductPaginationOptions>(
    structuredClone(PRODUCT_PAGINATION_OPTIONS)
  );

  isLoadingAppend = signal(false);

  hasNextPage = computed(() => {
    return this.products().length !== this.metadataPagination().total;
  });

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.productService.get(this.queryParams()).subscribe({
      next: ({ data, metadata }) => {
        this.products.set(data);
        this.metadataPagination.set(metadata);
      },
    });
  }

  onScroll() {
    if (this.hasNextPage() && !this.isLoadingAppend()) {
      this.queryParams.update((params) => ({
        ...params,
        skip: params.skip + 10,
      }));
      this.appendData();
    }
  }

  appendData() {
    this.isLoadingAppend.set(true);
    this.productService.get(this.queryParams()).subscribe({
      next: ({ data, metadata }) => {
        this.metadataPagination.set(metadata);
        this.products.set([...this.products(), ...data]);
        this.isLoadingAppend.set(false);
      },
    });
  }
}
