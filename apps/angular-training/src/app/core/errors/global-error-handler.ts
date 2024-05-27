import { Injectable, ErrorHandler } from '@angular/core';

import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private readonly router: Router) {}

  handleError(error: unknown) {
    const url = this.router.url;
    console.error(`ROUTE ERROR ${url}`);
    console.error(GlobalErrorHandler.name, error);
  }
}
