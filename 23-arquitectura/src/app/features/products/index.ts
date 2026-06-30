/**
 * ARCHIVO DE ÍNDICE PARA EL MÓDULO DE PRODUCTOS
 * ==============================================
 *
 * Re-exporta todos los elementos del módulo de productos.
 * Facilita las importaciones desde otros módulos.
 *
 * ANÁLOGÍA: Es como el "índice" de un capítulo de un libro.
 * En lugar de buscar cada sección por separado, miras el índice.
 */

// Re-exporta el servicio y la interfaz Product
export { ProductService, type Product } from './services/product.service';
// Re-exporta el componente que muestra un producto
export { ProductCardComponent } from './components/product-card.component';
// Re-exporta la página que muestra la lista de productos
export { ProductListPage } from './pages/product-list.page';
