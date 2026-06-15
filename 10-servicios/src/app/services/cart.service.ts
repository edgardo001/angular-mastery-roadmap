import { Injectable, computed, effect, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  items$: Observable<CartItem[]> = this.itemsSubject.asObservable();

  items = toSignal(this.items$, { initialValue: [] as CartItem[] });

  itemsChanged$ = toObservable(this.items);

  total = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  itemCount = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  constructor() {
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.items()));
    });
  }

  addItem(item: Omit<CartItem, 'quantity'>): void {
    const current = this.itemsSubject.getValue();
    const existing = current.find((i) => i.id === item.id);
    if (existing) {
      this.updateQuantity(item.id, existing.quantity + 1);
    } else {
      this.itemsSubject.next([...current, { ...item, quantity: 1 }]);
    }
  }

  removeItem(id: number): void {
    this.itemsSubject.next(
      this.itemsSubject.getValue().filter((i) => i.id !== id)
    );
  }

  updateQuantity(id: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(id);
      return;
    }
    this.itemsSubject.next(
      this.itemsSubject.getValue().map((i) =>
        i.id === id ? { ...i, quantity } : i
      )
    );
  }

  clearCart(): void {
    this.itemsSubject.next([]);
  }

  private loadCart(): CartItem[] {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
}
