// =============================================================================
// ARCHIVO: app.config.server.ts
// PROPÓSITO: Configuración específica para el servidor (SSR)
// =============================================================================
//
// Este archivo extiende la configuración del navegador (appConfig) con
// providers que solo existen en el servidor. Es como agregar herramientas
// de cocina a un restaurante: el comensal no las necesita (navegador),
// pero el chef (servidor) sí.
//
// La función mergeApplicationConfig combina ambas configuraciones:
// - La base del navegador (routers, hydration, etc.)
// + La adición del servidor (server rendering)
// =============================================================================

// ApplicationConfig: El tipo de la configuración de la app.
// mergeApplicationConfig: Función que combina dos configuraciones,
// dando prioridad a la segunda sobre la primera en caso de conflicto.
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';

// provideServerRendering habilita las capacidades de SSR.
// Sin este provider, Angular no sabe cómo renderizar la app en el servidor.
// Es como instalar el motor de un auto: sin él, el auto no arranca.
import { provideServerRendering } from '@angular/platform-server';

// La configuración base del navegador que se extenderá
import { appConfig } from './app.config';

// Combina la configuración del navegador con la del servidor.
// Resultado: una configuración completa que funciona en ambos entornos.
export const serverConfig = mergeApplicationConfig(appConfig, {
  providers: [
    // Agrega la capacidad de renderizar en el servidor
    provideServerRendering()
  ]
});
