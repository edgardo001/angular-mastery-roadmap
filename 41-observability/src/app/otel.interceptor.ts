/**
 * ARCHIVO: otel.interceptor.ts - Interceptor HTTP de OpenTelemetry
 *
 * Este interceptor instrumenta automáticamente cada petición HTTP que sale
 * de la aplicación Angular, creando spans de trazas que permiten monitorear
 * el rendimiento de las llamadas HTTP.
 *
 * ¿Qué hace este interceptor?
 * 1. Cada vez que Angular hace una petición HTTP (GET, POST, PUT, DELETE, etc.)
 * 2. Crea un "span" de OpenTelemetry que representa esa petición
 * 3. Agrega atributos útiles al span (método HTTP, URL, status code, etc.)
 * 4. Si la petición falla, registra el error en el span
 * 5. Cuando la petición termina, cierra el span con la duración total
 *
 * Analogía: Es como un inspector de tráfico que se monta en cada camión
 * que sale del almacén. El inspector anota:
 * - A qué hora salió el camión (span start)
 * - A dónde va (URL)
 * - Qué tipo de carga lleva (método HTTP)
 * - A qué hora llegó (span end)
 * - Si tuvo un accidente en el camino (error)
 *
 * ¿Por qué usar interceptores?
 * Angular tiene un sistema de interceptores HTTP que permite modificar o
 * observar todas las peticiones sin tocar cada servicio individualmente.
 * Es como poner cámaras de seguridad en cada salida del almacén en lugar
 * de darle una cámara a cada conductor.
 */

// HttpInterceptorFn: Tipo que define la firma de un interceptor funcional de Angular.
// Los interceptores son funciones que se ejecutan antes de cada petición HTTP
// y después de cada respuesta. Pueden modificar la petición, la respuesta,
// o ambos, o simplemente observar/ registrar lo que pasa.
import { HttpInterceptorFn } from '@angular/common/http';

// trace: API principal de OpenTelemetry para crear y gestionar trazas.
// trace.getTracer() obtiene un "tracer" (grabadora de trazas) por nombre.
// Cada tracer puede crear múltiples spans, y cada span representa una operación.
import { trace, SpanStatusCode } from '@opentelemetry/api';

// tap: Operador de RxJS que permite ejecutar código con efectos secundarios
// en el stream de datos sin modificar los datos mismos.
// Lo usamos para registrar el éxito o error de cada petición HTTP.
import { tap, catchError } from 'rxjs/operators';

// throwError: Función de RxJS que crea un Observable que emite un error.
// La usamos para relanzar errores después de registrarlos en el span.
import { throwError } from 'rxjs';

/**
 * Obtenemos el tracer de OpenTelemetry por nombre.
 *
 * Este nombre ("angular-observability-demo") debe coincidir con el nombre
 * que configuraste en tracing.ts cuando creaste el provider.
 *
 * Analogía: Es como abrir una app de GPS en tu teléfono.
 * Le dices "quiero rastrear viajes" y la app te da las herramientas
 * para hacerlo. Aquí le decimos "quiero rastrear peticiones HTTP"
 * y OpenTelemetry nos da el tracer para crear spans.
 */
const tracer = trace.getTracer('angular-observability-demo');

/**
 * otelInterceptor: Interceptor funcional que instrumenta cada petición HTTP
 * con un span de OpenTelemetry.
 *
 * Este interceptor trabaja con RxJS (la librería que Angular usa para
 * manejar operaciones asíncronas). Cada petición HTTP es un Observable
 * que emite un valor cuando la respuesta llega.
 *
 * Flujo:
 * 1. Se crea un span al inicio de la petición
 * 2. Se pasa la petición al siguiente interceptor/servidor
 * 3. Cuando la respuesta llega:
 *    - Si es exitosa: se cierra el span con estado OK
 *    - Si falla: se cierra el span con estado ERROR y se relanza el error
 * 4. El span contiene toda la información necesaria para depurar
 */
export const otelInterceptor: HttpInterceptorFn = (req, next) => {
  /**
   * Iniciamos un span para esta petición HTTP.
   *
   * startSpan() crea un nuevo span y empieza a medir el tiempo.
   * El primer argumento es el nombre del span (aparece en la UI de tracing).
   * El segundo argumento son "atributos": datos clave-valor que describen
   * la operación. Son como las notas que escribes en un formulario.
   *
   * Ejemplo de cómo se vería en Jaeger:
   * Nombre: "HTTP GET"
   * Atributos:
   *   http.method: "GET"
   *   http.url: "https://api.example.com/products"
   *   http.status_code: 200
   *   http.response_time_ms: 150
   */
  const span = tracer.startSpan(`HTTP ${req.method}`, {
    // Atributos estándar de HTTP (semantic conventions de OpenTelemetry).
    // Estos nombres están predefinidos para que las herramientas de monitoreo
    // los reconozcan automáticamente y puedas filtrar por ellos.
    //
    // Los atributos se pasan como objeto dentro de la propiedad "attributes"
    // del SpanOptions (no como propiedades de nivel superior).
    attributes: {
      'http.method': req.method,
      'http.url': req.urlWithParams,
      // req.url es un string (la URL completa), no un objeto URL.
      // Lo usamos directamente para atributos simples.
    },
  });

  /**
   * Pasamos la petición al siguiente interceptor o al servidor HTTP real.
   *
   * .pipe() permite encadenar operadores RxJS que se ejecutan
   * cuando la petición termina (éxito o error).
   *
   * tap(): Ejecuta código cuando la petición tiene éxito.
   * catchError(): Ejecuta código cuando la petición falla.
   *
   * Analogía: Es como darle el paquete al siguiente transportista
   * y ponerle un "seguimiento" que avise cuando llegue o si se pierde.
   */
  return next(req).pipe(
    /**
     * tap(): Operador que se ejecuta cuando la petición HTTP tiene éxito.
     *
     * Registramos el status code de la respuesta en el span.
     * Esto es útil para saber si la petición fue exitosa (2xx),
     * redirección (3xx), error del cliente (4xx) o error del servidor (5xx).
     *
     * span.addEvent(): Agrega un "evento" al span. Los eventos son como
     * notas que se agregan a lo largo de la vida del span.
     * Ejemplo: "La respuesta llegó con status 200".
     */
    tap(() => {
      // Finalizamos el span con estado OK (éxito).
      span.setStatus({ code: SpanStatusCode.OK });
      span.end();
    }),

    /**
     * catchError(): Operador que se ejecuta cuando la petición HTTP falla.
     *
     * Registramos el error en el span con:
     * 1. Código de estado ERROR (el span aparecerá en rojo en la UI)
     * 2. Nombre del error (ej: "HttpErrorResponse")
     * 3. Mensaje del error (ej: "404 Not Found")
     * 4. Stack trace completa (para depurar desde dónde vino el error)
     *
     * Después de registrar el error, lo relanzamos con throwError()
     * para que Angular lo maneje normalmente (el ErrorHandler lo atrapará).
     *
     * Analogía: Es como cuando un paquete se pierde. Anotas el problema
     * en el sistema de seguimiento (span), pero también informas al cliente
     * que el paquete no llegó (throwError).
     */
    catchError((error) => {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message || 'HTTP request failed',
      });
      span.addEvent('HTTP error', {
        'error.name': error.name || 'UnknownError',
        'error.message': error.message || 'No message',
        'error.stack': error.stack || '',
      });
      // Finalizamos el span con estado ERROR.
      span.end();
      // Relanzamos el error para que Angular lo maneje con el ErrorHandler.
      return throwError(() => error);
    })
  );
};
