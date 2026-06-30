/**
 * Configuración de la aplicación para Dependency Injection.
 *
 * Define los InjectionTokens y los valores por defecto.
 *
 * ANLOGÍA: Es como el "menú" del restaurante — define qué opciones
 * están disponibles y sus valores predeterminados.
 */

import { InjectionToken } from '@angular/core';

/**
 * Interfaz que define la forma de la configuración.
 * Es como un "contrato" que garantiza que siempre tengas
 * apiUrl, appName y debug en la config.
 */
export interface AppConfig {
  apiUrl: string;
  appName: string;
  debug: boolean;
}

/**
 * InjectionToken: un token TIPO-SEGURO para inyectar valores.
 *
 * ¿Por qué no usar una string o una clase?
 * - Las strings pueden colisionar ("app.config" podría existir en varios módulos)
 * - Las clases solo sirven para inyectar INSTANCIAS de esa clase
 * - InjectionToken es único y está tipado con <AppConfig>
 *
 * ANLOGÍA: Es como un número de pedido único — garantiza que
 * obtienes EXACTAMENTE lo que pediste, no algo parecido.
 */
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

/**
 * Valor por defecto de la configuración.
 * Se provee con useValue en app.config.ts.
 */
export const DEFAULT_CONFIG: AppConfig = {
  apiUrl: 'http://localhost:3000/api',
  appName: 'Angular DI Demo',
  debug: false,
};

/**
 * Token para una feature opcional (demostración de @Optional).
 * No se provee en ningún lado, así que @Optional retornará null.
 */
export const OPTIONAL_FEATURE = new InjectionToken<string>('optional.feature');
