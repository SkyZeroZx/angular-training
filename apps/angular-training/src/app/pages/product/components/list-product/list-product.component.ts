import { Product, ProductPaginationOptions } from '@/core/interface/product';
import { filterSearch } from '@/core/utils/filter-search';
import { FilterService } from '@/services/filter';
import { ProductService } from '@/services/product';
import { PaginationComponent, ToastService } from '@/shared/ui';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListProductComponent implements OnInit {
  filter = this.fb.control<string>('', { nonNullable: true });
  listProduct = signal<Product[]>([]);
  displayedColumns: string[] = [
    '',
    '',
    'Nombre',
    'Descripción',
    'Creacion',
    'Actualización',
    '',
  ];
  filterColumns: string[] = ['id', 'title', 'description'];

  pagination = viewChild(PaginationComponent);

  paginationOptions = signal<ProductPaginationOptions>({
    limit: 100,
    skip: 0,
    search: '',
  });

  constructor(
    private readonly productService: ProductService,
    private readonly filterService: FilterService,
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getInitialProducts();
    this.onChangeFilter();
  }

  getInitialProducts() {
    this.productService.get(this.paginationOptions()).subscribe({
      next: ({ data }) => {
        this.filterService.setInitialData(data);
        this.listProduct.set(data);
      },
    });
  }

  onChangeFilter() {
    this.filter.valueChanges.pipe(filterSearch()).subscribe((filter) => {
      const dataFilter = this.filterService.filterData<Product>(
        filter,
        this.filterColumns
      );
      this.listProduct.set(dataFilter);
      this.pagination().currentPage.set(1);
    });
  }

  confirmDelete(id: number) {
    this.productService.delete(id).subscribe({
      next: () => {
        this.getInitialProducts();
        this.toastService.success({
          title: 'Exito',
          message: 'Se elimino el producto de manera exitosa',
        });
      },
    });
  }
}
