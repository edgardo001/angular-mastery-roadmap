// ──────────────────────────────────────────────
// index.ts — Demo de fundamentos TypeScript para Angular
// ──────────────────────────────────────────────
//
// Este archivo demuestra cada concepto TypeScript que Angular usa
// diariamente. Los comentarios explican el POR QUÉ, no solo el QUÉ.
//
// Ejecutar: npx tsx src/index.ts

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
// Ejemplo JavaScript (sin tipos):
//   let nombre = 'Angular 22';  // sin类型, puede ser cualquier cosa
//   nombre = 42;                // JS no dice nada, error en runtime
//
// Ejemplo TypeScript (con tipos):
//   const nombre: string = 'Angular 22';
//   nombre = 42;  // ❌ Error en compilación: Type 'number' is not assignable to type 'string'

const nombre: string = 'Angular 22';
const version: number = 22;
const isStable: boolean = true;

// 'unknown' vs 'any':
// - any DESACTIVA el type checking → equivalente a JavaScript puro
// - unknown FUERZA a hacer narrowing antes de usar → seguro y flexible
//
// En Angular: datos de APIs, valores de formularios, parámetros de rutas
// llegan como unknown. TypeScript obliga a validarlos.
let algo: unknown = 'puede ser cualquier cosa';
const nada: undefined = undefined;

console.log('=== Tipos básicos ===');
console.log({ nombre, version, isStable, algo, nada });

// ═══════════════════════════════════════════════════════════════
// 2. INTERFACES Y TYPES
// ═══════════════════════════════════════════════════════════════
//
// Interface: define la "forma" de un objeto. Ideal para objetos
// que otros van a extender (componentes, servicios en Angular).
//
// Type: más flexible. Puede hacer alias de tipos, uniones,
// intersecciones, y funciona con 'satisfies'.
//
// Regla práctica:
// - Interface → para objetos que se extienden (extends)
// - Type → para uniones, intersecciones, o cuando necesitas satisfies

interface Persona {
  readonly id: number;   // readonly: no se puede reasignar después de crear
  nombre: string;
  email?: string;        // opcional: puede no existir en el objeto
}

// Intersección (&): combina dos tipos en uno
// Empleado tiene TODO de Persona + el campo departamento
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
// Ejemplo real en Angular:
//   HttpClient.get<User[]>('/api/users') → Observable<User[]>
//   HttpClient.get<Product>('/api/products/1') → Observable<Product>
//
// Sin genéricos, todo sería Observable<any> → pierdes type checking.

// T es un "parámetro de tipo" → puede ser number, string, User, etc.
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
// first([1, 2, 3])    → T = number → devuelve number | undefined
// first(['a', 'b'])    → T = string → devuelve string | undefined
// first([true, false]) → T = boolean → devuelve boolean | undefined

// Constraints: restringe qué tipos puede aceptar el genérico
// T y U deben ser objetos (no primitivos como number o string)
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
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
// - Partial<T>  → todas las props opcionales (formularios de edición)
// - Required<T> → todas las props obligatorias
// - Pick<T, K>  → solo las props que eliges
// - Omit<T, K>  → todo excepto las props que quitas
// - Record<K,V> → diccionario tipado

type PartialPersona = Partial<Persona>;
// Equivale a: { id?: number; nombre?: string; email?: string }

type RequiredPersona = Required<Persona>;
// Equivale a: { id: number; nombre: string; email: string }

type SoloNombre = Pick<Persona, 'nombre'>;
// Equivale a: { nombre: string }

type SinEmail = Omit<Persona, 'email'>;
// Equivale a: { readonly id: number; nombre: string }

type Diccionario = Record<string, number>;
// Equivale a: { [key: string]: number }

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
// Type Narrowing: TypeScript automáticamente sabe qué tipo es
// después de una verificación (if, switch, typeof, instanceof).
//
// Este patrón es EXACTAMENTE cómo Angular maneja:
// - Estado de peticiones HTTP (loading/success/error)
// - Signals con valores de diferentes tipos
// - Formularios con estados de validación

type Status = 'idle' | 'loading' | 'success' | 'error';

type Result<T> =
  | { status: 'success'; data: T }      // si success → tiene .data
  | { status: 'error'; error: string };  // si error → tiene .error

function handleResult(result: Result<number>) {
  // TypeScript hace NARROWING automáticamente:
  // - Dentro del if, SABE que result.status === 'success'
  // - Dentro del else, SABE que result.status === 'error'
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
// En Angular, casi todo es asíncrono:
// - HTTP requests → HttpClient.get() retorna Observable
// - Eventos de usuario → clicks, inputs, teclado
// - Timers → setTimeout, setInterval
// - WebSockets → datos en tiempo real
//
// Los componentes usan async pipe o firstValueFrom() para
// convertir Observables a Promesas cuando es necesario.

async function fetchUser(id: number): Promise<Persona> {
  // await "pausa" la ejecución hasta que la Promise se resuelva
  await delay(100);
  return { id, nombre: `Usuario ${id}`, email: `user${id}@mail.com` };
}

async function main() {
  console.log('\n=== async/await ===');

  // Sequential: una petición después de otra
  const usuario = await fetchUser(1);
  console.log('Usuario fetch:', usuario);

  // Parallel: múltiples peticiones en paralelo (más rápido)
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
// Después de llamar un type guard, TypeScript automáticamente
// "ensucha" el tipo dentro del bloque if/else.
//
// En Angular: se usan en pipes, directivas y componentes para
// manejar datos de tipos desconocidos de forma segura.

function process(value: unknown) {
  // isString() es un type guard → después del if, TypeScript
  // SABE que value es string, puede usar .length sin error
  if (isString(value)) {
    console.log('Es string, longitud:', value.length);
  } else if (isNumber(value)) {
    // isNumber() es un type guard → TypeScript sabe que es number
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
// Diferencia clave:
// - as Palette → "confía en mí, esto es Palette" (puede estar mal)
// - satisfies Palette → "verifica que cumple y recuerda qué tiene"
//
// En Angular: útil para configuraciones de rutas, validadores
// de formularios, y configs de módulos.

type Palette = { [key: string]: string };

const colors = {
  primary: '#007bff',
  secondary: '#6c757d',
} satisfies Palette;
// colors tiene tipo EXACTO: { primary: string; secondary: string }
// NO tipo genérico Palette
// → colors.primary.toUpperCase() funciona porque TypeScript SABE que .primary es string

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
