import { Observable, map } from 'rxjs';
import { Product } from '../../interface/product';
import { DatePipe } from '@angular/common';

export function formatProduct() {
  const datePipe = new DatePipe('en-US');
  return function (
    source$: Observable<Product | undefined>
  ): Observable<Product | undefined> {
    return source$.pipe(
      map((value) => {
        return {
          ...value,
          createdAt: datePipe.transform(
            value?.meta.createdAt,
            'YYYY-MM-dd',
            '+0000'
          ),
          updatedAt: datePipe.transform(
            value?.meta.updatedAt,
            'YYYY-MM-dd',
            '+0000'
          ),
        } as Product | undefined;
      })
    );
  };
}
