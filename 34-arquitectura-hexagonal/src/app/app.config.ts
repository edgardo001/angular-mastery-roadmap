/**
 * Configuración de la aplicación con Arquitectura Hexagonal.
 *
 * Este archivo es el "ensamblador" que conecta las piezas:
 * - Puertos (interfaces) definen QUÉ se puede hacer
 * - Adaptadores (clases concretas) definen CÓMO se hace
 * - InjectionToken permite desacoplar las implementaciones
 *
 * provideUserRepository() — Registra el adaptador concreto (InMemory) para el puerto UserRepository.
 * provideUseCases() — Registra los casos de uso como servicios inyectables.
 *
 * Analogía: Es como armar un rompecabezas donde cada pieza encaja
 * en su lugar exacto gracias a las conexiones (providers).
 */
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { USER_REPOSITORY } from './domain/ports/user-repository.port';
import { InMemoryUserRepository } from './infrastructure/adapters/in-memory-user-repository.adapter';
import { GetUsersUseCase } from './application/get-users.use-case';
import { CreateUserUseCase } from './application/create-user.use-case';

/**
 * Función helper que registra el adaptador de repositorio.
 * { provide: TOKEN, useClass: Clase } — Le dice a Angular: "cuando alguien pida TOKEN,
 * crea una instancia de Clase".
 */
export function provideUserRepository() {
  return { provide: USER_REPOSITORY, useClass: InMemoryUserRepository };
}

/**
 * Función helper que registra los casos de uso.
 * Los casos de uso son servicios que encapsulan una operación de negocio específica.
 */
export function provideUseCases() {
  return [
    GetUsersUseCase,
    CreateUserUseCase,
  ];
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()), // HttpClient con fetch API (más moderno que XMLHttpRequest)
    provideUserRepository(),
    provideUseCases(),
  ],
};
