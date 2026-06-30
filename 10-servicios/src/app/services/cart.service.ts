/**
 * Servicio de Carrito de Compras
 *
 * Demuestra:
 * - BehaviorSubject (RxJS): observable con valor inicial
 * - toSignal(): convierte un Observable a Signal (read-only)
 * - toObservable(): convierte una Signal a Observable
 * - computed(): señales derivadas (total, itemCount)
 * - effect(): ejecuta código cuando cambian las signals (persistencia)
 * - Injectable({ providedIn: 'root' }): singleton global
 *
 * ANLOGÍA: Es como una "base de datos en memoria" del carrito.
 * Todos los componentes que lo inyectan comparten la misma información.
 * Cuando algo cambia, todos se enteran automáticamente.
 */

import { Injectable, computed, effect, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

/** Interfaz de un item en el carrito */
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

/**
 * @Injectable({ providedIn: 'root' }) crea un SINGLETON global.
 * Es como un "banco central" — todos los componentes comparten la misma instancia.
 */
@Injectable({ providedIn: 'root' })
export class CartService {
  /**
   * BehaviorSubject es un Subject de RxJS que:
   * - Tiene un valor inicial (el carrito guardado en localStorage)
   * - Siempre tiene un valor actual (nunca está "vacío")
   * - Emite el valor actual a nuevos suscriptores
   *
   * ANLOGÍA: Es como una caja fuerte que siempre tiene algo adentro.
   * Si abres la puerta (te suscribes), ves lo que hay ahora mismo.
   */
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadCart());

  /** Observable público: otros componentes pueden suscribirse con | async */
  items$: Observable<CartItem[]> = this.itemsSubject.asObservable();

  /**
   * toSignal() convierte el Observable a una Signal read-only.
   * Ahora puedes usar cartService.items() en templates directamente.
   *
   * initialValue: el valor inicial antes de que el observable emita.
   */
  items = toSignal(this.items$, { initialValue: [] as CartItem[] });

  /**
   * toObservable() convierte una Signal a Observable.
   * Útil cuando necesitas operadores RxJS sobre una signal.
   */
  itemsChanged$ = toObservable(this.items);

  /**
   * computed() crea una signal DERIVADA — se recalcula automáticamente
   * cuando items() cambia.
   *
   * ANLOGÍA: Es como una calculadora que suma todo automáticamente
   * cada vez que agregas o quitas algo del carrito.
   */
  total = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  /** Cantidad total de artículos (suma de todas las quantities) */
  itemCount = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  constructor() {
    /**
     * effect() se ejecuta cada vez que items() cambia.
     * Aquí guardamos el carrito en localStorage para persistencia.
     *
     * ANLOGÍA: Es como un "autoguardado" — cada vez que modificas
     * el carrito, se guarda automáticamente en disco.
     *
     * IMPORTANTE: effects NO deben usarse para lógica asíncrona.
     */
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.items()));
    });
  }

  /**
   * Agrega un item al carrito.
   * Si ya existe, incrementa la quantity en 1.
   * Si no, lo agrega con quantity: 1.
   */
  addItem(item: Omit<CartItem, 'quantity'>): void {
    const current = this.itemsSubject.getValue();
    const existing = current.find((i) => i.id === item.id);
    if (existing) {
      this.updateQuantity(item.id, existing.quantity + 1);
    } else {
      this.itemsSubject.next([...current, { ...item, quantity: 1 }]);
    }
  }

  /** Elimina un item completamente del carrito */
  removeItem(id: number): void {
    this.itemsSubject.next(
      this.itemsSubject.getValue().filter((i) => i.id !== id)
    );
  }

  /**
   * Actualiza la quantity de un item.
   * Si la cantidad es 0 o menos, elimina el item.
   */
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

  /** Vacía todo el carrito */
  clearCart(): void {
    this.itemsSubject.next([]);
  }

  /**
   * Carga el carrito guardado en localStorage.
   * Usa try/catch porque JSON.parse puede fallar si los datos están corruptos.
   */
  private loadCart(): CartItem[] {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
}
