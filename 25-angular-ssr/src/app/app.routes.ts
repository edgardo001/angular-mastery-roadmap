// =============================================================================
// ARCHIVO: app.routes.ts
// PROPÓSITO: Define las rutas (URLs) de la aplicación y qué componente mostrar
// =============================================================================
//
// Las rutas son como el "mapa" de tu aplicación. Le dicen a Angular:
// "Cuando el usuario visite ESTA url, muestra ESTE componente".
//
// Ejemplo mental: Si tu app fuera un restaurante:
// - "/" → Recepción (redirige al blog)
// - "/blog" → Sala principal con lista de posts
// - "/blog/3" → Artículo individual número 3
//
// Angular usa el Router para cambiar entre componentes sin recargar
// la página completa (navegación SPA - Single Page Application).
// =============================================================================

// Routes es el tipo que define la estructura de cada ruta.
// Cada objeto ruta tiene propiedades como path, component, redirectTo, etc.
import { Routes } from '@angular/router';

// El componente que muestra la página del blog
import { BlogPage } from './pages/blog-page/blog-page';

// Array de rutas que Angular usará para navegar.
export const routes: Routes = [
  // Ruta raíz "/" → redirige a "/blog"
  // pathMatch: 'full' significa que solo redirige si la URL es exactamente "/"
  // (no "/blog" ni "/blog/123"). Es como decir "solo si es la puerta principal".
  { path: '', redirectTo: 'blog', pathMatch: 'full' },

  // Ruta "/blog" → muestra la lista de todos los posts
  // Cuando visitas http://localhost:4200/blog, se muestra BlogPage
  { path: 'blog', component: BlogPage },

  // Ruta con parámetro ":id" → muestra un post específico
  // El ":id" es un parámetro dinámico. Si visitas /blog/3, el parámetro
  // id valdrá "3". Es como un comodín en las cartas: /blog/CUALQUIER COSA
  // El componente BlogPage lee este parámetro para saber qué post mostrar.
  { path: 'blog/:id', component: BlogPage }
];
