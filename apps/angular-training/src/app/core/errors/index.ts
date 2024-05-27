import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './global-error-handler';

export const globalErrorHandler = [{ provide: ErrorHandler, useClass: GlobalErrorHandler }];
