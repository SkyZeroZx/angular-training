import { Observable, map } from 'rxjs';

import {
  CreateProduct,
  Product,
  ProductPaginationOptions,
  UpdateProduct,
} from '@/core/interface/product';
import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import {
  PaginationAdapter,
  PaginationProductAPI,
} from '../../core/interface/pagination';
import { EXCLUDE_LOADER } from '../../core/tokens';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly base = environment.API_URL;
  constructor(private readonly http: HttpClient) {}

  get(
    productPaginationOptions: ProductPaginationOptions
  ): Observable<PaginationAdapter<Product[]>> {
    let params = new HttpParams();
    params = params.set('search', productPaginationOptions.search);
    params = params.set('limit', productPaginationOptions.limit);
    params = params.set('skip', productPaginationOptions.skip);

    return this.http
      .get<PaginationProductAPI>(`${this.base}/auth/products/search`, {
        params,
      })
      .pipe(
        map((res) => ({
          ...res,
          data: res.products,
        }))
      );
  }

  create(createProduct: CreateProduct): Observable<Product> {
    return this.http.post<Product>(`${this.base}/products/add`, createProduct);
  }

  update(id: number, updateProduct: UpdateProduct): Observable<Product> {
    return this.http.put<Product>(`${this.base}/bp/products`, {
      id,
      ...updateProduct,
    });
  }

  delete(id: number): Observable<string> {
    let params = new HttpParams();
    params = params.set('id', id);
    //Add reponseType text because not return a JSON return a plain text
    return this.http.delete(`${this.base}/bp/products`, {
      params,
      responseType: 'text',
    });
  }

  findById(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.base}/products/${id}`, {
      context: new HttpContext().set(EXCLUDE_LOADER, true),
    });
  }
}
