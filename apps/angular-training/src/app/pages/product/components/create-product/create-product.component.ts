import { CreateProduct } from '@/core/interface/product';
import { ProductService } from '@/services/product';
import { ToastService } from '@/shared/ui';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProductComponent {
  createProductForm: FormControl<CreateProduct> = this.fb.control(null);

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastService: ToastService
  ) {}

  create() {
    const createProduct = this.createProductForm.getRawValue();
    this.productService.create(createProduct).subscribe({
      next: () => {
        this.toastService.success({
          title: 'Exito',
          message: 'Se creo nuevo producto exitosamente',
        });
      },
    });
  }
}
