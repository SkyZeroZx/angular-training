import { TypedFormControls } from '@/core/interface/forms';
import { CreateProduct } from '@/core/interface/product';
import { ProductService } from '@/services/product';
import { ToastService } from '@/shared/ui';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductValidador } from '../validadors';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProductComponent implements OnInit {
  createProductForm!: FormGroup<TypedFormControls<CreateProduct>>;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.initCreateForm();
  }

  initCreateForm() {
    this.createProductForm = this.fb.group({
      id: this.fb.control(null, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
        asyncValidators: ProductValidador.productAlreadyExist(
          this.productService
        ),
      }),
      description: this.fb.control('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255),
        ],
      }),
      title: this.fb.control('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      }),
      price: this.fb.control(null, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(10),
          Validators.max(200),
        ],
      }),
      category: this.fb.control('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      }),
    });
  }

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
