import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ProductService } from '@/services/product';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';

export class ProductValidador {
  static productAlreadyExist(productService: ProductService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      // Add timer for debounce
      return timer(200).pipe(
        switchMap(() =>
          productService
            .findById(control.value.id)
            .pipe(map((result) => (result ? { alreadyExist: true } : null)))
        )
      );
    };
  }
}
