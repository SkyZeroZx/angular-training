import { ErrorInterceptorService } from './error-interceptor.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';

const mockError = new HttpErrorResponse({
	status: 500,
	statusText: 'Internal Server Error',
	error: {
		message: 'Something went wrong.'
	},
	url: '/api'
});

describe('ErrorInterceptorService', () => {
	let httpTestingController: HttpTestingController;
	let httpClient: HttpClient;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				{
					provide: HTTP_INTERCEPTORS,
					useClass: ErrorInterceptorService,
					multi: true
				}
			]
		});

		httpTestingController = TestBed.inject(HttpTestingController);
		httpClient = TestBed.inject(HttpClient);
	});

	it('should print console log error with HTTP Error Response', async () => {
		const spyConsole = jest.spyOn(console, 'error').mockImplementationOnce(() => null);

		const http$ = httpClient.get('/api');
		const httpReqPromise = firstValueFrom(http$);
		httpTestingController.expectOne('/api').flush('error', mockError);

		try {
			await httpReqPromise;
			fail('It should have not succeeded');
		} catch (error) {
			expect(spyConsole).toHaveBeenCalledWith(
				`Error Status ${mockError.status}: ${mockError.statusText} - error`
			);
		}
	});
});
