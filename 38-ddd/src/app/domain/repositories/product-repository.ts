import { InjectionToken } from '@angular/core';
import { Product, ProductId } from '../entities/product';

export interface ProductRepository {
  findById(id: ProductId): Promise<Product | null>;
  save(product: Product): Promise<void>;
}

export const PRODUCT_REPOSITORY = new InjectionToken<ProductRepository>('ProductRepository');
