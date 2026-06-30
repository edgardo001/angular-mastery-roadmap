// ─────────────────────────────────────────────────────
// ejercicios.ts — Soluciones a los 5 ejercicios
// ─────────────────────────────────────────────────────
//
// Cada ejercicio demuestra un concepto TypeScript que Angular
// usa en la vida real. Los comentarios explican la conexión
// entre el ejercicio y su uso en Angular.
//
// Analogía: Estos ejercicios son como PRÁCTICAS DEPORTIVAS.
// Cada ejercicio entrena una habilidad específica que usarás
// en partidos reales (proyectos Angular).

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
// Analogía: Es como un MODELO DE CORREO ELECTRÓNICO reutilizable.
// Puedes cambiar el "asunto" y el "cuerpo", pero la estructura
// (de, para, fecha) siempre es la misma.
//
// Ejemplo real:
//   interface ApiResponse<T> { data: T; status: number; timestamp: Date; }
//   interface UserList extends ApiResponse<User[]> {}
//   interface ProductDetail extends ApiResponse<Product> {}

// 'export' = hace que esta interfaz esté disponible para otros archivos
// 'interface' = define la estructura de un objeto
export interface AdminProfile {
  privileges: string[];  // string[] = array de strings (lista de privilegios)
  level: number;         // nivel de acceso del administrador
}

// '<T = unknown>' = parámetro de tipo con valor por defecto
// Esto permite crear User sin especificar tipo:
//   const user: User = { id: '1', name: 'Test', role: 'user', data: {} }
// O especificarlo:
//   const admin: User<AdminProfile> = { id: '1', name: 'Admin', role: 'admin', data: { privileges: ['all'], level: 3 } }
//
// Analogía: Es como un FORMULARIO CON CAMPOS OPCIONALES.
// Puedes llenar solo los campos obligatorios, o agregar información extra.

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
// Analogía: Es como un CONTROL DE ACCESO en un edificio.
// El guardia verifica tu identificación y te deja pasar
// solo si eres administrador.
//
// Ejemplo real:
//   if (isAdmin(user)) {
//     // TypeScript SABE que user es User<AdminProfile>
//     // Puede acceder a user.data.privileges sin error
//     return user.data.privileges;
//   }

// 'export' = hace que esta función esté disponible para otros archivos
// 'function' = declara una función
// 'user is User<AdminProfile>' = type predicate (le dice a TypeScript qué tipo es)
export function isAdmin(user: User<unknown>): user is User<AdminProfile> {
  // 'user is User<AdminProfile>' es el "type predicate"
  // Le dice a TypeScript: "si esta función retorna true,
  // el parámetro user es User<AdminProfile>"
  //
  // 'user.role === 'admin'' = verifica que el rol sea admin
  // '&&' = operador AND, ambas condiciones deben ser true
  // ''privileges' in (user.data as AdminProfile)' = verifica que exista la propiedad privileges
  // 'in' = operador que verifica si una propiedad existe en un objeto
  // 'as AdminProfile' = type assertion (afirma que user.data es AdminProfile)
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
// Analogía: Es como un CAJERO AUTOMÁTICO universal.
// No importa qué tarjeta inserts (Visa, Mastercard, Amex),
// el cajero siempre te da el dinero correcto.
//
// Ejemplo real en Angular:
//   @Injectable({ providedIn: 'root' })
//   export class UserService {
//     get(id: string): Observable<User> {
//       return this.http.get<User>(`/api/users/${id}`);
//     }
//   }

// 'async' = esta función usa await y retorna una Promise
// '<T>' = parámetro de tipo genérico
// 'Promise<T>' = retorna una promesa que resuelve tipo T
export async function getResource<T>(url: string): Promise<T> {
  // 'await' = espera a que la petición se complete
  // 'fetch()' = función nativa de JS para hacer peticiones HTTP
  const response = await fetch(url);
  // '!response.ok' = si la respuesta NO fue exitosa (código 4xx o 5xx)
  // 'throw' = lanza un error que detiene la ejecución
  if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
  // 'response.json()' retorna Promise<any>
  // Al tiparlo como Promise<T>, TypeScript sabe qué tipo devuelve
  // Analogía: El cajero convierte tu tarjeta en el dinero que necesitas
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
// Analogía: Es como un EXAMEN DE CERTIFICACIÓN.
// - 'as' = "confía en mí, soy experto" (puedes estar mintiendo)
// - 'satisfies' = "demuéstralo con un examen" (verificado y certificado)
//
// Diferencia con 'as':
//   const cols = [...] as ColumnConfig[];  // tipo: ColumnConfig[]
//   const cols = [...] satisfies ColumnConfig[];  // tipo: [{ key: 'id', ... }]
//
// Con satisfies, TypeScript sabe qué columnas específicas existes,
// no solo que son "alguna ColumnConfig".

// 'export' = hace que este tipo esté disponible para otros archivos
// 'type' = alias de tipo personalizado
export type ColumnConfig = {
  key: string;       // identificador de la columna
  label: string;     // texto que se muestra en el encabezado
  sortable: boolean; // si se puede ordenar por esta columna
  width?: number;    // opcional: ancho de la columna en píxeles
};

// 'satisfies' = verifica que el objeto cumple ColumnConfig[]
// PERO mantiene el tipo inferido: cada elemento tiene tipo literal
// → TypeScript SABE que columns[0].key === 'id' (no solo que es string)
//
// Sin satisfies: columns sería tipo ColumnConfig[] → no sabrías qué columnas tiene
// Con satisfies: columns tiene tipo específico → sabes que tiene id, name y email
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
// Analogía: Un mapped type es como una FÁBRICA DE TRANSFORMACIÓN.
// Toma una materia prima (tipo original) y la transforma
// en un producto terminado (nuevo tipo) aplicando reglas específicas.
//
// Ejemplo real:
//   type ReadonlyProduct = MyReadonly<Product>;
//   const p: ReadonlyProduct = { id: 1, name: 'Laptop', price: 999 };
//   p.price = 500;  // ❌ Error: Cannot assign to 'price' because it is a read-only property

// 'export' = hace que este tipo esté disponible para otros archivos
// 'type' = alias de tipo personalizado
// '<T>' = genérico, puede ser cualquier tipo
export type MyReadonly<T> = {
  // '[K in keyof T]' = itera sobre cada propiedad de T
  // 'keyof T' = obtiene las claves del tipo T como unión de literales
  // 'readonly' = hace que la propiedad no se pueda reasignar
  // 'T[K]' = tipo de la propiedad K en el tipo T
  //
  // Analogía: Es como poner un "SLO" (Solo Lectura) en cada campo de un formulario
  readonly [K in keyof T]: T[K];  // mantiene el tipo original de cada propiedad
};

// 'interface' = define la estructura de un objeto
export interface Product {
  id: number;
  name: string;
  price: number;
}

// 'type ReadonlyProduct = MyReadonly<Product>' = aplica MyReadonly al tipo Product
// ReadonlyProduct tiene las mismas propiedades que Product,
// pero TODAS son readonly
//
// Analogía: Es como convertir un documento de Word en PDF.
// El contenido es el mismo, pero ya no se puede editar.
export type ReadonlyProduct = MyReadonly<Product>;

// ═══════════════════════════════════════════════════════════════
// DEMO DE TODOS LOS EJERCICIOS
// ═══════════════════════════════════════════════════════════════
//
// Esta función muestra los ejercicios en acción.
// Cada console.log demuestra el concepto aprendido.
//
// Analogía: Es como una DEMOSTRACIÓN EN VIVO en una tienda.
// Muestras cómo funciona cada producto para que el cliente
// entienda su valor antes de comprarlo.

// 'export' = hace que esta función esté disponible para otros archivos
// 'function' = declara una función
// 'void' = no retorna ningún valor (solo ejecuta acciones)
export function demoEjercicios() {
  // ─── Ejercicio 1: User<T> genérica ───
  // Un admin tiene datos específicos: privileges y level
  // Un guest tiene data vacía: {}
  //
  // Analogía: Es como un MODELO DE FORMULARIO con campos dinámicos.
  // Un admin llena más campos que un guest.
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
  //
  // Analogía: Es como un DETECTIVE que verifica identidades.
  // Si el detective dice "este es admin", puedes tratarlo como admin.
  console.log('\n=== Ejercicio 2: isAdmin type guard ===');
  console.log('isAdmin(adminUser):', isAdmin(adminUser));
  const guest: User = { id: '2', name: 'Invitado', role: 'guest', data: {} };
  console.log('isAdmin(guest):', isAdmin(guest));

  // ─── Ejercicio 4: satisfies ───
  // columns tiene tipo literal, no genérico ColumnConfig[]
  // → TypeScript SABE que columns[0].key === 'id'
  //
  // Analogía: Es como un EXAMEN CERTIFICADO.
  // No solo dices "soy experto", sino que lo demuestras.
  console.log('\n=== Ejercicio 4: satisfies ===');
  console.log('columns:', columns);

  // ─── Ejercicio 5: Readonly mapped type ───
  // readonlyProduct no se puede modificar después de crearlo
  // →readonlyProduct.price = 500; // ❌ Error en compilación
  //
  // Analogía: Es como un DOCUMENTO PDF.
  // El contenido es el mismo que el Word, pero ya no se puede editar.
  console.log('\n=== Ejercicio 5: Readonly mapped type ===');
  const readonlyProduct: ReadonlyProduct = { id: 1, name: 'Laptop', price: 999 };
  console.log('readonlyProduct:', readonlyProduct);
}
