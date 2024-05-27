import { catchError, map, Observable, of, throwError } from 'rxjs';

import {
  PaginationAdapter,
  PaginationProductAPI,
} from '@/core/interface/pagination';
import {
  CreateProduct,
  Product,
  ProductPaginationOptions,
  UpdateProduct,
} from '@/core/interface/product';
import { EXCLUDE_LOADER } from '@/core/tokens';
import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly base = `${environment.API_URL}/auth`;
  constructor(private readonly http: HttpClient) {}

  get(
    productPaginationOptions: ProductPaginationOptions
  ): Observable<PaginationAdapter<Product[]>> {
    let params = new HttpParams();
    params = params.set('search', productPaginationOptions.search);
    params = params.set('limit', productPaginationOptions.limit);
    params = params.set('skip', productPaginationOptions.skip);

    return this.http
      .get<PaginationProductAPI>(`${this.base}/products/search`, {
        params,
      })
      .pipe(
        map((res) => ({
          metadata: {
            limit: res.limit,
            skip: res.skip,
            total: res.total,
          },
          data: res.products,
        }))
      );
  }

  create(createProduct: CreateProduct): Observable<Product> {
    return this.http.post<Product>(`${this.base}/products/add`, createProduct);
  }

  update(id: number, updateProduct: UpdateProduct): Observable<Product> {
    delete updateProduct.id;
    return this.http.put<Product>(`${this.base}/products/${id}`, {
      ...updateProduct,
    });
  }

  delete(id: number): Observable<string> {
    let params = new HttpParams();
    params = params.set('id', id);
    //Add reponseType text because not return a JSON return a plain text
    return this.http.delete(`${this.base}/products`, {
      params,
      responseType: 'text',
    });
  }

  findById(id: string): Observable<Product> {
    return this.http
      .get<Product>(`${this.base}/products/${id}`, {
        context: new HttpContext().set(EXCLUDE_LOADER, true),
      })
      .pipe(
        catchError((error) => {
          console.log(error.message);
          if (error?.message?.includes('Status 404')) {
            console.log(error.message);
            return of(null);
          }
          return throwError(() => error);
        })
      );
  }
}
