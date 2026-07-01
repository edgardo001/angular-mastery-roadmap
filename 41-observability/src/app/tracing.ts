/**
 * ARCHIVO: tracing.ts - Configuración de OpenTelemetry Tracing
 *
 * Este archivo inicializa OpenTelemetry, el estándar abierto para observabilidad.
 * OpenTelemetry permite coleccionar trazas (traces), métricas y logs de tu aplicación
 * de forma estandarizada, sin depender de un vendor específico.
 *
 * ¿Qué es un Trace?
 * Un trace es el registro completo de una operación desde que empieza hasta que termina.
 * Por ejemplo, cuando un usuario hace clic en "Cargar productos", el trace captura
 * todo el recorrido: petición HTTP → backend → base de datos → respuesta → renderizado.
 *
 * ¿Qué es un Span?
 * Un span es un segmento individual dentro de un trace. Piensa en un trace como un
 * árbol genealógico y cada span como un nodo. Cada span tiene:
 * - Nombre: qué operación representa (ej: "HTTP GET /api/products")
 * - Duración: cuándo empezó y cuándo terminó
 * - Atributos: datos clave-valor adicionales (method, url, status code)
 * - Estado: ok o error
 *
 * Analogía: Piensa en un trace como el GPS de un paquete de Amazon.
 * El trace es el viaje completo del almacén a tu puerta.
 * Cada span es una parada: salió del almacén → llegó al centro de distribución
 * → salió en camión → llegó a tu zona → fue entregado.
 *
 * Este archivo configura:
 * 1. WebTracerProvider: El proveedor de trazas para aplicaciones web
 * 2. SpanProcessor: Procesa cada span antes de exportarlo
 * 3. ConsoleSpanExporter: Imprime las trazas en la consola (para desarrollo)
 *
 * En producción, reemplazarías ConsoleSpanExporter por un exportador que envíe
 * los datos a un servicio como Jaeger, Zipkin, Grafana Tempo o Azure Monitor.
 */

// WebTracerProvider: El "motor" que recopila trazas en aplicaciones web.
// Es el punto central de OpenTelemetry: configura qué datos recopilar,
// cómo procesarlos y a dónde enviarlos.
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';

// SimpleSpanProcessor: Procesa cada span de forma síncrona.
// "Simple" significa que envía cada span inmediatamente después de que se crea.
// La alternativa es BatchSpanProcessor que agrupa spans para enviarlos en lotes
// (más eficiente en producción, pero más complejo).
//
// ConsoleSpanExporter: Exportador que imprime los spans en la consola del navegador.
// Es útil para desarrollo y debugging. En producción lo reemplazarías
// por un exportador OTLP (OpenTelemetry Protocol) que envía datos a un backend.
import { SimpleSpanProcessor, ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';

// resourceFromAttributes: Crea un Resource (recurso) a partir de un objeto de atributos.
// Resource representa la entidad que genera los datos de telemetría.
// Contiene información sobre "quién" está reportando: nombre del servicio,
// versión, entorno, etc. Es como el encabezado de un reporte que dice
// "este dato viene del servidor X en producción".
import { resourceFromAttributes } from '@opentelemetry/resources';

// ATTR_SERVICE_NAME: Constante que define el atributo estándar para el nombre
// del servicio. OpenTelemetry usa convenciones de atributos (semantic conventions)
// para que los datos sean consistentes y interoperables entre herramientas.
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

/**
 * Configuración del WebTracerProvider.
 *
 * El Resource describe qué servicio está generando estas trazas.
 * En un entorno con múltiples microservicios, esto permite filtrar
 * trazas por servicio en la herramienta de monitoreo.
 *
 * Ejemplo: Si tienes un frontend "angular-app" y un backend "api-server",
 * cada uno tiene su propio Resource, y en Jaeger puedes filtrar
 * "mostrar solo trazas de angular-app".
 *
 * spanProcessors define cómo se procesan los spans antes de exportarlos.
 * SimpleSpanProcessor envía cada span inmediatamente al exportador.
 * En producción usarías BatchSpanProcessor para agrupar envíos.
 */
const provider = new WebTracerProvider({
  resource: resourceFromAttributes({
    // ATTR_SERVICE_NAME es la convención estándar de OpenTelemetry.
    // En JSON se vería: { "service.name": "angular-observability-demo" }
    [ATTR_SERVICE_NAME]: 'angular-observability-demo',
  }),
  spanProcessors: [
    new SimpleSpanProcessor(new ConsoleSpanExporter()),
  ],
});

/**
 * Registramos el provider como el tracer global de la aplicación.
 *
 * Una vez registrado, cualquier parte de la aplicación puede obtener un tracer
 * usando trace.getTracer('nombre-del-tracer') sin necesidad de importar
 * el provider directamente.
 *
 * Analogía: Es como registrar un servicio en el "directorio central".
 * Después, cualquier componente puede buscarlo por nombre sin saber
 * exactamente dónde está configurado.
 */
provider.register();

/**
 * Exportamos el tracer que los demás archivos usarán para crear spans.
 *
 * Un tracer es la herramienta que usas para crear y manipular spans.
 * Es como una "plataforma de grabación": le dices "empieza a grabar esta operación"
 * y te devuelve un objeto span que puedes modificar mientras la operación está en curso.
 *
 * Uso en otros archivos:
 * ```
 * import { tracer } from './tracing';
 *
 * const span = tracer.startSpan('mi-operacion');
 * // ... hacer trabajo ...
 * span.end(); // Finalizar el span
 * ```
 */
export const tracer = provider.getTracer('angular-observability-demo');
