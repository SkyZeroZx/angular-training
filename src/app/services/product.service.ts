import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  getProducts() {
    return this.http.get<any[]>('https://dummyjson.com/products').pipe(
      map((res) =>
        res.map((product) => ({
          id: product.id,
          image: product.images.at(0),
        })),
      ),
    );
  }
}
