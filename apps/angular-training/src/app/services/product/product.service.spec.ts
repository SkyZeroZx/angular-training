import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { Product, UpdateProduct } from '../../core/interface/product';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { PRODUCT_PAGINATION_OPTIONS } from '@/core/constant';

describe('ProductService', () => {
	const RESPONSE_OK = 'OK';
	const product: Product = {
		id: 0,
		title: '',
		description: '',
		category: '',
		price: 0,
		images: [],
		thumbnail: '',
		meta: {
			createdAt: '',
			updatedAt: ''
		}
	};

	let service: ProductService;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
		service = TestBed.inject(ProductService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should create a product', () => {
		const expectedProduct: Product = { ...product };

		//Mocking http return post
		jest.spyOn(service['http'], 'post').mockReturnValueOnce(of(expectedProduct));

		service.create(product).subscribe((res) => {
			expect(res).toEqual(expectedProduct);
		});
	});

	it('should get list products', () => {
		const lisProducts: Product[] = [product, product, product];
		jest.spyOn(service['http'], 'get').mockReturnValueOnce(of(lisProducts));

		service.get(PRODUCT_PAGINATION_OPTIONS).subscribe((res) => {
			expect(res).toEqual(lisProducts);
		});
	});

	it('should update  products', () => {
		const updateProductPartial: UpdateProduct = {
			title: 'updateTitle'
		};

		const id = product.id;

		const expectedProduct: Product = { ...product, ...updateProductPartial };

		jest.spyOn(service['http'], 'put').mockReturnValueOnce(of(expectedProduct));

		service.update(id, updateProductPartial).subscribe((res) => {
			expect(res).toEqual(expectedProduct);
		});
	});

	it('should delete product', () => {
		const id = product.id;
		jest.spyOn(service['http'], 'delete').mockReturnValueOnce(of(RESPONSE_OK));

		service.delete(id).subscribe((res) => {
			expect(res).toEqual(RESPONSE_OK);
		});
	});

	it('should validate exist product', () => {
		const id = product.id;
		jest.spyOn(service['http'], 'get').mockReturnValueOnce(of(true));

		service.findById(id.toString()).subscribe((res) => {
			expect(res).toEqual(true);
		});
	});
});
