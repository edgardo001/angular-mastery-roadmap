/**
 * ARCHIVO: app.ts - Componente raíz de la aplicación GraphQL
 *
 * Este componente muestra un panel de control que permite:
 * - Ver la lista de usuarios obtenidos del servidor GraphQL
 * - Crear nuevos usuarios mediante una mutación GraphQL
 *
 * GraphQL es un lenguaje de consultas alternativo a REST que permite
 * al cliente especificar exactamente qué datos necesita.
 *
 * Analogía: Es como un menú de restaurante interactivo. En lugar de pedir
 * "el platillo completo" (REST), puedes seleccionar solo los ingredientes
 * que quieres (GraphQL). El chef (servidor) te prepara exactamente lo que pediste.
 */

// Component: Decorador de Angular que define las propiedades de un componente.
// inject: Función para obtener servicios sin constructores.
// signal: Función para crear valores reactivos.
import { Component, inject, signal } from '@angular/core';

// Apollo: Cliente GraphQL para Angular. Permite ejecutar queries y mutations.
import { Apollo } from 'apollo-angular';

// Importamos la consulta GraphQL y los tipos de respuesta.
import { GET_USERS, GetUsersResponse, User } from './users.query';

// Importamos la mutación GraphQL y los tipos de entrada.
import { CREATE_USER, CreateUserInput } from './create-user.mutation';

@Component({
  selector: 'app-root',
  imports: [], // No necesita imports especiales porque Apollo se inyecta directamente
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  /**
   * apollo: Cliente Apollo para ejecutar consultas GraphQL.
   * Se inyecta mediante la función inject() en lugar del constructor.
   */
  private readonly apollo = inject(Apollo);

  /**
   * users: Signal que contiene la lista de usuarios del servidor.
   * Se actualiza cada vez que se ejecuta la consulta GET_USERS.
   */
  readonly users = signal<User[]>([]);

  /**
   * loading: Signal que indica si se está cargando datos del servidor.
   * Se usa en el template para mostrar un indicador de carga.
   */
  readonly loading = signal(false);

  /**
   * constructor: Se ejecuta una vez cuando se crea el componente.
   * Aquí cargamos la lista inicial de usuarios.
   */
  constructor() {
    this.loadUsers();
  }

  /**
   * loadUsers: Obtiene la lista de usuarios del servidor GraphQL.
   *
   * watchQuery(): Crea una consulta "observable" que:
   * 1. Se ejecuta inmediatamente
   * 2. Se re-ejecuta cuando cambian los datos en la caché
   * 3. Actualiza automáticamente el template cuando llegan nuevos datos
   *
   * Flujo:
   * 1. Establecemos loading = true (mostramos spinner)
   * 2. Ejecutamos la consulta GraphQL
   * 3. Cuando llegan los datos, actualizamos el signal users
   * 4. Establecemos loading = false (ocultamos spinner)
   */
  loadUsers(): void {
    this.loading.set(true);
    // watchQuery<GetUsersResponse>: Tipa la respuesta del servidor.
    // valueChanges: Observable que emite cada vez que cambian los datos.
    // subscribe(): Nos suscribimos para recibir los datos cuando lleguen.
    this.apollo.watchQuery<GetUsersResponse>({ query: GET_USERS } as any).valueChanges
      .subscribe({
        next: (result) => {
          // result.data contiene la respuesta del servidor.
          // El operador ?. (optional chaining) previene errores si result.data es undefined.
          this.users.set((result.data as GetUsersResponse)?.users ?? []);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  /**
   * createUser: Crea un nuevo usuario en el servidor GraphQL.
   *
   * mutate(): Ejecuta una mutación GraphQL que modifica datos en el servidor.
   *
   * Flujo:
   * 1. Envía la mutación CREATE_USER con los datos del usuario
   * 2. El servidor crea el usuario y le asigna un ID
   * 3. El servidor devuelve el usuario creado
   * 4. refetchQueries re-ejecuta GET_USERS para actualizar la lista
   *
   * @param name - Nombre del nuevo usuario
   * @param email - Email del nuevo usuario
   */
  createUser(name: string, email: string): void {
    this.apollo.mutate<{ createUser: User }, CreateUserInput>({
      mutation: CREATE_USER as any,
      variables: { name, email }, // Variables que se pasan a la mutación
      /**
       * refetchQueries: Lista de consultas que se re-ejecutan después de la mutación.
       * Esto asegura que la lista de usuarios se actualice con el nuevo usuario.
       */
      refetchQueries: [{ query: GET_USERS as any }],
    } as any).subscribe();
  }
}
