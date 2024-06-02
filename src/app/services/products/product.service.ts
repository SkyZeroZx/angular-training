import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PaginationAPI, Slider } from '../../core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductDummyService {
  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Slider[]> {
    return this.http.get<PaginationAPI>('https://dummyjson.com/products').pipe(
      map((res) =>
        res.products.map((product) => ({
          id: product.id,
          image: product.images.at(0) || '',
        })),
      ),
    );
  }
}
