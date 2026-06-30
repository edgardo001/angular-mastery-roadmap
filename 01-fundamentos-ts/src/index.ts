// ──────────────────────────────────────────────
// index.ts — Demo de fundamentos TypeScript para Angular
// ──────────────────────────────────────────────
//
// Este archivo demuestra cada concepto TypeScript que Angular usa
// diariamente. Los comentarios explican el POR QUÉ, no solo el QUÉ.
//
// Ejecutar: npx tsx src/index.ts

// ═══════════════════════════════════════════════════════════════
// IMPORTACIONES
// ═══════════════════════════════════════════════════════════════
//
// 'import' trae funciones, tipos o valores de otros archivos.
// Es como pedir ingredientes a otros chef antes de cocinar.
//
// - { isString, isNumber, ... } → importa funciones específicas (destructuring)
// - from './helper.js' → indica el archivo origen (con extensión .js para ESM)
// - type Identifiable → importa SOLO el tipo (se elimina en compilación)
//
// En Angular, los imports son la base: componentes importan servicios,
// directivas, pipes y otros componentes para funcionar.

import { isString, isNumber, fetchData, delay, DeepReadonly, type Identifiable } from './helper.js';
import { demoEjercicios } from './ejercicios.js';

// ═══════════════════════════════════════════════════════════════
// 1. TIPOS BÁSICOS
// ═══════════════════════════════════════════════════════════════
//
// TypeScript añade anotaciones de tipo que el compilador verifica
// pero elimina al generar JavaScript. En Angular, esto es crítico
// porque el template compiler y el DI dependen de tipos.
//
// Analogía: Es como etiquetar cajas en un almacén.
// Sin etiquetas (JS): no sabes qué hay dentro hasta abrirla.
// Con etiquetas (TS): sabes exactamente qué contiene cada caja.
//
// Ejemplo JavaScript (sin tipos):
//   let nombre = 'Angular 22';  // sin tipo, puede ser cualquier cosa
//   nombre = 42;                // JS no dice nada, error en runtime
//
// Ejemplo TypeScript (con tipos):
//   const nombre: string = 'Angular 22';
//   nombre = 42;  // ❌ Error en compilación: Type 'number' is not assignable to type 'string'

// 'const' = constante, no se puede reasignar después de declarar
// ': string' = anotación de tipo, indica que nombre es un texto
const nombre: string = 'Angular 22';
const version: number = 22;        // number = números (enteros o decimales)
const isStable: boolean = true;    // boolean = true o false

// 'let' = variable que SÍ se puede reasignar
// 'unknown' vs 'any':
// - any DESACTIVA el type checking → equivalente a JavaScript puro
// - unknown FUERZA a hacer narrowing antes de usar → seguro y flexible
//
// Analogía: unknown es como una caja cerrada → debes abrirla y revisar
// antes de usar su contenido. any es como no tener caja → peligroso.
//
// En Angular: datos de APIs, valores de formularios, parámetros de rutas
// llegan como unknown. TypeScript obliga a validarlos.
let algo: unknown = 'puede ser cualquier cosa';
const nada: undefined = undefined;  // undefined = valor vacío/intencionalmente sin dato

console.log('=== Tipos básicos ===');
console.log({ nombre, version, isStable, algo, nada });

// ═══════════════════════════════════════════════════════════════
// 2. INTERFACES Y TYPES
// ═══════════════════════════════════════════════════════════════
//
// Interface: define la "forma" de un objeto. Ideal para objetos
// que otros van a extender (componentes, servicios en Angular).
//
// Analogía: Una interface es como un PLANO de arquitectura.
// Define qué habitaciones debe tener la casa, pero no cómo decorarlas.
//
// Type: más flexible. Puede hacer alias de tipos, uniones,
// intersecciones, y funciona con 'satisfies'.
//
// Analogía: Un type es como una RECETA de cocina.
// Puede combinar ingredientes de diferentes maneras.
//
// Regla práctica:
// - Interface → para objetos que se extienden (extends)
// - Type → para uniones, intersecciones, o cuando necesitas satisfies

// 'interface' define la estructura de un objeto
// 'readonly' = la propiedad no se puede modificar después de crear
// '?' = propiedad opcional (puede no existir)
interface Persona {
  readonly id: number;   // readonly: no se puede reasignar después de crear
  nombre: string;
  email?: string;        // opcional: puede no existir en el objeto
}

// Intersección (&): combina dos tipos en uno
// Empleado tiene TODO de Persona + el campo departamento
// Analogía: Empleado es una Persona con un "kit extra" de herramientas
type Empleado = Persona & { departamento: string };

// Uso en Angular: los modelos de datos (interfaces) definen la forma
// de los objetos que circulan entre componentes, servicios y APIs
const emp: Empleado = { id: 1, nombre: 'Ana', email: 'ana@mail.com', departamento: 'IT' };
console.log('\n=== Interfaces & Intersecciones ===');
console.log('Empleado:', emp);

// ═══════════════════════════════════════════════════════════════
// 3. GENÉRICOS
// ═══════════════════════════════════════════════════════════════
//
// Genéricos son "parámetros de tipo". Permiten crear funciones
// y tipos que trabajan con CUALQUIER tipo de forma segura.
//
// Analogía: Un genérico es como una MOLDE DE FLEXIBLE.
// Puedes hacer galletas de forma de estrella, corazón o círculo,
// pero el molde siempre funciona igual.
//
// Ejemplo real en Angular:
//   HttpClient.get<User[]>('/api/users') → Observable<User[]>
//   HttpClient.get<Product>('/api/products/1') → Observable<Product>
//
// Sin genéricos, todo sería Observable<any> → pierdes type checking.

// 'function' = declara una función reutilizable
// <T> = parámetro de tipo genérico (T puede ser cualquier letra)
// T es un "parámetro de tipo" → puede ser number, string, User, etc.
function first<T>(arr: T[]): T | undefined {
  // 'return' devuelve un valor
  // 'arr[0]' accede al primer elemento del array
  // '| undefined' indica que puede devolver undefined si el array está vacío
  return arr[0];
}
// first([1, 2, 3])    → T = number → devuelve number | undefined
// first(['a', 'b'])    → T = string → devuelve string | undefined
// first([true, false]) → T = boolean → devuelve boolean | undefined

// Constraints: restringe qué tipos puede aceptar el genérico
// 'extends object' = T y U deben ser objetos (no primitivos como number o string)
// Analogía: Es como poner reglas al molde → solo puede hacer formas que sean "objetos"
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };  // '...' = spread operator, copia todas las propiedades
}

const combined = merge({ a: 1 }, { b: 2 });
console.log('\n=== Genéricos ===');
console.log('first:', first([10, 20, 30]));
console.log('merge:', combined);

// ═══════════════════════════════════════════════════════════════
// 4. UTILITY TYPES
// ═══════════════════════════════════════════════════════════════
//
// TypeScript tiene tipos predefinidos que transforman otros tipos.
// Son la herramienta diaria en Angular:
//
// Analogía: Son como HERRAMIENTAS ESPECIALIZADAS en un taller.
// Cada herramienta transforma el material de una manera específica.
//
// - Partial<T>  → todas las props opcionales (formularios de edición)
//   Analogía: Un formulario donde puedes dejar campos vacíos
//
// - Required<T> → todas las props obligatorias
//   Analogía: Un formulario donde TODOS los campos son obligatorios
//
// - Pick<T, K>  → solo las props que eliges
//   Analogía: Elegir solo los ingredientes que necesitas de una receta
//
// - Omit<T, K>  → todo excepto las props que quitas
//   Analogía: Una receta sin el ingrediente que no te gusta
//
// - Record<K,V> → diccionario tipado
//   Analogía: Un diccionario donde cada palabra tiene definición del mismo tipo

type PartialPersona = Partial<Persona>;
// Equivale a: { id?: number; nombre?: string; email?: string }
// Útil para formularios de edición donde no todos los campos son obligatorios

type RequiredPersona = Required<Persona>;
// Equivale a: { id: number; nombre: string; email: string }
// Útil para validaciones donde todos los campos son requeridos

type SoloNombre = Pick<Persona, 'nombre'>;
// Equivale a: { nombre: string }
// Útil cuando solo necesitas un campo específico

type SinEmail = Omit<Persona, 'email'>;
// Equivale a: { readonly id: number; nombre: string }
// Útil cuando quieres excluir un campo sensible (como email)

type Diccionario = Record<string, number>;
// Equivale a: { [key: string]: number }
// Útil para conteos, estadísticas, o cualquier mapa clave-valor

const dict: Diccionario = { uno: 1, dos: 2 };
console.log('\n=== Utility Types ===');
console.log('Pick:', { nombre: 'Carlos' } as SoloNombre);
console.log('Record:', dict);

// ═══════════════════════════════════════════════════════════════
// 5. UNION TYPES y TYPE NARROWING
// ═══════════════════════════════════════════════════════════════
//
// Uniones discriminadas: un valor puede ser uno de varios tipos.
// El campo 'status' define qué datos existen en cada caso.
//
// Analogía: Es como un SEMÁFORO.
// - 'idle' = luz apagada (esperando)
// - 'loading' = luz amarilla (procesando)
// - 'success' = luz verde (todo bien)
// - 'error' = luz roja (problema)
//
// Type Narrowing: TypeScript automáticamente sabe qué tipo es
// después de una verificación (if, switch, typeof, instanceof).
//
// Analogía: Es como abrir una caja etiquetada.
// Antes de abrirla, no sabes qué hay dentro.
// Después de abrirla y ver "manzanas", SABES que es una caja de manzanas.
//
// Este patrón es EXACTAMENTE cómo Angular maneja:
// - Estado de peticiones HTTP (loading/success/error)
// - Signals con valores de diferentes tipos
// - Formularios con estados de validación

// 'type' = alias de tipo personalizado
// '|' = unión (puede ser uno de los valores listados)
type Status = 'idle' | 'loading' | 'success' | 'error';

// '<T>' = genérico, puede ser cualquier tipo
// '|' = unión de objetos con diferentes estructuras
type Result<T> =
  | { status: 'success'; data: T }      // si success → tiene .data
  | { status: 'error'; error: string };  // si error → tiene .error

function handleResult(result: Result<number>) {
  // TypeScript hace NARROWING automáticamente:
  // - Dentro del if, SABE que result.status === 'success'
  // - Dentro del else, SABE que result.status === 'error'
  //
  // Analogía: Después de verificar el semáforo, SABES qué hacer
  if (result.status === 'success') {
    console.log('Dato:', result.data);    // ✅ TypeScript sabe que .data existe
  } else {
    console.log('Error:', result.error);  // ✅ TypeScript sabe que .error existe
  }
}

console.log('\n=== Union Types & Narrowing ===');
handleResult({ status: 'success', data: 42 });
handleResult({ status: 'error', error: 'Algo salió mal' });

// ═══════════════════════════════════════════════════════════════
// 6. ASYNC/AWAIT
// ═══════════════════════════════════════════════════════════════
//
// async/await es azúcar sintáctico para Promesas. Hace que código
// asíncrono se lea como código síncrono.
//
// Analogía: Es como pedir comida a domicilio.
// - Promise = el restaurante acepta tu pedido y te da un número
// - async/await = esperas en casa tranquilo hasta que llegue la comida
//   (sin hacer otras cosas mientras tanto)
//
// En Angular, casi todo es asíncrono:
// - HTTP requests → HttpClient.get() retorna Observable
// - Eventos de usuario → clicks, inputs, teclado
// - Timers → setTimeout, setInterval
// - WebSockets → datos en tiempo real
//
// Los componentes usan async pipe o firstValueFrom() para
// convertir Observables a Promesas cuando es necesario.

// 'async' = esta función usa await y retorna una Promise
// 'Promise<Persona>' = tipo de retorno: una promesa que resuelve Persona
async function fetchUser(id: number): Promise<Persona> {
  // await "pausa" la ejecución hasta que la Promise se resuelva
  // Analogía: Esperas en la puerta hasta que llegue el paquete
  await delay(100);
  // 'return' devuelve el resultado después de la espera
  return { id, nombre: `Usuario ${id}`, email: `user${id}@mail.com` };
}

async function main() {
  console.log('\n=== async/await ===');

  // Sequential: una petición después de otra
  // Analogía: Pedir una pizza, esperar, luego pedir otra
  const usuario = await fetchUser(1);
  console.log('Usuario fetch:', usuario);

  // Parallel: múltiples peticiones en paralelo (más rápido)
  // Analogía: Pedir pizza y refresco al mismo tiempo → llegan juntos
  // 'Promise.all' = espera a que TODAS las promesas se resuelvan
  const [u1, u2] = await Promise.all([fetchUser(1), fetchUser(2)]);
  console.log('Promise.all:', [u1, u2]);
}

// ═══════════════════════════════════════════════════════════════
// 7. TYPE GUARDS
// ═══════════════════════════════════════════════════════════════
//
// Type guards son funciones que le dicen a TypeScript qué tipo
// es un valor. Retoran un "type predicate": valor is Tipo.
//
// Analogía: Un type guard es como un DETECTIVE que verifica
// la identidad de alguien. Si el detective dice "este es Juan",
// puedes confiar y tratarlo como Juan.
//
// Después de llamar un type guard, TypeScript automáticamente
// "ensucha" el tipo dentro del bloque if/else.
//
// En Angular: se usan en pipes, directivas y componentes para
// manejar datos de tipos desconocidos de forma segura.

function process(value: unknown) {
  // 'isString()' es un type guard → después del if, TypeScript
  // SABE que value es string, puede usar .length sin error
  //
  // Analogía: El detective verifica "¿es este un paquete de texto?"
  // Si sí, puedes abrirlo y leer su contenido (usar .length)
  if (isString(value)) {
    console.log('Es string, longitud:', value.length);
  } else if (isNumber(value)) {
    // 'isNumber()' es un type guard → TypeScript sabe que es number
    // Analogía: El detective verifica "¿es este un paquete numérico?"
    // Si sí, puedes hacer operaciones matemáticas (** 2 = elevar al cuadrado)
    console.log('Es número, al cuadrado:', value ** 2);
  }
}

console.log('\n=== Type Guards ===');
process('Hola Angular');
process(42);

// ═══════════════════════════════════════════════════════════════
// 8. SATISFIES
// ═══════════════════════════════════════════════════════════════
//
// 'satisfies' verifica que un objeto cumple con un tipo PERO
// mantiene el tipo inferido específico. Diferente de 'as' que
// fuerza un tipo y pierde información.
//
// Analogía: Es como un EXAMEN DE CERTIFICACIÓN.
// - 'as' = "confía en mí, soy experto" (puedes estar mintiendo)
// - 'satisfies' = "demuéstralo con un examen" (verificado y certificado)
//
// Diferencia clave:
// - as Palette → "confía en mí, esto es Palette" (puede estar mal)
// - satisfies Palette → "verifica que cumple y recuerda qué tiene"
//
// En Angular: útil para configuraciones de rutas, validadores
// de formularios, y configs de módulos.

// 'type' = alias de tipo personalizado
// '{ [key: string]: string }' = objeto donde cada propiedad es string
type Palette = { [key: string]: string };

const colors = {
  primary: '#007bff',
  secondary: '#6c757d',
} satisfies Palette;
// colors tiene tipo EXACTO: { primary: string; secondary: string }
// NO tipo genérico Palette
// → colors.primary.toUpperCase() funciona porque TypeScript SABE que .primary es string
//
// Sin satisfies: colors sería tipo Palette → no sabrías qué propiedades tiene
// Con satisfies: colors tiene tipo específico → sabes que tiene primary y secondary

console.log('\n=== satisfies ===');
console.log('colors.primary.toUpperCase():', colors.primary.toUpperCase());

// ═══════════════════════════════════════════════════════════════
// EJERCICIOS DEL MÓDULO
// ═══════════════════════════════════════════════════════════════

console.log('\n═══════════════════════════════════');
console.log('      EJERCICIOS DEL MÓDULO');
console.log('═══════════════════════════════════');
demoEjercicios();

// ═══════════════════════════════════════════════════════════════
// EJECUTAR MAIN (async/await)
// ═══════════════════════════════════════════════════════════════

main().catch(console.error);
