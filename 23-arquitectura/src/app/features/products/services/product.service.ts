import { Injectable, signal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly _products = signal<Product[]>([]);
  readonly products = this._products.asReadonly();

  addProduct(product: Product): void {
    this._products.update(list => [...list, product]);
  }

  removeProduct(id: number): void {
    this._products.update(list => list.filter(p => p.id !== id));
  }
}
