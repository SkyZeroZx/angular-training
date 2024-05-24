export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string[];
  thumbnail: string;
  meta: {
    createdAt: string;
    updatedAt: string;
  };
}

export type CreateProduct = Omit<Product, 'images' | 'thumbnail' | 'meta'>;

export type UpdateProduct = Partial<CreateProduct>;

export interface ProductPaginationOptions {
  limit: number;
  skip: number;
  search: string;
}
