// ─────────────────────────────────────────────────────
// ejercicios.ts — Soluciones a los 5 ejercicios
// ─────────────────────────────────────────────────────
//
// Cada ejercicio demuestra un concepto TypeScript que Angular
// usa en la vida real. Los comentarios explican la conexión
// entre el ejercicio y su uso en Angular.

// ═══════════════════════════════════════════════════════════════
// EJERCICIO 1: Interfaz User<T> genérica
// ═══════════════════════════════════════════════════════════════
//
// CONCEPTO: Genéricos en interfaces
//
// POR QUÉ EN ANGULAR:
// Los componentes Angular frecuentemente manejan diferentes tipos
// de datos. Una interfaz genérica permite reutilizar la misma
// estructura para múltiples tipos.
//
// Ejemplo real:
//   interface ApiResponse<T> { data: T; status: number; timestamp: Date; }
//   interface UserList extends ApiResponse<User[]> {}
//   interface ProductDetail extends ApiResponse<Product> {}

export interface AdminProfile {
  privileges: string[];
  level: number;
}

// <T = unknown>: T es un parámetro de tipo con valor por defecto
// Esto permite crear User sin especificar tipo:
//   const user: User = { id: '1', name: 'Test', role: 'user', data: {} }
// O especificarlo:
//   const admin: User<AdminProfile> = { id: '1', name: 'Admin', role: 'admin', data: { privileges: ['all'], level: 3 } }

export interface User<T = unknown> {
  id: string;
  name: string;
  role: 'admin' | 'user' | 'guest';  // unión de literales: solo estos 3 valores
  data: T;  // tipo genérico: cada User puede tener diferentes datos adicionales
}

// ═══════════════════════════════════════════════════════════════
// EJERCICIO 2: Type guard isAdmin
// ═══════════════════════════════════════════════════════════════
//
// CONCEPTO: Type Guards (type predicates)
//
// POR QUÉ EN ANGULAR:
// Cuando procesas datos de APIs externas, no siempre sabes
// qué tipo de usuario recibes. Un type guard permite validar
// el tipo en runtime y que TypeScript haga narrowing automático.
//
// Ejemplo real:
//   if (isAdmin(user)) {
//     // TypeScript SABE que user es User<AdminProfile>
//     // Puede acceder a user.data.privileges sin error
//     return user.data.privileges;
//   }

export function isAdmin(user: User<unknown>): user is User<AdminProfile> {
  // user is User<AdminProfile> es el "type predicate"
  // Le dice a TypeScript: "si esta función retorna true,
  // el parámetro user es User<AdminProfile>"
  return user.role === 'admin' && 'privileges' in (user.data as AdminProfile);
}

// ═══════════════════════════════════════════════════════════════
// EJERCICIO 3: Función fetch genérica
// ═══════════════════════════════════════════════════════════════
//
// CONCEPTO: Genéricos en funciones
//
// POR QUÉ EN ANGULAR:
// Los servicios Angular usan genéricos para que cada llamada
// a API devuelva el tipo correcto. Sin genéricos, todo sería
// any → pierdes autocomplete y type checking.
//
// Ejemplo real en Angular:
//   @Injectable({ providedIn: 'root' })
//   export class UserService {
//     get(id: string): Observable<User> {
//       return this.http.get<User>(`/api/users/${id}`);
//     }
//   }

export async function getResource<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
  // response.json() retorna Promise<any>
  // Al tiparlo como Promise<T>, TypeScript sabe qué tipo devuelve
  return response.json();
}

// ═══════════════════════════════════════════════════════════════
// EJERCICIO 4: satisfies
// ═══════════════════════════════════════════════════════════════
//
// CONCEPTO: Operador satisfies
//
// POR QUÉ EN ANGULAR:
// Las configuraciones de Angular (rutas, validadores, módulos)
// necesitan que TypeScript valide la estructura pero mantenga
// los tipos literales específicos.
//
// Diferencia con 'as':
//   const cols = [...] as ColumnConfig[];  // tipo: ColumnConfig[]
//   const cols = [...] satisfies ColumnConfig[];  // tipo: [{ key: 'id', ... }]
//
// Con satisfies, TypeScript sabe qué columnas específicas existes,
// no solo que son "alguna ColumnConfig".

export type ColumnConfig = {
  key: string;
  label: string;
  sortable: boolean;
  width?: number;  // opcional
};

// satisfies valida que el objeto cumple ColumnConfig[]
// PERO mantiene el tipo inferido: cada elemento tiene tipo literal
// → TypeScript SABE que columns[0].key === 'id' (no solo que es string)
export const columns = [
  { key: 'id', label: 'ID', sortable: true, width: 80 },
  { key: 'name', label: 'Nombre', sortable: true },
  { key: 'email', label: 'Email', sortable: false },
] satisfies ColumnConfig[];

// ═══════════════════════════════════════════════════════════════
// EJERCICIO 5: Mapped type Readonly
// ═══════════════════════════════════════════════════════════════
//
// CONCEPTO: Mapped types
//
// POR QUÉ EN ANGULAR:
// Angular usa mapped types internamente para Partial, Required,
// Pick, Omit, y Readonly. Entender cómo funcionan te permite
// crear tipos personalizados.
//
// Ejemplo real:
//   type ReadonlyProduct = MyReadonly<Product>;
//   const p: ReadonlyProduct = { id: 1, name: 'Laptop', price: 999 };
//   p.price = 500;  // ❌ Error: Cannot assign to 'price' because it is a read-only property

export type MyReadonly<T> = {
  // [K in keyof T]: itera sobre cada propiedad de T
  // readonly: hace que la propiedad no se pueda reasignar
  readonly [K in keyof T]: T[K];  // mantiene el tipo original de cada propiedad
};

export interface Product {
  id: number;
  name: string;
  price: number;
}

// ReadonlyProduct tiene las mismas propiedades que Product,
// pero TODAS son readonly
export type ReadonlyProduct = MyReadonly<Product>;

// ═══════════════════════════════════════════════════════════════
// DEMO DE TODOS LOS EJERCICIOS
// ═══════════════════════════════════════════════════════════════
//
// Esta función muestra los ejercicios en acción.
// Cada console.log demuestra el concepto aprendido.

export function demoEjercicios() {
  // ─── Ejercicio 1: User<T> genérica ───
  // Un admin tiene datos específicos: privileges y level
  // Un guest tiene data vacía: {}
  console.log('=== Ejercicio 1: User<T> genérica ===');
  const adminUser: User<AdminProfile> = {
    id: '1',
    name: 'Edgardo',
    role: 'admin',
    data: { privileges: ['create', 'delete'], level: 3 },
  };
  console.log('Admin user:', adminUser);

  // ─── Ejercicio 2: isAdmin type guard ───
  // isAdmin retorna true/false Y le dice a TypeScript qué tipo es
  // Dentro del if, user es User<AdminProfile>
  console.log('\n=== Ejercicio 2: isAdmin type guard ===');
  console.log('isAdmin(adminUser):', isAdmin(adminUser));
  const guest: User = { id: '2', name: 'Invitado', role: 'guest', data: {} };
  console.log('isAdmin(guest):', isAdmin(guest));

  // ─── Ejercicio 4: satisfies ───
  // columns tiene tipo literal, no genérico ColumnConfig[]
  // → TypeScript SABE que columns[0].key === 'id'
  console.log('\n=== Ejercicio 4: satisfies ===');
  console.log('columns:', columns);

  // ─── Ejercicio 5: Readonly mapped type ───
  // readonlyProduct no se puede modificar después de crearlo
  // →readonlyProduct.price = 500; // ❌ Error en compilación
  console.log('\n=== Ejercicio 5: Readonly mapped type ===');
  const readonlyProduct: ReadonlyProduct = { id: 1, name: 'Laptop', price: 999 };
  console.log('readonlyProduct:', readonlyProduct);
}
