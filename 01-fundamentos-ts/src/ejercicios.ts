// ─────────────────────────────────────────────────────
// ejercicios.ts — Soluciones a los 5 ejercicios
// ─────────────────────────────────────────────────────

// ─── Ejercicio 1: Interfaz User<T> genérica ───
export interface AdminProfile {
  privileges: string[];
  level: number;
}

export interface User<T = unknown> {
  id: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
  data: T;
}

// ─── Ejercicio 2: Type guard isAdmin ───
export function isAdmin(user: User<unknown>): user is User<AdminProfile> {
  return user.role === 'admin' && 'privileges' in (user.data as AdminProfile);
}

// ─── Ejercicio 3: Función fetch genérica ───
export async function getResource<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
  return response.json();
}

// ─── Ejercicio 4: satisfies ───
export type ColumnConfig = {
  key: string;
  label: string;
  sortable: boolean;
  width?: number;
};

export const columns = [
  { key: 'id', label: 'ID', sortable: true, width: 80 },
  { key: 'name', label: 'Nombre', sortable: true },
  { key: 'email', label: 'Email', sortable: false },
] satisfies ColumnConfig[];

// ─── Ejercicio 5: Mapped type Readonly ───
export type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

export interface Product {
  id: number;
  name: string;
  price: number;
}

export type ReadonlyProduct = MyReadonly<Product>;

// ─── Demo de todos los conceptos ───
export function demoEjercicios() {
  console.log('=== Ejercicio 1: User<T> genérica ===');
  const adminUser: User<AdminProfile> = {
    id: '1',
    name: 'Edgardo',
    role: 'admin',
    data: { privileges: ['create', 'delete'], level: 3 },
  };
  console.log('Admin user:', adminUser);

  console.log('\n=== Ejercicio 2: isAdmin type guard ===');
  console.log('isAdmin(adminUser):', isAdmin(adminUser));
  const guest: User = { id: '2', name: 'Invitado', role: 'guest', data: {} };
  console.log('isAdmin(guest):', isAdmin(guest));

  console.log('\n=== Ejercicio 4: satisfies ===');
  console.log('columns:', columns);

  console.log('\n=== Ejercicio 5: Readonly mapped type ===');
  const readonlyProduct: ReadonlyProduct = { id: 1, name: 'Laptop', price: 999 };
  console.log('readonlyProduct:', readonlyProduct);
}
