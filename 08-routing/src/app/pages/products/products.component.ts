import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page">
      <h1>Productos</h1>
      <p class="subtitle">Selecciona un producto para ver sus detalles</p>
      <div class="product-list">
        @for (product of products; track product.id) {
          <a [routerLink]="['/products', product.id]" class="product-card">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <span class="link">Ver detalle →</span>
          </a>
        }
      </div>
    </div>
  `,
  styles: [`
    .page { padding: 2rem; max-width: 900px; margin: 0 auto; }
    h1 { font-size: 2rem; color: #1a1a2e; }
    .subtitle { color: #555; margin: 0.5rem 0 1.5rem; }
    .product-list { display: grid; gap: 1rem; }
    .product-card { display: block; background: #fff; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 6px rgba(0,0,0,0.07); transition: transform 0.15s, box-shadow 0.15s; cursor: pointer; }
    .product-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.12); text-decoration: none; }
    .product-card h3 { color: #0f3460; margin-bottom: 0.4rem; }
    .product-card p { color: #555; font-size: 0.9rem; margin-bottom: 0.5rem; }
    .link { color: #0f3460; font-weight: 600; font-size: 0.9rem; }
  `],
})
export class ProductsComponent {
  products: Product[] = [
    { id: 1, name: 'Angular Framework', description: 'Plataforma de desarrollo frontend con TypeScript' },
    { id: 2, name: 'RxJS', description: 'Programación reactiva para JavaScript' },
    { id: 3, name: 'TypeScript', description: 'Superset tipado de JavaScript' },
    { id: 4, name: 'Standalone Components', description: 'Componentes autónomos sin NgModules' },
  ];
}
