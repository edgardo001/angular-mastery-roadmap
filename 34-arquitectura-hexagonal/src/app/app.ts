/**
 * Componente raíz de la Arquitectura Hexagonal.
 *
 * Este componente actúa como la "interfaz de usuario" (puerto de entrada)
 * que interactúa con los casos de uso de negocio.
 *
 * En Arquitectura Hexagonal:
 * - Los componentes son PUERTOS DE ENTRADA (adaptadores de interfaz)
 * - Los casos de uso contienen la LÓGICA DE NEGOCIO
 * - Los repositorios son PUERTOS DE SALIDA (adaptadores de persistencia)
 *
 * @Component — Decorador que define un componente Angular
 * inject() — Obtiene dependencias del sistema de inyección de dependencias
 * signal() — Contenedor reactivo de datos
 */
import { Component, inject, signal } from '@angular/core';
import { GetUsersUseCase } from './application/get-users.use-case';
import { CreateUserUseCase } from './application/create-user.use-case';
import { User } from './domain/entities/user.entity';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  /**
   * inject() obtiene los casos de uso registrados como providers.
   * El componente NO sabe qué implementación concreta se usa (in-memory o HTTP).
   * Solo conoce la interfaz (puerto). Eso es la magia de la hexagonal.
   */
  private readonly getUsers = inject(GetUsersUseCase);
  private readonly createUser = inject(CreateUserUseCase);

  /** Signal que almacena la lista de usuarios */
  readonly users = signal<User[]>([]);

  /** Signal que muestra el estado actual de la operación */
  readonly status = signal('Ready');

  /**
   * Carga todos los usuarios ejecutando el caso de uso GetUsers.
   * async/await permite escribir código asíncrono como si fuera síncrono.
   */
  async loadUsers(): Promise<void> {
    this.status.set('Loading...');
    const users = await this.getUsers.execute();
    this.users.set(users);
    this.status.set(`Loaded ${users.length} users`);
  }

  /**
   * Crea un usuario nuevo con datos aleatorios.
   * Luego recarga la lista para mostrar el usuario creado.
   */
  async addUser(): Promise<void> {
    this.status.set('Creating...');
    const name = `User ${Math.floor(Math.random() * 1000)}`;
    const email = `user${Math.floor(Math.random() * 1000)}@example.com`;
    await this.createUser.execute({ name, email });
    this.status.set('User created');
    await this.loadUsers();
  }
}
