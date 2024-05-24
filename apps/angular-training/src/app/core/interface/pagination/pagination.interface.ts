import { Product } from '../product';

export class PaginationAdapter<T = unknown> {
  data: T;
  total: number;
  skip: number;
  limit: number;
}

export class PaginationProductAPI {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
