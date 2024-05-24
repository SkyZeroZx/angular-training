import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './loader-interceptor/loader-interceptor.service';
import { ErrorInterceptorService } from './error-interceptor/error-interceptor.service';
import { TokenInterceptorService } from './token-interceptor/token-interceptor.service';

export const interceptorsProviders = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: TokenInterceptorService,
		multi: true
	},
	{
		provide: HTTP_INTERCEPTORS,
		useClass: ErrorInterceptorService,
		multi: true
	},
	{
		provide: HTTP_INTERCEPTORS,
		useClass: LoaderInterceptorService,
		multi: true
	}
];
