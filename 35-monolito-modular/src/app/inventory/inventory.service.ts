import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InventoryServiceContract, InventoryItem } from '../shared';

@Injectable()
export class InventoryService implements InventoryServiceContract {
  private items: InventoryItem[] = [
    { id: crypto.randomUUID(), productId: 'PROD-1', name: 'Widget A', stock: 100, price: 29.99 },
    { id: crypto.randomUUID(), productId: 'PROD-2', name: 'Widget B', stock: 50, price: 49.99 },
  ];

  getItems(): Observable<InventoryItem[]> {
    return of([...this.items]);
  }

  updateStock(productId: string, quantity: number): Observable<InventoryItem> {
    const item = this.items.find(i => i.productId === productId);
    if (item) {
      item.stock += quantity;
      return of({ ...item });
    }
    throw new Error(`Product ${productId} not found`);
  }
}
