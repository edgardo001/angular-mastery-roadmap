import { signalStore, withState, withComputed, withMethods, withHooks, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
}

const STORAGE_KEY = 'ngrx-cart';

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const CartStore = signalStore(
  { providedIn: 'root' },

  withState<CartState>({
    items: [],
    loading: false,
  }),

  withComputed(({ items }) => ({
    totalItems: computed(() => items().reduce((sum, i) => sum + i.quantity, 0)),
    totalPrice: computed(() =>
      items().reduce((sum, i) => sum + i.price * i.quantity, 0)
    ),
  })),

  withMethods((store) => ({
    addItem(item: { id: number; name: string; price: number }) {
      const existing = store.items().find((i) => i.id === item.id);
      if (existing) {
        const updated = store.items().map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        patchState(store, { items: updated });
        saveCart(updated);
      } else {
        const updated = [...store.items(), { ...item, quantity: 1 }];
        patchState(store, { items: updated });
        saveCart(updated);
      }
    },
    removeItem(id: number) {
      const updated = store.items().filter((i) => i.id !== id);
      patchState(store, { items: updated });
      saveCart(updated);
    },
    clearCart() {
      patchState(store, { items: [] });
      saveCart([]);
    },
  })),

  withHooks({
    onInit(store) {
      patchState(store, { items: loadCart() });
    },
  })
);
