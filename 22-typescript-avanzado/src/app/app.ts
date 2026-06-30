/**
 * COMPONENTE PRINCIPAL DE TYPESCRIPT AVANZADO (App)
 * ==================================================
 *
 * Demuestra características avanzadas de TypeScript en Angular:
 * - Template Literal Types
 * - Conditional Types
 * - satisfies
 * - as const
 * - Mapped Types
 * - Servicios Genéricos
 *
 * ANÁLOGÍA: Es como un laboratorio de TypeScript donde experimentas
 * con todas las herramientas avanzadas del lenguaje.
 *
 * PALABRAS CLAVE:
 * - satisfies: Verifica que un valor cumple un tipo sin ampliarlo
 * - as const: Congela valores para usarlos como tipos literales
 * - JsonPipe: Pipe que convierte objetos a JSON para mostrarlos
 * - KeyValuePipe: Pipe que convierte objetos a pares clave-valor
 */

// Component: Decorador del componente
import { Component } from '@angular/core';

// Pipes para mostrar datos en el template
// JsonPipe: Convierte objetos a JSON legible
// KeyValuePipe: Convierte objetos a pares clave-valor para iterar
import { JsonPipe, KeyValuePipe } from '@angular/common';

// Tipos avanzados que vamos a demostrar
import { ApiResponse, ROUTES, ApiRoute, CssSize, ServerConfig, FormState, EventName, ApiEndpoint } from './types';

// Servicio genérico CRUD
import { GenericCrudService, Identifiable } from './generic-crud.service';

// Interfaz que extiende Identifiable para el servicio genérico
// User tiene un campo "id" que lo hace compatible con GenericCrudService
interface User extends Identifiable {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-root',
  // Pipes que usa el template
  imports: [JsonPipe, KeyValuePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
  // providers: Registra el servicio genérico para este componente
  // GenericCrudService<User>: Especifica que trabaja con usuarios
  providers: [GenericCrudService<User>],
})
export class App {
  // ============================================
  // TEMPLATE LITERAL TYPES
  // ============================================
  // Ejemplos de tipos que usan template strings

  // templateLiteralExamples: Array de ejemplos de Template Literal Types
  // "satisfies" verifica que el valor cumple el tipo SIN ampliarlo
  // Ejemplo: 'onClick' cumple EventName, pero 'click' NO
  templateLiteralExamples = [
    { label: 'EventName', value: 'onClick' satisfies EventName },
    { label: 'ApiRoute', value: '/api/users' satisfies ApiRoute },
    { label: 'CssSize', value: '16px' satisfies CssSize },
    { label: 'ApiEndpoint', value: 'get:/api/products' satisfies ApiEndpoint<'GET'> },
  ] as const; // "as const" congela el array (no se puede modificar)

  // ============================================
  // CONDITIONAL TYPES
  // ============================================
  // ApiResponse<T>: Puede ser éxito O error

  // Respuesta exitosa: tiene status, data y timestamp
  responseSuccess: ApiResponse<{ id: number; name: string }> = {
    status: 'success',
    data: { id: 1, name: 'Test' },
    timestamp: Date.now(),
  };

  // Respuesta de error: tiene status, error y code
  responseError: ApiResponse<never> = {
    status: 'error',
    error: 'Not found',
    code: 404,
  };

  // ============================================
  // SATISFIES
  // ============================================
  // Verifica que el objeto cumple ServerConfig sin ampliar el tipo

  // "satisfies" mantiene el tipo literal de cada propiedad
  // Sin satisfies: host sería tipo "string"
  // Con satisfies: host es tipo "localhost" (literal)
  config = {
    host: 'localhost',
    port: 4200,
    ssl: false,
    timeout: 5000,
  } satisfies ServerConfig;

  // ============================================
  // AS CONST
  // ============================================
  // ROUTES está definido con "as const" en types.ts
  // Esto significa que sus valores son tipos literales, no strings genéricos

  routes = ROUTES;
  // Object.values: Extrae todos los valores del objeto ROUTES
  routeList = Object.values(ROUTES);

  // ============================================
  // MAPPED TYPES
  // ============================================
  // FormState<T>: Transforma un tipo en un estado de formulario

  // Ejemplo: FormState<{ name: string; email: string; age: number }>
  // Cada propiedad se convierte en un objeto con value, dirty, touched, errors
  userForm: FormState<{ name: string; email: string; age: number }> = {
    name: { value: '', dirty: false, touched: false, errors: [] },
    email: { value: '', dirty: false, touched: false, errors: [] },
    age: { value: 0, dirty: false, touched: false, errors: [] },
  };

  // ============================================
  // SERVICIO GENÉRICO CRUD
  // ============================================
  // GenericCrudService<User>: Servicio que funciona con usuarios

  crudService = new GenericCrudService<User>();
  crudItems: User[] = [];

  constructor() {
    // Crea algunos usuarios de ejemplo
    this.crudService.create({ id: 1, name: 'Alice', email: 'alice@test.com' });
    this.crudService.create({ id: 2, name: 'Bob', email: 'bob@test.com' });
    // Actualiza el nombre del usuario con id 1
    this.crudService.update(1, { name: 'Alice Updated' });
    // Obtiene todos los usuarios y los guarda en crudItems
    this.crudItems = this.crudService.getAll();
  }
}
