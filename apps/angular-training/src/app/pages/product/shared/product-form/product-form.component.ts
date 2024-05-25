import { TypedFormControls } from '@/core/interface/forms';
import { CreateProduct, Product } from '@/core/interface/product';
import { ProductService } from '@/services/product';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  forwardRef,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';

import { ProductValidador } from '../../components/validadors';

@Component({
  selector: 'app-product-form',

  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProductFormComponent),
      multi: true,
    },
  ],
})
export class ProductFormComponent
  implements ControlValueAccessor, Validator, OnInit
{
  productForm!: FormGroup<TypedFormControls<CreateProduct>>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly productService: ProductService,
    private readonly detroyRef: DestroyRef
  ) {}

  ngOnInit() {
    this.initCreateForm();
  }

  initCreateForm() {
    this.productForm = this.fb.group({
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
      description: this.fb.control(null, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255),
        ],
      }),
      title: this.fb.control(null, {
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
      category: this.fb.control(null, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      }),
    });
  }

  // propagates value changes to parent form control when nested address form changes
  registerOnChange(fn: any): void {
    this.productForm.valueChanges.subscribe(fn);
  }

  // marks parent form control as touched when nested address form changes
  registerOnTouched(fn: any): void {
    this.productForm.valueChanges.subscribe(fn);
  }

  registerOnValidatorChange(fn: any): void {
    this.productForm.valueChanges.subscribe(fn);
  }

  // disabled nested address form when parent form control is disabled
  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.productForm.disable() : this.productForm.enable();
  }
  // writes value to nested address form when value is set to parent form control
  writeValue(address: Product): void {
    this.productForm.patchValue(address, { emitEvent: false });
  }

  get invalid() {
    return this.productForm.invalid;
  }

  // propagates validation errors from nested address form to parent form control
  validate(_control: AbstractControl): ValidationErrors | null {
    return this.productForm.valid ? null : { address: true };
  }
}
