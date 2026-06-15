// ──────────────────────────────────────────────
// index.ts — Punto de entrada: demuestra todos
//            los conceptos de TypeScript para Angular
// ──────────────────────────────────────────────

import { isString, isNumber, fetchData, delay, DeepReadonly, type Identifiable } from './helper.js';
import { demoEjercicios } from './ejercicios.js';

// ─── 1. Tipos básicos ───
const nombre: string = 'Angular 22';
const version: number = 22;
const isStable: boolean = true;
let algo: unknown = 'puede ser cualquier cosa';
const nada: undefined = undefined;

console.log('=== Tipos básicos ===');
console.log({ nombre, version, isStable, algo, nada });

// ─── 2. Interfaces y Types ───
interface Persona {
  readonly id: number;
  nombre: string;
  email?: string; // opcional
}

type Empleado = Persona & { departamento: string }; // intersección

const emp: Empleado = { id: 1, nombre: 'Ana', email: 'ana@mail.com', departamento: 'IT' };
console.log('\n=== Interfaces & Intersecciones ===');
console.log('Empleado:', emp);

// ─── 3. Genéricos ───
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}

const combined = merge({ a: 1 }, { b: 2 });
console.log('\n=== Genéricos ===');
console.log('first:', first([10, 20, 30]));
console.log('merge:', combined);

// ─── 4. Utility Types ───
type PartialPersona = Partial<Persona>;
type RequiredPersona = Required<Persona>;
type SoloNombre = Pick<Persona, 'nombre'>;
type SinEmail = Omit<Persona, 'email'>;
type Diccionario = Record<string, number>;

const dict: Diccionario = { uno: 1, dos: 2 };
console.log('\n=== Utility Types ===');
console.log('Pick:', { nombre: 'Carlos' } as SoloNombre);
console.log('Record:', dict);

// ─── 5. Union types & narrowing ───
type Status = 'idle' | 'loading' | 'success' | 'error';
type Result<T> = { status: 'success'; data: T } | { status: 'error'; error: string };

function handleResult(result: Result<number>) {
  if (result.status === 'success') {
    console.log('Dato:', result.data); // TypeScript sabe que hay .data
  } else {
    console.log('Error:', result.error); // TypeScript sabe que hay .error
  }
}

console.log('\n=== Union Types & Narrowing ===');
handleResult({ status: 'success', data: 42 });
handleResult({ status: 'error', error: 'Algo salió mal' });

// ─── 6. async/await ───
async function fetchUser(id: number): Promise<Persona> {
  await delay(100);
  return { id, nombre: `Usuario ${id}`, email: `user${id}@mail.com` };
}

async function main() {
  console.log('\n=== async/await ===');
  const usuario = await fetchUser(1);
  console.log('Usuario fetch:', usuario);

  const [u1, u2] = await Promise.all([fetchUser(1), fetchUser(2)]);
  console.log('Promise.all:', [u1, u2]);
}

// ─── 7. Type Guards ───
function process(value: unknown) {
  if (isString(value)) {
    console.log('Es string, longitud:', value.length);
  } else if (isNumber(value)) {
    console.log('Es número, al cuadrado:', value ** 2);
  }
}

console.log('\n=== Type Guards ===');
process('Hola Angular');
process(42);

// ─── 8. satisfies ───
type Palette = { [key: string]: string };
const colors = {
  primary: '#007bff',
  secondary: '#6c757d',
} satisfies Palette;

console.log('\n=== satisfies ===');
console.log('colors.primary.toUpperCase():', colors.primary.toUpperCase());

// ─── Ejecutar demo de ejercicios ───
console.log('\n═══════════════════════════════════');
console.log('      EJERCICIOS DEL MÓDULO');
console.log('═══════════════════════════════════');
demoEjercicios();

// ─── Ejecutar main ───
main().catch(console.error);
