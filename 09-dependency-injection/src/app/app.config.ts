/**
 * Configuración de providers de la aplicación.
 *
 * Los providers le dicen a Angular CÓMO crear las dependencias.
 * Es como darle instrucciones al mesero sobre cómo preparar tu pedido.
 *
 * Tipos de providers:
 * - useValue: proporciona un valor estático (configuración, constantes)
 * - useClass: proporciona una instancia de una clase
 * - useFactory: crea un valor con lógica personalizada
 * - useExisting: alias de otro provider existente
 */

import { ApplicationConfig, InjectionToken } from '@angular/core';
import { APP_CONFIG, DEFAULT_CONFIG, AppConfig } from './config';
import { AnalyticsService, ConsoleAnalyticsService, MockAnalyticsService } from './services/analytics.service';

/**
 * InjectionToken para un saludo generado por factory.
 */
export const GREETING = new InjectionToken<string>('greeting');

/**
 * Factory function: crea el saludo basándose en la configuración.
 *
 * ANLOGÍA: Es como un chef que prepara el plato según
 * los ingredientes que tiene disponibles (config).
 */
function greetingFactory(config: AppConfig): string {
  return \`Bienvenido a \${config.appName} (API: \${config.apiUrl})\`;
}

/**
 * Providers de la aplicación.
 *
 * Cada provider es como una "instrucción" para el mesero:
 * - "Cuando alguien pida APP_CONFIG, dale DEFAULT_CONFIG"
 * - "Cuando alguien pida AnalyticsService, dale ConsoleAnalyticsService"
 * - "Cuando alguien pida GREETING, ejecuta greetingFactory con APP_CONFIG"
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // useValue: provee un valor estático
    { provide: APP_CONFIG, useValue: DEFAULT_CONFIG },

    // useClass: provee una instancia de ConsoleAnalyticsService
    { provide: AnalyticsService, useClass: ConsoleAnalyticsService },

    // Estas clases también se proveen para poder inyectarlas directamente
    ConsoleAnalyticsService,
    MockAnalyticsService,

    // useFactory: crea el valor ejecutando greetingFactory
    // deps: [APP_CONFIG] le pasa la config como argumento
    { provide: GREETING, useFactory: greetingFactory, deps: [APP_CONFIG] },
  ],
};
