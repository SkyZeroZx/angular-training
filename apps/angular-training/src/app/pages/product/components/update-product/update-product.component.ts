import { TypedFormControls } from '@/core/interface/forms';
import { Product } from '@/core/interface/product';
import { addYearToDate, currentDate } from '@/core/utils/date';
import { ProductService } from '@/services/product';
import { ToastService } from '@/shared/ui';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-update-product',
	templateUrl: './update-product.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
	updateProductForm!: FormGroup<TypedFormControls<Product>>;

	minDate = currentDate();

	constructor(
		private activatedRoute: ActivatedRoute,
		private fb: FormBuilder,
		private productService: ProductService,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.activatedRoute.data.subscribe({
			next: (res) => {
				const data = res['product'] as Product;

				this.initUpdateForm(data);
			}
		});
	}

	initUpdateForm(product: Product) {
		// this.updateProductForm = this.fb.group({
		// 	id: this.fb.control(
		// 		{
		// 			value: product.id,
		// 			disabled: true
		// 		},
		// 		{
		// 			nonNullable: true,
		// 			validators: Validators.compose([
		// 				Validators.required,
		// 				Validators.minLength(3),
		// 				Validators.maxLength(100)
		// 			])
		// 		}
		// 	),
		// 	name: this.fb.control(product.name, {
		// 		nonNullable: true,
		// 		validators: Validators.compose([
		// 			Validators.required,
		// 			Validators.minLength(5),
		// 			Validators.maxLength(100)
		// 		])
		// 	}),
		// 	logo: this.fb.control(product.logo, {
		// 		nonNullable: true,
		// 		validators: Validators.compose([Validators.required])
		// 	}),
		// 	description: this.fb.control(product.description, {
		// 		nonNullable: true,
		// 		validators: Validators.compose([
		// 			Validators.required,
		// 			Validators.minLength(10),
		// 			Validators.maxLength(200)
		// 		])
		// 	}),

		// 	date_release: this.fb.control(product.date_release, {
		// 		nonNullable: true,
		// 		validators: Validators.compose([Validators.required])
		// 	}),
		// 	date_revision: this.fb.control(
		// 		{
		// 			value: product.date_revision,
		// 			disabled: true
		// 		},
		// 		{
		// 			nonNullable: true,
		// 			validators: Validators.compose([Validators.required])
		// 		}
		// 	)
		// });
	}

	onChangeReleaseDate(event: Event) {
		const target = event.target as HTMLInputElement;
		const dateAdd = addYearToDate(target.value);
		// this.updateProductForm.get('date_revision')?.setValue(dateAdd);
	}

	update() {
		const product = this.updateProductForm.getRawValue();
		this.productService.update(product.id, product).subscribe({
			next: () => {
				this.toastService.success({
					title: 'Exito',
					message: 'Se actualizo exitosamente el registro'
				});
			}
		});
	}
}
