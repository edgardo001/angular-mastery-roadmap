/**
 * ARCHIVO DE ÍNDICE PARA EL MÓDULO DE AUTENTICACIÓN
 * ===================================================
 *
 * Re-exporta todos los elementos del módulo de autenticación.
 * Facilita las importaciones desde otros módulos.
 *
 * ANÁLOGÍA: Es como el "índice" de un capítulo de un libro.
 * En lugar de buscar cada sección por separado, miras el índice.
 */

// Re-exporta el servicio que maneja datos del usuario
export { AuthFeatureService } from './services/auth-feature.service';
// Re-exporta el componente del formulario de login
export { LoginFormComponent } from './components/login-form.component';
// Re-exporta la página de login
export { LoginPage } from './pages/login.page';
