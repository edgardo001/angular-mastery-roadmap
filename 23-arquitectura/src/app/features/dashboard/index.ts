/**
 * ARCHIVO DE ÍNDICE PARA EL MÓDULO DE DASHBOARD
 * ==============================================
 *
 * Re-exporta todos los elementos del módulo de dashboard.
 * Facilita las importaciones desde otros módulos.
 *
 * ANÁLOGÍA: Es como el "índice" de un capítulo de un libro.
 * En lugar de buscar cada sección por separado, miras el índice.
 */

// Re-exporta el servicio que contiene las estadísticas
export { DashboardService } from './services/dashboard.service';
// Re-exporta el componente que muestra una estadística
export { StatCardComponent } from './components/stat-card.component';
// Re-exporta la página del dashboard
export { DashboardPage } from './pages/dashboard.page';
