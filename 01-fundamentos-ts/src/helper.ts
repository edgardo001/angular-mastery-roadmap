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
//
// Analogía: Este archivo es como un CAJÓN DE HERRAMIENTAS.
// Contiene herramientas que usas una y otra vez en diferentes proyectos.

// ═══════════════════════════════════════════════════════════════
// TYPE GUARDS
// ═══════════════════════════════════════════════════════════════
//
// Un type guard es una función que retorna true/false y tiene
// como tipo de retorno un "type predicate": `valor is Tipo`.
//
// Analogía: Un type guard es como un ESCÁNER DE SEGURIDAD en un aeropuerto.
// Escanea el paquete y dice "esto es ropa" o "esto es electrónica".
// Después de pasar por el escáner, SABES qué hay dentro.
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

// 'export' = hace que esta función esté disponible para otros archivos
// 'function' = declara una función
// ': value is string' = type predicate (le dice a TypeScript qué tipo es)
export function isString(value: unknown): value is string {
  // El tipo de retorno `value is string` le dice a TypeScript:
  // "si esta función retorna true, el parámetro value es string"
  //
  // 'typeof' = operador que retorna el tipo de un valor como string
  // '===' = comparación estricta (tipo y valor deben ser iguales)
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  // Incluimos !isNaN porque typeof NaN === 'number' en JavaScript
  // 'isNaN()' = verifica si un valor NO es un número válido
  // '&&' = operador AND, ambas condiciones deben ser true
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
// Analogía: Identifiable es como un NÚMERO DE IDENTIFICACIÓN.
// Todos los ciudadanos tienen uno, sin importar su ocupación.
// Lo mismo con estos modelos: todos tienen un campo 'id'.
//
// Ejemplo en Angular real:
//   interface User extends Identifiable { name: string; email: string; }
//   interface Product extends Identifiable { title: string; price: number; }
//
// Esto garantiza que TODOS los modelos tengan un campo 'id',
// lo cual es útil para operaciones CRUD y caching.

// 'export' = hace que esta interfaz esté disponible para otros archivos
// 'interface' = define la estructura de un objeto
// 'id: string | number' = el campo id puede ser texto O número
export interface Identifiable {
  id: string | number;
}

// ═══════════════════════════════════════════════════════════════
// FUNCIONES GENÉRICAS
// ═══════════════════════════════════════════════════════════════
//
// Genéricos permiten crear funciones que trabajan con CUALQUIER
// tipo de forma segura. El parámetro T se infiere del argumento.
//
// Analogía: Un genérico es como una MÁQUINA VENDEDORA universal.
// No importa qué moneda inserts (dólar, euro, yen),
// la máquina siempre dispensa el producto correcto.

// 'async' = esta función usa await y retorna una Promise
// '<T>' = parámetro de tipo genérico (puede ser cualquier tipo)
// 'Promise<T>' = retorna una promesa que resuelve tipo T
//
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
  // 'await' = espera a que la petición se complete
  // 'fetch()' = función nativa de JS para hacer peticiones HTTP
  const res = await fetch(url);
  // '!res.ok' = si la respuesta NO fue exitosa (código 4xx o 5xx)
  // 'throw' = lanza un error que detiene la ejecución
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  // 'res.json()' = convierte la respuesta a JSON
  // Retorna Promise<T>, no Promise<any>
  return res.json();
}

// 'Promise<void>' = retorna una promesa que no tiene valor útil
// Solo sirve para esperar un tiempo determinado
//
// delay: crea una Promise que se resuelve después de ms milisegundos
// Útil para simular latencia de red en demos y tests
//
// Ejemplo de uso:
//   await delay(1000);  // espera 1 segundo
//   await delay(500);   // espera medio segundo

export function delay(ms: number): Promise<void> {
  // 'new Promise' = crea una nueva promesa
  // '(r)' = función callback que recibe la función de resolución
  // 'setTimeout' = ejecuta una función después de X milisegundos
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
// Analogía: Es como envolver un regalo con varias capas de papel.
// No solo envuelves la caja exterior, sino también cada regalo
// individual que está dentro.
//
// Diferencia con Readonly<T> nativo:
// - Readonly<T> solo hace readonly el nivel superficial
//   (solo envuelve la caja exterior)
// - DeepReadonly<T> hace readonly TODOS los niveles
//   (envuelve cada regalo individual)
//
// Ejemplo:
//   type User = { name: string; address: { city: string; } };
//   Readonly<User>  → { readonly name: string; address: { city: string } }
//   DeepReadonly<User> → { readonly name: string; readonly address: { readonly city: string } }
//
// En Angular: útil para estado de aplicación que no debería
// mutarse (signals, store state, datos de cache).
//
// Analogía: Es como un DOCUMENTO DE SOLO LECTURA.
// Nadie puede modificarlo, ni siquiera las partes internas.

// 'export' = hace que este tipo esté disponible para otros archivos
// 'type' = alias de tipo personalizado
// '<T>' = genérico, puede ser cualquier tipo
export type DeepReadonly<T> = {
  // '[K in keyof T]' = itera sobre cada propiedad de T
  // 'keyof T' = obtiene las claves del tipo T como unión de literales
  // 'readonly' = hace que la propiedad no se pueda reasignar
  // 'T[K]' = tipo de la propiedad K en el tipo T
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>  // si es objeto, recursar (envolver más capas)
    : T[K];               // si es primitivo, dejarlo como está
};
