// =============================================================================
// ARCHIVO: server.ts
// PROPÓSITO: Servidor Express que renderiza la aplicación Angular en el servidor
// =============================================================================
//
// ¿Qué es SSR (Server-Side Rendering)?
// Imagina que visitas una página web. En una app normal (CSR), tu navegador
// recibe un HTML vacío y JavaScript lo llena después. Con SSR, el servidor
// ya te envía el HTML completo listo para mostrar. Es como la diferencia
// entre recibir una receta vacía vs. un plato ya servido.
//
// Este archivo configura un servidor Node.js con Express que:
// 1. Sirve archivos estáticos (CSS, JS, imágenes) del build del navegador
// 2. Para cualquier otra ruta, renderiza la app Angular en el servidor
// 3. Envía el HTML renderizado al navegador del usuario
// =============================================================================

// Importa zone.js para Node.js - esta librería permite que Angular detecte
// cambios de estado (como click events, HTTP responses, timers) en el servidor.
// Sin ella, Angular no sabría cuándo actualizar la UI.
import 'zone.js/node';

// CommonEngine es el motor de renderizado SSR de Angular.
// Es como una "máquina de cocinar" que toma tu app Angular y la convierte
// en HTML estático del lado del servidor.
import { CommonEngine } from '@angular/ssr/node';

// Express es el framework web más popular de Node.js.
// Piensa en él como un cartero que recibe peticiones HTTP y las reenvía
// al lugar correcto de tu servidor.
import express from 'express';

// fileURLToPath y dirname son utilidades de Node.js para convertir
// la URL del archivo actual a un camino de sistema operativo.
import { fileURLToPath } from 'url';

// dirname obtiene el directorio de un camino, y resolve combina
// caminos de directorio de forma segura para cualquier sistema operativo.
import { dirname, resolve } from 'path';

// Camino a la carpeta "dist/server" donde Angular compila el código del servidor.
// import.meta.url es la URL del archivo actual (server.ts compilado).
const serverDistFolder = dirname(fileURLToPath(import.meta.url));

// Camino a la carpeta "dist/browser" donde está el JavaScript y CSS
// que el navegador del usuario necesita descargar.
// Se sube un nivel (../) desde serverDistFolder para llegar a browser/.
const browserDistFolder = resolve(serverDistFolder, '../browser');

// Camino al archivo index.html base que Angular usará como plantilla.
// Es el "esqueleto" de la página que se llena con contenido dinámico.
const indexHtml = resolve(browserDistFolder, 'index.html');

// Crea la aplicación Express - el servidor web que escuchará peticiones.
const app = express();

// Crea una instancia del motor de renderizado de Angular.
// Esta instancia se reutiliza para renderizar todas las peticiones
// (es más eficiente que crear una nueva por cada request).
const commonEngine = new CommonEngine();

// =============================================================================
// RUTA 1: Archivos estáticos (*.css, *.js, *.png, etc.)
// =============================================================================
// Cuando el navegador pide un archivo estático (como styles.css o main.js),
// Express lo sirve directamente desde la carpeta del navegador.
// "maxAge: '1y'" le dice al navegador que cache estos archivos por 1 año,
// ya que los archivos estáticos tienen nombres con hash que cambian
// cuando el contenido cambia (cache busting).
app.get('*.*', express.static(browserDistFolder, { maxAge: '1y' }));

// =============================================================================
// RUTA 2: Todas las demás rutas -> Renderizado SSR
// =============================================================================
// Esta es la ruta "catch-all" que captura cualquier petición que no sea
// un archivo estático. Para cada una, renderiza la app Angular completa
// en el servidor y envía el HTML resultante.
//
// ¿Por qué usar SSR?
// - SEO: Los motores de búsqueda (Google, Bing) pueden indexar el contenido
// - Performance: El usuario ve contenido inmediatamente (no espera a que
//   JavaScript cargue y ejecute)
// - Social Sharing: Los links en WhatsApp/Twitter muestran preview correcto
app.get('*', (req, res, next) => {
  commonEngine
    .render({
      // bootstrap: Función que carga la app Angular desde main.server.ts
      // Se usa una función import() asíncrona porque Angular SSR necesita
      // cargar el módulo del servidor de forma dinámica.
      bootstrap: () => import('./main.server').then(m => m.default),
      // documentFilePath: El HTML base que se usará como plantilla
      documentFilePath: indexHtml,
      // url: La URL completa que el usuario está visitando
      // Angular usa esto para saber qué ruta mostrar (ej: /blog/3)
      url: req.url,
      // publicPath: Dónde están los assets estáticos para que Angular
      // pueda referenciarlos correctamente en el HTML renderizado.
      publicPath: browserDistFolder,
    })
    // Si el renderizado sale bien, envía el HTML al navegador
    .then(html => res.send(html))
    // Si hay error, lo pasa al manejador de errores de Express
    .catch(err => next(err));
});

// =============================================================================
// INICIO DEL SERVIDOR
// =============================================================================
// El servidor escucha en el puerto definido en la variable de entorno PORT,
// o en el puerto 4000 por defecto. Es como abrir la puerta de un restaurante
// para recibir clientes (peticiones HTTP).
const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
