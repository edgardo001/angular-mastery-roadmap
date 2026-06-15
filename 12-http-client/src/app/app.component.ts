import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs/operators';
import { ProductService, Product } from './services/product.service';
import { authToken } from './interceptors/auth.interceptor';
import { SKIP_AUTH } from './interceptors/skip-auth.context';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <header>
        <h1>HttpClient e Interceptors</h1>
        <p class="subtitle">Peticiones HTTP, interceptores funcionales, HttpContext y manejo de errores</p>
      </header>

      <section class="controls">
        <div class="token-box">
          <label>
            Token de autenticación (simulado):
            <input
              type="text"
              [ngModel]="authTokenValue()"
              (ngModelChange)="setToken($event)"
              placeholder="Ingresa un token Bearer..."
            />
          </label>
          <span class="badge" [class.active]="authTokenValue() !== ''">
            {{ authTokenValue() ? 'Token presente' : 'Sin token' }}
          </span>
        </div>

        <button class="btn primary" (click)="loadProducts()" [disabled]="loading()">
          {{ loading() ? 'Cargando...' : 'Cargar productos' }}
        </button>
      </section>

      @if (error()) {
        <div class="error-banner">{{ error() }}</div>
      }

      @if (loading()) {
        <div class="loading">Cargando productos...</div>
      }

      @if (products().length > 0 && !loading()) {
        <section class="products">
          <h2>Productos ({{ products().length }})</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              @for (product of products(); track product.id) {
                <tr>
                  <td>{{ product.id }}</td>
                  <td>{{ product.title }}</td>
                  <td>{{ product.price | currency:'USD' }}</td>
                  <td>{{ product.category }}</td>
                  <td>
                    <button class="btn danger sm" (click)="deleteProduct(product.id)">
                      Eliminar
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </section>
      }

      <section class="info">
        <h2>HttpContext — SKIP_AUTH</h2>
        <p>
          <code>createProduct</code> y <code>deleteProduct</code> usan
          <code>new HttpContext().set(SKIP_AUTH, true)</code> para omitir el interceptor de autenticación.
        </p>
        <p>Revisa la consola del navegador para ver los logs del interceptor.</p>
        <table class="meta">
          <thead>
            <tr><th>Interceptor</th><th>Propósito</th></tr>
          </thead>
          <tbody>
            <tr><td><code>loggingInterceptor</code></td><td>Loggea método, URL y duración</td></tr>
            <tr><td><code>authInterceptor</code></td><td>Agrega header <code>Authorization: Bearer</code></td></tr>
            <tr><td><code>errorInterceptor</code></td><td>Captura errores, reintenta 1 vez tras 1s</td></tr>
          </tbody>
        </table>
      </section>
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
    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: flex-end;
      margin-bottom: 1.5rem;
    }
    .token-box { flex: 1; min-width: 280px; }
    .token-box label {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      font-size: 0.875rem;
      color: #374151;
    }
    .token-box input {
      padding: 0.5rem 0.75rem;
      border: 2px solid #d1d5db;
      border-radius: 6px;
      font-size: 0.875rem;
    }
    .token-box input:focus {
      outline: none;
      border-color: #6366f1;
    }
    .badge {
      display: inline-block;
      margin-top: 0.25rem;
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
      background: #e5e7eb;
      color: #6b7280;
    }
    .badge.active { background: #d1fae5; color: #065f46; }
    .btn {
      border: none;
      border-radius: 6px;
      padding: 0.6rem 1.2rem;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background 0.15s;
    }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn.primary { background: #6366f1; color: #fff; }
    .btn.primary:hover:not(:disabled) { background: #4f46e5; }
    .btn.danger { background: #ef4444; color: #fff; }
    .btn.danger:hover { background: #dc2626; }
    .btn.sm { padding: 0.3rem 0.6rem; font-size: 0.8rem; }
    .error-banner {
      background: #fee2e2;
      color: #991b1b;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      font-weight: 500;
    }
    .loading {
      text-align: center;
      padding: 2rem;
      color: #6366f1;
      font-weight: 600;
    }
    .products { margin-bottom: 2rem; }
    .products h2 {
      margin: 0 0 1rem;
      font-size: 1.25rem;
      color: #1a1a2e;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 0.5rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }
    th, td {
      padding: 0.75rem;
      text-align: left;
      font-size: 0.875rem;
    }
    th {
      background: #f9fafb;
      color: #374151;
      font-weight: 600;
      border-bottom: 2px solid #e5e7eb;
    }
    td { border-bottom: 1px solid #f3f4f6; }
    .info {
      background: #fff;
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }
    .info h2 {
      margin: 0 0 0.75rem;
      font-size: 1.1rem;
      color: #1a1a2e;
    }
    .info p { margin: 0.5rem 0; font-size: 0.875rem; color: #374151; }
    .info code {
      background: #f3f4f6;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      font-size: 0.8rem;
    }
    .meta { margin-top: 1rem; }
    .meta th { font-size: 0.8rem; }
    .meta td { font-size: 0.8rem; }
  `],
})
export class AppComponent {
  private productService = inject(ProductService);
  private destroyRef = inject(DestroyRef);

  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  authTokenValue = signal('');

  setToken(token: string): void {
    this.authTokenValue.set(token);
    authToken.set(token);
  }

  loadProducts(): void {
    this.loading.set(true);
    this.error.set(null);

    this.productService
      .getProducts()
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (products) => this.products.set(products),
        error: (err) => this.error.set(`Error al cargar productos: ${err.status ?? err.message}`),
      });
  }

  deleteProduct(id: number): void {
    this.productService
      .deleteProduct(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.products.update((items) => items.filter((p) => p.id !== id));
          console.log(`[🗑️] Producto ${id} eliminado (simulado)`);
        },
        error: (err) => this.error.set(`Error al eliminar: ${err.status ?? err.message}`),
      });
  }
}
