/**
 * PROYECTO 10 — Servicios y RxJS
 *
 * Este componente demuestra un Carrito de Compras usando:
 * - Un servicio (CartService) con signals y RxJS
 * - Búsqueda con debounce usando Subject + operadores RxJS
 * - computed() para totales derivados
 * - toSignal() y toObservable() para convertir entre signals y observables
 *
 * ANLOGÍA: El servicio es como un "mayordomo" que lleva la cuenta
 * de todo lo que compras. Los componentes solo le dicen "agrega esto"
 * o "quita esto", y el mayordomo mantiene todo organizado.
 */

import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartService, CartItem } from './services/cart.service';

/** Interfaz de producto (sin quantity — se agrega al carrito con quantity: 1) */
interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  template: `
    <div class="container">
      <header>
        <h1>Carrito de Compras</h1>
        <p class="subtitle">Servicios Angular con RxJS y Signals</p>
      </header>

      <!-- Campo de búsqueda con debounce -->
      <section class="search-box">
        <input
          type="text"
          placeholder="Buscar productos…"
          [ngModel]="searchQuery()"
          (ngModelChange)="onSearch($event)"
        />
      </section>

      <div class="layout">
        <!-- Lista de productos disponibles -->
        <section class="products">
          <h2>Productos</h2>
          @if (filteredProducts().length === 0) {
            <p class="empty">No se encontraron productos.</p>
          }
          <!--
            @for itera sobre filteredProducts().
            track product.id permite a Angular identificar cada card.
          -->
          @for (product of filteredProducts(); track product.id) {
            <div class="card">
              <div class="card-body">
                <strong>{{ product.name }}</strong>
                <!-- CurrencyPipe formatea el precio como moneda USD -->
                <span>{{ product.price | currency:'USD' }}</span>
              </div>
              <button class="btn primary" (click)="addToCart(product)">
                Agregar
              </button>
            </div>
          }
        </section>

        <!-- Carrito de compras -->
        <section class="cart">
          <h2>Carrito</h2>

          @if (cartService.items().length === 0) {
            <p class="empty">El carrito está vacío.</p>
          }

          <!-- Cada item del carrito con controles +/- -->
          @for (item of cartService.items(); track item.id) {
            <div class="card">
              <div class="card-body">
                <strong>{{ item.name }}</strong>
                <span>{{ item.price | currency:'USD' }} x {{ item.quantity }}</span>
                <span class="subtotal">
                  = {{ item.price * item.quantity | currency:'USD' }}
                </span>
              </div>
              <div class="card-actions">
                <button class="btn sm" (click)="cartService.updateQuantity(item.id, item.quantity - 1)">−</button>
                <span class="qty-badge">{{ item.quantity }}</span>
                <button class="btn sm" (click)="cartService.updateQuantity(item.id, item.quantity + 1)">+</button>
                <button class="btn danger sm" (click)="cartService.removeItem(item.id)">Eliminar</button>
              </div>
            </div>
          }

          <!-- Resumen del carrito (solo si tiene items) -->
          @if (cartService.items().length > 0) {
            <div class="totals">
              <p>Artículos: <strong>{{ cartService.itemCount() }}</strong></p>
              <p>Total: <strong>{{ cartService.total() | currency:'USD' }}</strong></p>
              <button class="btn danger" (click)="cartService.clearCart()">
                Vaciar carrito
              </button>
            </div>
          }
        </section>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
      background: #f4f6f9;
      min-height: 100vh;
    }
    .container { max-width: 960px; margin: 0 auto; padding: 2rem 1rem; }
    header { text-align: center; margin-bottom: 2rem; }
    header h1 { margin: 0; font-size: 2rem; color: #1a1a2e; }
    .subtitle { color: #6b7280; margin: 0.25rem 0 0; }
    .search-box { margin-bottom: 2rem; }
    .search-box input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }
    .search-box input:focus {
      outline: none;
      border-color: #6366f1;
    }
    /* Grid de 2 columnas: productos | carrito */
    .layout { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    @media (max-width: 640px) { .layout { grid-template-columns: 1fr; } }
    section h2 {
      margin: 0 0 1rem;
      font-size: 1.25rem;
      color: #1a1a2e;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 0.5rem;
    }
    .empty { color: #9ca3af; font-style: italic; }
    .card {
      background: #fff;
      border-radius: 10px;
      padding: 1rem;
      margin-bottom: 0.75rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .card-body {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 0.5rem;
    }
    .card-body strong { flex: 1; min-width: 100px; }
    .card-body span { color: #374151; }
    .subtotal { font-weight: 600; color: #059669; }
    .card-actions { display: flex; align-items: center; gap: 0.4rem; }
    .qty-badge {
      min-width: 1.5rem;
      text-align: center;
      font-weight: 700;
      color: #1a1a2e;
    }
    .btn {
      border: none;
      border-radius: 6px;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background 0.15s;
    }
    .btn.sm { padding: 0.3rem 0.6rem; font-size: 0.8rem; }
    .btn.primary { background: #6366f1; color: #fff; }
    .btn.primary:hover { background: #4f46e5; }
    .btn.danger { background: #ef4444; color: #fff; }
    .btn.danger:hover { background: #dc2626; }
    .totals {
      margin-top: 1.5rem;
      padding: 1rem;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
      text-align: right;
    }
    .totals p { margin: 0.25rem 0; font-size: 1rem; }
  `],
})
export class AppComponent {
  /** Servicio de carrito inyectado (contiene toda la lógica) */
  cartService = inject(CartService);

  /** DestroyRef para limpiar suscripciones automáticamente */
  private destroyRef = inject(DestroyRef);

  /**
   * Subject de RxJS para la búsqueda con debounce.
   *
   * ANLOGÍA: Es como un "filtro de ruido" — solo procesa la búsqueda
   * cuando el usuario deja de escribir por 300ms.
   *
   * Flujo: input → Subject → debounceTime(300) → distinctUntilChanged → switchMap → resultado
   */
  private searchSubject = new Subject<string>();

  /** Signal con el texto de búsqueda actual */
  searchQuery = signal('');

  /** Signal con los productos filtrados */
  filteredProducts = signal<Product[]>([]);

  /** Base de datos local de productos */
  private availableProducts: Product[] = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Teclado', price: 85 },
    { id: 4, name: 'Monitor', price: 350 },
    { id: 5, name: 'Audífonos', price: 60 },
    { id: 6, name: 'Webcam', price: 45 },
    { id: 7, name: 'USB Hub', price: 30 },
    { id: 8, name: 'Silla Ergonómica', price: 450 },
  ];

  constructor() {
    /**
     * Pipeline de búsqueda reactiva con RxJS:
     *
     * 1. debounceTime(300): espera 300ms después de la última tecla
     * 2. distinctUntilChanged(): solo emite si el texto cambió
     * 3. switchMap(): cancela la búsqueda anterior si llega una nueva
     * 4. takeUntilDestroyed(): limpia la suscripción cuando el componente se destruye
     *
     * ANLOGÍA: Es como un portero que no abre la puerta en cada paso,
     * solo cuando alguien se queda parado un momento (debounce).
     */
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => {
        const filtered = this.availableProducts.filter((p) =>
          p.name.toLowerCase().includes(term.toLowerCase())
        );
        return of(filtered);
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((result) => this.filteredProducts.set(result));

    // Mostrar todos los productos al inicio
    this.filteredProducts.set(this.availableProducts);
  }

  /**
   * Maneja el evento de búsqueda: actualiza la signal y emite al Subject.
   */
  onSearch(value: string): void {
    this.searchQuery.set(value);
    this.searchSubject.next(value);
  }

  /**
   * Agrega un producto al carrito usando el servicio.
   */
  addToCart(product: Product): void {
    this.cartService.addItem(product);
  }
}
