/**
 * Puerto de salida: Interfaz UserRepository.
 *
 * Define las operaciones de persistencia para la entidad User.
 * La implementación concreta se elige en runtime (in-memory, HTTP, BD).
 *
 * InjectionToken — Permite desacoplar la interfaz de la implementación.
 */
import { InjectionToken } from '@angular/core';
import { User, UserId } from '../entities/user';

/** Interfaz que define las operaciones de persistencia de usuarios */
export interface UserRepository {
  findById(id: UserId): Promise<User | null>;  // Buscar por ID
  save(user: User): Promise<void>;             // Guardar usuario
}

/** Token de inyección para el repositorio de usuarios */
export const USER_REPOSITORY = new InjectionToken<UserRepository>('UserRepository');
