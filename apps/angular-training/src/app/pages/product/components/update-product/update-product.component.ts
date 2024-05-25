import { CreateProduct, Product } from '@/core/interface/product';
import { ProductService } from '@/services/product';
import { ToastService } from '@/shared/ui';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateProductComponent implements OnInit {
  updateProductForm: FormControl<CreateProduct> = this.fb.control(null);

  product = toSignal(
    this.activatedRoute.data.pipe(map((res) => res['product'] as Product))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.initUpdateForm(this.product());
  }

  initUpdateForm(product: Product) {
    this.updateProductForm.setValue(product);
  }

  update() {
    const product = this.updateProductForm.getRawValue();
    this.productService.update(product.id, product).subscribe({
      next: () => {
        this.toastService.success({
          title: 'Exito',
          message: 'Se actualizo exitosamente el registro',
        });
      },
    });
  }
}
