import { HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { LoaderInterceptorService } from './loader-interceptor.service';
import { LoaderService } from './loader.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoaderInterceptorService', () => {
	let interceptor: LoaderInterceptorService;
	let loaderService: LoaderService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [LoaderInterceptorService, LoaderService]
		});

		interceptor = TestBed.inject(LoaderInterceptorService);
		loaderService = TestBed.inject(LoaderService);
	});

	it('should show the loader when a request is started', () => {
		// Spy ShowLoader
		const showLoaderSpy = jest.spyOn(loaderService, 'showLoader');

		// Create HTTP Request
		const request = new HttpRequest('GET', '/api/test');

		// Intercept Request
		const response = interceptor.intercept(request, {
			handle: () =>
				new Observable((subscriber) => {
					subscriber.complete();
				})
		});

		// await finalized
		response.subscribe();

		// Validate called method
		expect(showLoaderSpy).toHaveBeenCalled();
	});

	it('should hide the loader when a request is completed', () => {
		// Spy Hide Loader
		const hideLoaderSpy = jest.spyOn(loaderService, 'hideLoader');

		// Create HTTP Request
		const request = new HttpRequest('GET', '/api/test');

		// Intercept Request
		const response = interceptor.intercept(request, {
			handle: () =>
				new Observable((subscriber) => {
					subscriber.complete();
				})
		});

		// await finalized
		response.subscribe();

		// Validate called method
		expect(hideLoaderSpy).toHaveBeenCalled();
	});

	it('should not call show spinner when url is verification', () => {
		// Spy Show Spinner
		const spyShowSpinner = jest.spyOn(loaderService, 'showLoader');

		// Create HTTP Request
		const request = new HttpRequest('GET', 'verification');

		// Intercept Request
		const response = interceptor.intercept(request, {
			handle: () =>
				new Observable((subscriber) => {
					subscriber.complete();
				})
		});

		// await finalized
		response.subscribe();

		// Validate not called method
		expect(spyShowSpinner).not.toHaveBeenCalled();
	});
});
