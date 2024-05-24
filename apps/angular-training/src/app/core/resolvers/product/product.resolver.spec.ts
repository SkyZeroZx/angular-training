import { ProductService } from '@/services/product';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Product } from '../../interface/product';
import { productResolver } from './product.resolver';
import { Observable, of } from 'rxjs';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';

const mockRoute = { params: { id: '100' } } as unknown as ActivatedRouteSnapshot;
const mockRouteError = { params: { id: 'other' } } as unknown as ActivatedRouteSnapshot;
const listProductMock: Product[] = [
	{
		id: '100',
		name: '',
		description: '',
		logo: '',
		date_release: '',
		date_revision: ''
	}
];

describe('productResolver', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [{ provide: ProductService, useValue: { get: () => of(listProductMock) } }]
		});
	});

	it('should call productResolver when exist id', (done) => {
		const result = runInInjectionContext(TestBed.inject(EnvironmentInjector), () =>
			productResolver(mockRoute, {} as RouterStateSnapshot)
		) as Observable<Product>;
		result.subscribe((res) => {
			expect(res).toEqual(listProductMock[0]);
		});
		done();
	});

	it('should call productResolver when not exist id and navigate to error', (done) => {
		const result = runInInjectionContext(TestBed.inject(EnvironmentInjector), () =>
			productResolver(mockRouteError, {} as RouterStateSnapshot)
		) as Observable<Product>;
		result.subscribe((res) => {
			expect(res).not.toEqual(listProductMock[0]);
		});
		done();
	});
});
