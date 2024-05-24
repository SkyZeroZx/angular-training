import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './loader.service';
import { EXCLUDE_LOADER } from '../../tokens';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptorService implements HttpInterceptor {
  constructor(private loader: LoaderService) {}
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const excludeLoader = req.context.get(EXCLUDE_LOADER) === true;
    if (excludeLoader) {
      return next.handle(req);
    }

    this.loader.showLoader();
    return next.handle(req).pipe(
      finalize(() => {
        this.loader.hideLoader();
      })
    );
  }
}
