/**
 * TIPOS AVANZADOS DE TYPESCRIPT (types.ts)
 * ==========================================
 *
 * Este archivo demuestra características avanzadas de TypeScript:
 * - Template Literal Types: Tipos que usan template strings
 * - Conditional Types: Tipos que dependen de condiciones
 * - satisfies: Operador que verifica tipos sin ampliarlos
 * - as const: Conviente valores en tipos literales
 * - Mapped Types: Tipos que transforman otros tipos
 *
 * ANÁLOGÍA: Es como un set de herramientas avanzadas:
 * - Template Literal Types: Como moldes para formar palabras
 * - Conditional Types: Como un semáforo que toma decisiones
 * - satisfies: Como un verificador de ortografía
 * - as const: Como una foto congelada del valor
 * - Mapped Types: Como una fábrica que transforma productos
 *
 * ¿POR QUÉ IMPORTAN?
 * - Hacen el código más seguro (detectan errores antes)
 * - Hacen el código más legible (tipos autoexplicativos)
 * - Hacen el código más mantenible (fácil de cambiar)
 */

// ============================================
// TEMPLATE LITERAL TYPES
// ============================================
// Permiten crear tipos que siguen patrones de texto específicos
// Es como tener un "molde" para crear tipos de texto

// EventName: Tipo que solo acepta strings que empiezan con "on"
// Ejemplos válidos: "onClick", "onChange", "onSubmit"
export type EventName = `on${Capitalize<string>}`;

// ApiRoute: Tipo que solo acepta strings que empiezan con "/api/"
// Ejemplos válidos: "/api/users", "/api/products"
export type ApiRoute = `/api/${string}`;

// CssSize: Tipo que acepta números seguidos de unidades CSS
// Ejemplos válidos: "16px", "2rem", "1.5em", "100%"
export type CssSize = `${number}${'px' | 'rem' | 'em' | '%'}`;

// HttpMethod: Tipo que solo acepta métodos HTTP válidos
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// ApiEndpoint: Tipo que combina método HTTP con ruta
// Ejemplo válido: "get:/api/users", "post:/api/products"
export type ApiEndpoint<M extends HttpMethod> = `${Lowercase<M>}:/api/${string}`;

// ============================================
// CONDITIONAL TYPES
// ============================================
// Crean tipos que dependen de una condición
// Es como un "if/else" pero para tipos

// ApiResponse<T>: Tipo que puede ser éxito O error
// Si es éxito, tiene data y timestamp
// Si es error, tiene error y code
export type ApiResponse<T> =
  | { status: 'success'; data: T; timestamp: number }
  | { status: 'error'; error: string; code: number };

// ExtractSuccess<T>: Extrae el tipo de dato de una respuesta exitosa
// Si T tiene status: 'success', retorna el tipo de data
// Si no, retorna never (nunca se llega aquí)
export type ExtractSuccess<T> = T extends { status: 'success'; data: infer D } ? D : never;

// ExtractError<T>: Extrae el mensaje de error de una respuesta de error
// Si T tiene status: 'error', retorna el tipo de error
export type ExtractError<T> = T extends { status: 'error'; error: infer E } ? E : never;

// ============================================
// SATISFIES
// ============================================
// Verifica que un valor cumple con un tipo SIN ampliar el tipo
// Diferente de "as": satisfies MANTIENE el tipo literal

// ServerConfig: Interfaz que define la configuración del servidor
export interface ServerConfig {
  host: string;
  port: number;
  ssl: boolean;
  timeout: number;
}

// StrictServerConfig: Tipo que es igual a ServerConfig
// Usa Mapped Type para crear un tipo idéntico
export type StrictServerConfig = {
  [K in keyof ServerConfig]: ServerConfig[K];
};

// ============================================
// AS CONST
// ============================================
// Congela un objeto y convierte sus valores en tipos literales
// Sin "as const": tipo = { HOME: string, ABOUT: string, ... }
// Con "as const": tipo = { HOME: "/home", ABOUT: "/about", ... }

// ROUTES: Objeto con rutas que NO se pueden modificar
export const ROUTES = {
  HOME: '/home',
  ABOUT: '/about',
  PRODUCTS: '/products',
  CONTACT: '/contact',
  LOGIN: '/login',
} as const; // "as const" congela el objeto y sus valores

// Route: Tipo que extrae TODOS los valores de ROUTES
// Es como unión: '/home' | '/about' | '/products' | '/contact' | '/login'
export type Route = (typeof ROUTES)[keyof typeof ROUTES];

// ============================================
// MAPPED TYPES
// ============================================
// Transforman un tipo creando uno nuevo con las mismas claves
// Es como una "fábrica" que toma un tipo y produce otro

// FormState<T>: Transforma un tipo en un estado de formulario
// Ejemplo: FormState<{ name: string }> = { name: { value: string, dirty: boolean, ... } }
// Cada propiedad se convierte en un objeto con value, dirty, touched y errors
export type FormState<T extends Record<string, unknown>> = {
  [K in keyof T]: {
    value: T[K];      // Valor actual del campo
    dirty: boolean;   // Si el usuario modificó el campo
    touched: boolean; // Si el usuario tocó el campo
    errors: string[]; // Lista de errores de validación
  };
};

// Nullable<T>: Transforma todas las propiedades para aceptar null
// Ejemplo: Nullable<{ name: string }> = { name: string | null }
export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// ReadonlyDeep<T>: Hace todas las propiedades readonly (incluso las anidadas)
// Es como "congelar" un objeto completamente
export type ReadonlyDeep<T> = {
  readonly [K in keyof T]: T[K] extends object ? ReadonlyDeep<T[K]> : T[K];
};
