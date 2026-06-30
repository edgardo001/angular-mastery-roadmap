// ──────────────────────────────────────────────
// helper.ts — Utilidades genéricas y type guards
// ──────────────────────────────────────────────
//
// Este archivo contiene funciones y tipos reutilizables que
// demuestran patrones comunes en Angular:
//
// - Type Guards: funciones que validan tipos en runtime
// - Interfaces reutilizables: modelos de datos compartidos
// - Funciones genéricas: fetch data, delays, utilidades
// - Mapped types recursivos: transformar tipos anidados

// ═══════════════════════════════════════════════════════════════
// TYPE GUARDS
// ═══════════════════════════════════════════════════════════════
//
// Un type guard es una función que retorna true/false y tiene
// como tipo de retorno un "type predicate": `valor is Tipo`.
//
// Después de llamar un type guard, TypeScript automáticamente
// "ensucha" el tipo dentro del bloque if/else.
//
// Ejemplo de uso:
//   const input: unknown = getExternalData();
//   if (isString(input)) {
//     // Aquí TypeScript SABE que input es string
//     console.log(input.toUpperCase());  // ✅ sin error
//   }
//
// En Angular, esto se usa para:
// - Validar datos que llegan de APIs externas
// - Procesar eventos de usuario con tipos desconocidos
// - Directivas que reciben datos de templates

export function isString(value: unknown): value is string {
  // El tipo de retorno `value is string` le dice a TypeScript:
  // "si esta función retorna true, el parámetro value es string"
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  // Incluimos !isNaN porque typeof NaN === 'number' en JavaScript
  return typeof value === 'number' && !isNaN(value);
}

// ═══════════════════════════════════════════════════════════════
// INTERFACES REUTILIZABLES
// ═══════════════════════════════════════════════════════════════
//
// En Angular, es común tener interfaces compartidas entre
// componentes y servicios. Identifiable es un "base type"
// que muchos modelos pueden implementar.
//
// Ejemplo en Angular real:
//   interface User extends Identifiable { name: string; email: string; }
//   interface Product extends Identifiable { title: string; price: number; }
//
// Esto garantiza que TODOS los modelos tengan un campo 'id',
// lo cual es útil para operaciones CRUD y caching.

export interface Identifiable {
  id: string | number;
}

// ═══════════════════════════════════════════════════════════════
// FUNCIONES GENÉRICAS
// ═══════════════════════════════════════════════════════════════
//
// Genéricos permiten crear funciones que trabajan con CUALQUIER
// tipo de forma segura. El parámetro T se infiere del argumento.

// fetchData<T>: función genérica para hacer peticiones HTTP
// T es el tipo de datos que esperamos recibir
//
// En Angular real, esto es equivalente a:
//   HttpClient.get<T>(url): Observable<T>
//
// Ejemplo de uso:
//   const user = await fetchData<User>('/api/users/1');
//   console.log(user.name);  // TypeScript SABE que es User

export async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();  // retorna Promise<T>, no Promise<any>
}

// delay: crea una Promise que se resuelve después de ms milisegundos
// Útil para simular latencia de red en demos y tests
//
// Ejemplo de uso:
//   await delay(1000);  // espera 1 segundo
//   await delay(500);   // espera medio segundo

export function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ═══════════════════════════════════════════════════════════════
// MAPPED TYPES RECURSIVOS
// ═══════════════════════════════════════════════════════════════
//
// DeepReadonly es un mapped type RECURSIVO que convierte
// todas las propiedades de un tipo (y sus propiedades anidadas)
// a readonly.
//
// Diferencia con Readonly<T> nativo:
// - Readonly<T> solo hace readonly el nivel superficial
// - DeepReadonly<T> hace readonly TODOS los niveles
//
// Ejemplo:
//   type User = { name: string; address: { city: string; } };
//   Readonly<User>  → { readonly name: string; address: { city: string } }
//   DeepReadonly<User> → { readonly name: string; readonly address: { readonly city: string } }
//
// En Angular: útil para estado de aplicación que no debería
// mutarse (signals, store state, datos de cache).

export type DeepReadonly<T> = {
  // [K in keyof T]: itera sobre cada propiedad de T
  // T[K] es el tipo de esa propiedad
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>  // si es objeto, recursar
    : T[K];               // si es primitivo, dejarlo como está
};
