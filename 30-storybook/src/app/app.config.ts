// =============================================================================
// ARCHIVO: app.config.ts
// PROPÓSITO: Configuración de la aplicación Angular para Storybook
// =============================================================================
//
// Este archivo contiene la configuración mínima de la app Angular.
// Para Storybook, la configuración es muy simple porque Storybook
// maneja su propio entorno de renderizado.
//
// ¿Por qué está casi vacío?
// Porque Storybook tiene su propio "motor de renderizado" que ejecuta
// los componentes en aislamiento. No necesita Router, Animations, etc.
// Solo necesita la configuración base de Angular.
// =============================================================================

// ApplicationConfig: Tipo del objeto de configuración de la app
import { ApplicationConfig } from '@angular/core';

// Configuración vacía: Storybook maneja su propio entorno.
// Los componentes se prueban aislados, sin necesidad de Router ni servicios.
export const appConfig: ApplicationConfig = { providers: [] };
