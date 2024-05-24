import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DEFAULT_ERROR } from '@/core/constant';
import { EXCLUDE_LOADER } from '@/core/tokens';
import { ToastService } from '@/shared/ui';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(
    private readonly toastService: ToastService,
    private readonly router: Router
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((returnedError) => {
        let errorMessage = '';
        const bypassErrorMessage = req.context.get(EXCLUDE_LOADER) === true;

        if (returnedError instanceof HttpErrorResponse) {
          errorMessage = `Error Status ${returnedError.status}: ${returnedError.statusText} - ${returnedError.error}`;
          this.mappedErrorHttp(returnedError);
        }

        if (!bypassErrorMessage) {
          console.error(errorMessage || returnedError);

          this.toastService.error({
            title: 'Error',
            message: `${
              returnedError.error.message ||
              returnedError.error ||
              DEFAULT_ERROR
            }`,
          });
        }

        if (errorMessage) {
          return throwError(() => new Error(errorMessage));
        }
        return throwError(() => new Error(DEFAULT_ERROR));
      })
    );
  }

  private mappedErrorHttp(httpErrorResponse: HttpErrorResponse) {
    const { status } = httpErrorResponse;
    if (status === 403) {
      this.router.navigate(['/auth/login']);
    }
  }
}
