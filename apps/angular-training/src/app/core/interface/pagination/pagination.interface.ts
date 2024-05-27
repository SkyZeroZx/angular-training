import { Product } from '../product';

export interface PaginationAdapter<T = unknown> {
  data: T;
  metadata: MetadataPagination;
}

export interface MetadataPagination {
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
