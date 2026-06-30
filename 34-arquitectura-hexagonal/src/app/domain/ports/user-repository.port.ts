/**
 * Puerto de salida: Interfaz UserRepository.
 *
 * En Arquitectura Hexagonal, un PUERTO es una interfaz que define
 * QUÉ puede hacer el sistema, pero NO CÓMO lo hace.
 *
 * Puerto de ENTRADA = API que el mundo exterior puede llamar (ej: casos de uso)
 * Puerto de SALIDA = API que el sistema llama para interactuar con el exterior (ej: base de datos)
 *
 * Este es un puerto de SALIDA: define las operaciones de persistencia de usuarios.
 * La implementación concreta (in-memory, HTTP, MongoDB) se elige en runtime.
 *
 * InjectionToken — Es como una "etiqueta" que Angular usa para identificar
 * qué clase inyectar cuando alguien pida el puerto. Es como un número de
 * cajero automático: le dices al sistema "necesito un UserRepository" y
 * él sabe cuál darte gracias al token.
 *
 * Analogía: El puerto es como un enchufe eléctrico universal. No le importa
 * si la electricidad viene de una pila, del sol o de la red. Solo necesita
 * que el adaptador encaje.
 */
import { InjectionToken } from '@angular/core';
import { User } from '../entities/user.entity';
import { UserId } from '../value-objects/user-id.value-object';

/**
 * Interfaz que define las operaciones de persistencia de usuarios.
 * Cualquier clase que implemente esta interfaz puede usarse como repositorio.
 */
export interface UserRepository {
  getAll(): Promise<User[]>;                    // Obtener todos los usuarios
  getById(id: UserId): Promise<User | null>;    // Obtener un usuario por ID
  create(user: User): Promise<User>;            // Crear un nuevo usuario
  delete(id: UserId): Promise<void>;            // Eliminar un usuario
}

/**
 * Token de inyección para desacoplar la interfaz de la implementación.
 * Esto permite cambiar la implementación (in-memory → HTTP) sin modificar
 * el código que usa el repositorio.
 */
export const USER_REPOSITORY = new InjectionToken<UserRepository>('UserRepository');
