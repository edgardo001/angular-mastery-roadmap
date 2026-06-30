// HttpInterceptorFn es el tipo de función que intercepta peticiones HTTP
// Un interceptor es como un filtro de seguridad: revisa cada petición antes de enviarla
import { HttpInterceptorFn } from '@angular/common/http';

// Función auxiliar que limpia un valor individual
// Convierte caracteres peligrosos en sus versiones seguras (HTML entities)
// Ejemplo: <script> se convierte en &lt;script&gt; y no se ejecuta como código
function sanitizeValue(value: unknown): unknown {
  if (typeof value === 'string') {
    // Reemplazamos caracteres que podrían usarse para ataques XSS
    return value
      .replace(/&/g, '&amp;')    // & → &amp; (debe ir primero para no reemplazar otros)
      .replace(/</g, '&lt;')     // < → &lt; (evita inyectar etiquetas HTML)
      .replace(/>/g, '&gt;')     // > → &gt;
      .replace(/"/g, '&quot;')   // " → &quot; (evita romper atributos HTML)
      .replace(/'/g, '&#x27;');  // ' → &#x27; (evita inyectar en atributos)
  }
  return value; // Si no es string, lo devolvemos sin modificar
}

// Función recursiva que limpia todo el body de una petición HTTP
// Puede ser un objeto, un array, o un valor simple
function sanitizeBody(body: unknown): unknown {
  if (body === null || body === undefined) return body; // Null/undefined no se limpian
  if (Array.isArray(body)) return body.map(sanitizeBody); // Si es array, limpiamos cada elemento
  if (typeof body === 'object') {
    // Si es objeto, limpiamos cada propiedad recursivamente
    return Object.fromEntries(
      Object.entries(body as Record<string, unknown>).map(([k, v]) => [
        k,
        sanitizeBody(v), // Llamada recursiva para valores anidados
      ]),
    );
  }
  return sanitizeValue(body); // Si es string u otro tipo, limpiamos directamente
}

// Interceptor que protege contra XSS sanitizando el body de cada petición HTTP
// Se ejecuta automáticamente en cada petición que sale de la aplicación
export const xssProtectionInterceptor: HttpInterceptorFn = (req, next) => {
  // Clonamos la petición original (las peticiones son inmutables en Angular)
  // y reemplazamos el body con la versión sanitizada
  const cloned = req.clone({
    body: req.body ? sanitizeBody(req.body) : req.body,
  });
  return next(cloned); // Enviamos la petición clonada al siguiente interceptor o al backend
};
