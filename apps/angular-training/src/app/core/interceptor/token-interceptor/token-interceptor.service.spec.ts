import { TokenInterceptorService } from './token-interceptor.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../services/auth';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

describe('TokenInterceptorService', () => {
	const baseAPI = '/api';
	let authService: AuthService;
	let httpTestingController: HttpTestingController;
	let httpClient: HttpClient;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				{
					provide: HTTP_INTERCEPTORS,
					useClass: TokenInterceptorService,
					multi: true
				},
				AuthService
			]
		});

		authService = TestBed.inject(AuthService);
		httpClient = TestBed.inject(HttpClient);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	it('should add the token to the request headers', async () => {
		// Create Token Mock
		const token = 1234567890;
		const spyAuthService = jest.spyOn(authService, 'getToken');

		// Set Token
		environment.authorId = token;

		const http$ = httpClient.get(baseAPI);
		const request = firstValueFrom(http$);

		//Validte call http
		httpTestingController.expectOne(baseAPI).flush('body', {});

		await request;

		expect(spyAuthService).toHaveBeenCalled();
	});

	it('should not add the token to the request headers if not exist', async () => {
		const spyAuthService = jest.spyOn(authService, 'getToken');
		// Set Token void
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(environment.authorId as any) = null;

		const http$ = httpClient.get(baseAPI);
		const request = firstValueFrom(http$);

		httpTestingController.expectOne(baseAPI).flush('body', {});

		await request;

		expect(spyAuthService).toHaveBeenCalled();
	});
});
