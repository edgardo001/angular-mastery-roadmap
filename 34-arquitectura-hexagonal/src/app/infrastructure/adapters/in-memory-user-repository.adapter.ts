/**
 * Adaptador de infraestructura: InMemoryUserRepository.
 *
 * Este es un ADAPTADOR (implementación concreta del puerto UserRepository).
 * Almacena usuarios en memoria usando un Map (como un diccionario en RAM).
 *
 * En Arquitectura Hexagonal:
 * - Los adaptadores implementan los puertos
 * - Se pueden cambiar sin modificar la lógica de negocio
 * - InMemory es para desarrollo/testing. En producción se usaría HTTP o BD
 *
 * Map<string, User> — Estructura de datos clave-valor.
 * Es como un diccionario: "id" → "objeto usuario"
 *
 * Analogía: Este adaptador es como una libreta de notas. Puedes escribir,
 * leer y borrar notas, pero si cierras la libreta (app), todo se pierce.
 * Para persistencia real, usarías un adaptador HTTP o de base de datos.
 *
 * @Injectable() — Para que Angular pueda inyectar este servicio si se necesita.
 */
import { Injectable } from '@angular/core';
import { UserRepository } from '../../domain/ports/user-repository.port';
import { User } from '../../domain/entities/user.entity';
import { UserId } from '../../domain/value-objects/user-id.value-object';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  /** Map para almacenar usuarios en memoria. Clave = ID, Valor = Usuario */
  private users = new Map<string, User>();

  /** Retorna todos los usuarios como array */
  async getAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  /** Busca un usuario por su ID. Retorna null si no existe. */
  async getById(id: UserId): Promise<User | null> {
    return this.users.get(id.toString()) ?? null; // ?? null = si es undefined, retorna null
  }

  /** Guarda un usuario nuevo en el Map */
  async create(user: User): Promise<User> {
    this.users.set(user.id.toString(), user);
    return user;
  }

  /** Elimina un usuario del Map */
  async delete(id: UserId): Promise<void> {
    this.users.delete(id.toString());
  }
}
