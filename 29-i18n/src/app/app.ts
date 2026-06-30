// =============================================================================
// ARCHIVO: app.ts
// PROPÓSITO: Componente raíz con contenido internacionalizable (i18n)
// =============================================================================
//
// Este componente demuestra las funcionalidades de i18n de Angular:
// 1. Texto traducible con atributo i18n
// 2. Pipes de formato localizado (fechas, monedas, números)
// 3. Cambio dinámico de idioma
//
// ¿Qué es i18n?
// Es el estándar de la industria para internacionalización.
// Permite que tu app muestre contenido en español, inglés, francés, etc.
// sin cambiar el código fuente. Los textos se extraen a archivos de traducción.
//
// Ejemplo real: Netflix usa i18n para mostrar títulos y descripciones
// en el idioma de cada usuario, incluyendo formato de fechas y monedas.
// =============================================================================

// Component: Decorador que define un componente Angular
// inject: Para obtener servicios de Angular de forma funcional
// signal: Para manejo de estado reactivo
import { Component, inject, signal } from '@angular/core';

// Pipes de Angular para formateo localizado:
// - DatePipe: Formatea fechas según el locale (idioma/región)
// - CurrencyPipe: Formatea números como moneda ($1,234.56)
// - DecimalPipe: Formatea números decimales (1,234.57)
// - PercentPipe: Formatea números como porcentaje (85.6%)
import { DatePipe, CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,

  // Los pipes se importan explícitamente en standalone components
  imports: [DatePipe, CurrencyPipe, DecimalPipe, PercentPipe],

  template: `
    <div style="max-width:700px;margin:2rem auto;padding:0 1rem;font-family:system-ui,sans-serif;">
      <!--
        i18n: Atributo especial de Angular para marcar texto como traducible.
        "i18n='@@appTitle'" le da un ID único a este texto para el extractor.
        
        ¿Cómo funciona el proceso?
        1. Marcas el texto con i18n="@@identificador"
        2. Ejecutas `ng extract-i18n` → genera un archivo XLF con todos los textos
        3. Un traductor llena las traducciones en el archivo XLF
        4. Angular usa el locale configurado para mostrar el idioma correcto
        
        Es como etiquetar cajas en un almacén: cada caja tiene una etiqueta
        (identificador) para saber qué contiene y dónde va.
      -->
      <h1 i18n="@@appTitle" style="color:#1e40af;">Localization & i18n</h1>
      <p i18n="@@appDesc">This app demonstrates Angular internationalization features.</p>

      <!-- BOTONES DE CAMBIO DE IDIOMA -->
      <div style="margin:1rem 0;display:flex;gap:0.5rem;">
        <!--
          switchLang(): Navega a la ruta del idioma seleccionado.
          En producción, Angular genera una app por cada idioma (build separado).
          Esta app demo simula el cambio recargando la página.
        -->
        <button (click)="switchLang('en')"
          style="padding:0.5rem 1rem;border-radius:4px;cursor:pointer;border:1px solid #d1d5db;background:white;">
          English
        </button>
        <button (click)="switchLang('es')"
          style="padding:0.5rem 1rem;border-radius:4px;cursor:pointer;border:1px solid #d1d5db;background:white;">
          Español
        </button>
      </div>

      <!-- SECCIÓN: FORMATEO LOCALIZADO -->
      <section style="margin-top:2rem;">
        <h2 i18n="@@formattersTitle">Locale-aware Formatting</h2>

        <div style="margin-top:1rem;display:grid;gap:0.75rem;">
          <!--
            Pipes de formato localizado:
            
            date:'fullDate': Muestra la fecha completa según el locale.
            - English: "Monday, June 30, 2026"
            - Español: "lunes, 30 de junio de 2026"
            
            currency:'USD':'symbol':'1.2-2': Muestra el número como moneda.
            - USA: "$1,234.56"
            - Europa: "€1.234,56" (con locale europeo)
            
            number:'1.2-2': Formatea con separadores de miles y 2 decimales.
            - USA: "1,234,567.89"
            - Europa: "1.234.567,89"
            
            percent:'1.0-2': Convierte decimal a porcentaje.
            - 0.856 → "85.60%"
          -->
          <p><strong i18n="@@dateLabel">Date:</strong> {{ today | date:'fullDate' }}</p>
          <p><strong i18n="@@currencyLabel">Currency:</strong> {{ 1234.56 | currency:'USD':'symbol':'1.2-2' }}</p>
          <p><strong i18n="@@numberLabel">Number:</strong> {{ 1234567.89 | number:'1.2-2' }}</p>
          <p><strong i18n="@@percentageLabel">Percentage:</strong> {{ 0.856 | percent:'1.0-2' }}</p>
        </div>
      </section>

      <!-- SECCIÓN: SALUDOS -->
      <section style="margin-top:2rem;">
        <h2 i18n="@@greetingLabel">Greetings</h2>
        <p>
          <!--
            Cada fragmento de texto tiene su propio ID de traducción.
            Esto permite traducir partes de una oración independientemente.
            Por ejemplo, "Good morning" puede traducirse como "Buenos días"
            sin afectar el resto de la frase.
          -->
          <span i18n="@@morning">Good morning</span>,
          <span i18n="@@welcome">welcome to our Angular i18n demo</span>!
        </p>
      </section>

      <!-- FOOTER -->
      <footer style="margin-top:3rem;padding-top:1rem;border-top:1px solid #e5e7eb;">
        <p i18n="@@footerText">&copy; 2026 Angular i18n Demo. All rights reserved.</p>
      </footer>
    </div>
  `
})
export class App {
  // Timestamp actual para mostrar la fecha de hoy formateada
  today = Date.now();

  // Cambia el idioma navegando a la ruta del locale correspondiente.
  // En producción, Angular compila una app separada por cada idioma:
  // - /en/ → versión en inglés
  // - /es/ → versión en español
  // - /fr/ → versión en francés
  //
  // Cada versión tiene sus propios archivos de traducción (.xlf)
  // compilados en el build.
  switchLang(locale: string) {
    window.location.href = `/${locale}/`;
  }
}
