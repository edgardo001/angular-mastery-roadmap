// =============================================================================
// ARCHIVO: app.config.ts
// PROPÓSITO: Configuración con locale (idioma/región) para i18n
// =============================================================================
//
// Este archivo es la configuración CENTRAL del i18n.
// Define qué idioma usa la app por defecto y registra datos de locale.
//
// ¿Qué es un "locale"?
// Es la combinación de idioma + región que define cómo se formatean
// fechas, números, monedas y textos. Ejemplos:
// - 'en' → inglés (sin región específica)
// - 'es-MX' → español de México
// - 'fr-FR' → francés de Francia
// - 'pt-BR' → portugués de Brasil
//
// Cada locale tiene reglas diferentes:
// - En USA: 1,234.56 (coma separa miles, punto decimales)
// - En Alemania: 1.234,56 (punto separa miles, coma decimales)
// - En Japón: ￥1,234 (la moneda va primero)
// =============================================================================

// ApplicationConfig: Tipo de la configuración de la app
// provideBrowserGlobalErrorListeners: Captura errores del navegador
// LOCALE_ID: Token inyectable que define el idioma/región de la app
import { ApplicationConfig, provideBrowserGlobalErrorListeners, LOCALE_ID } from '@angular/core';

// provideRouter: Configura el sistema de rutas
import { provideRouter } from '@angular/router';

// registerLocaleData: Registra datos de locale (formatos de fecha, moneda, etc.)
// Sin esto, Angular solo sabe formatear en inglés.
import { registerLocaleData } from '@angular/common';

// Datos de locale para español (sin región específica)
// Incluye: traducciones de meses, días, formatos de moneda, etc.
import localeEs from '@angular/common/locales/es';

// Registra los datos de español para que Angular pueda formatear
// fechas, números y monedas en español.
// Esto es como darle al traductor un diccionario español.
registerLocaleData(localeEs);

// Las rutas definidas
import { routes } from './app.routes';

// Configuración completa de la aplicación
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    // LOCALE_ID: Define el idioma por defecto de la app.
    // 'en' = inglés. Los pipes (date, currency, number) usarán
    // este locale para formatear los datos.
    //
    // ¿Por qué 'en' por defecto?
    // Porque la app está en inglés. Si cambias a 'es',
    // los pipes formatearían en español automáticamente.
    //
    // NOTA: El atributo i18n en el template se usa con ng extract-i18n
    // para generar archivos de traducción. El locale del provider
    // determina el formato de los pipes, no el idioma de los textos.
    { provide: LOCALE_ID, useValue: 'en' }
  ]
};
