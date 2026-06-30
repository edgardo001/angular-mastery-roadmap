/**
 * Página de detalle de un producto individual.
 *
 * Demuestra:
 * - @Input() con withComponentInputBinding(): recibe el parámetro :id como input
 * - @if/@else para manejar producto no encontrado
 * - @let para crear alias de una propiedad en el template
 *
 * ANLOGÍA: Es como la "ficha técnica" de un producto en una tienda:
 * muestras todos los datos cuando el cliente selecciona uno específico.
 */

import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  version: string;
}

/** Base de datos local de productos (simula una API) */
const ALL_PRODUCTS: Product[] = [
  { id: 1, name: 'Angular Framework', description: 'Plataforma de desarrollo frontend con TypeScript', category: 'Framework', version: '22.0' },
  { id: 2, name: 'RxJS', description: 'Programación reactiva para JavaScript', category: 'Librería', version: '7.8' },
  { id: 3, name: 'TypeScript', description: 'Superset tipado de JavaScript', category: 'Lenguaje', version: '6.0' },
  { id: 4, name: 'Standalone Components', description: 'Componentes autónomos sin NgModules', category: 'Arquitectura', version: '15+' },
];

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page">
      <!--
        Con withComponentInputBinding(), el parámetro :id de la URL
        se inyecta automáticamente como @Input() id.
        No necesitas usar ActivatedRoute.params — Angular lo hace por ti.
      -->
      @if (product) {
        <!-- @let crea un alias local para product (evita repetir product. múltiples veces) -->
        @let p = product;
        <h1>{{ p.name }}</h1>
        <div class="detail-card">
          <div class="field"><strong>ID:</strong> {{ p.id }}</div>
          <div class="field"><strong>Nombre:</strong> {{ p.name }}</div>
          <div class="field"><strong>Descripción:</strong> {{ p.description }}</div>
          <div class="field"><strong>Categoría:</strong> {{ p.category }}</div>
          <div class="field"><strong>Versión:</strong> {{ p.version }}</div>
        </div>
        <a routerLink="/products" class="back-link">← Volver a productos</a>
      } @else {
        <!-- Si no se encuentra el producto, muestra este fallback -->
        <div class="not-found">
          <h2>Producto no encontrado</h2>
          <p>No existe un producto con el ID "{{ id }}"</p>
          <a routerLink="/products" class="back-link">← Volver a productos</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .page { padding: 2rem; max-width: 700px; margin: 0 auto; }
    h1 { font-size: 2rem; color: #1a1a2e; margin-bottom: 1rem; }
    .detail-card { background: #fff; border-radius: 10px; padding: 1.5rem; box-shadow: 0 2px 6px rgba(0,0,0,0.07); }
    .field { padding: 0.6rem 0; border-bottom: 1px solid #eee; font-size: 1rem; }
    .field:last-child { border-bottom: none; }
    .back-link { display: inline-block; margin-top: 1.5rem; color: #0f3460; font-weight: 600; }
    .not-found { text-align: center; padding: 3rem 1rem; }
    .not-found h2 { color: #e63946; margin-bottom: 0.5rem; }
  `],
})
export class ProductDetailComponent {
  /**
   * @Input() recibe el ID del producto desde la URL.
   * Con withComponentInputBinding(), Angular vincula :id → id automáticamente.
   */
  @Input() id!: string;

  /**
   * Getter que busca el producto por ID.
   * Se recalcula cada vez que id cambia.
   *
   * ANLOGÍA: Es como buscar en una caja de archivos por número de expediente.
   */
  get product(): Product | undefined {
    return ALL_PRODUCTS.find((p) => p.id === Number(this.id));
  }
}
