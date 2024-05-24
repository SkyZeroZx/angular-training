import { filter, map, of } from 'rxjs';

import { formatProduct } from '@/core/utils/format-product';
import { ProductService } from '@/services/product';
import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';

import { Product } from '../../interface/product';

export const productResolver: ResolveFn<Product | undefined> = (
	route,
	_state,
	productService = inject(ProductService)
) => {
	const router = inject(Router);
	const productId = route.params['id'] as string;
	// return productService.get().pipe(
	// 	map((products) => products.find((product) => product.id === productId)),
	// 	filter((value) => {
	// 		if (!value) {
	// 			router.navigate(['error']);
	// 			return false;
	// 		}

	// 		return true;
	// 	}),
	// 	formatProduct()
	// );
	return of(undefined)
};
