/**
 * Caso de uso: GetUsers.
 *
 * Un caso de uso encapsula una operación de negocio específica.
 * Es como una receta de cocina: dice QUÉ hacer (obtener usuarios)
 * pero no CÓMO hacerlo (la implementación del repositorio).
 *
 * En Arquitectura Hexagonal:
 * - El caso de uso está en la capa de APLICACIÓN
 * - Usa el puerto (interfaz) UserRepository, NO la implementación concreta
 * - Esto permite cambiar la fuente de datos sin modificar el caso de uso
 *
 * @Injectable() — Le dice a Angular que esta clase puede tener dependencias inyectadas.
 * inject() — Forma moderna de obtener dependencias (sin constructor).
 */
import { inject, Injectable } from '@angular/core';
import { UserRepository, USER_REPOSITORY } from '../domain/ports/user-repository.port';
import { User } from '../domain/entities/user.entity';

@Injectable()
export class GetUsersUseCase {
  /**
   * inject<UserRepository>(USER_REPOSITORY) — Obtiene la implementación concreta
   * del repositorio registrada en app.config.ts. Puede ser InMemory o HTTP,
   * al caso de uso no le importa.
   */
  private readonly repository = inject<UserRepository>(USER_REPOSITORY);

  /** Ejecuta el caso de uso: obtiene todos los usuarios */
  execute(): Promise<User[]> {
    return this.repository.getAll();
  }
}
