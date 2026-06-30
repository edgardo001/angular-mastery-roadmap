// Importamos SecurityContext para indicar el contexto de sanitización (HTML, URL, etc.)
import { Pipe, PipeTransform, inject, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// Pipe que limpia (sanitiza) HTML para evitar XSS.
// Recibe un string con HTML y devuelve solo etiquetas seguras.
@Pipe({ name: 'sanitizeHtml', standalone: true })
export class SanitizeHtmlPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string): SafeHtml {
    // Sanitizamos el HTML indicando que el contexto es HTML.
    // Si el HTML contiene etiquetas peligrosas (<script>, onclick, etc.),
    // Angular las elimina automáticamente.
    return this.sanitizer.sanitize(SecurityContext.HTML, value) as SafeHtml ?? '';
  }
}

// Pipe que confía ciegamente en el HTML recibido y lo marca como seguro.
// Solo debe usarse cuando el origen del HTML es 100% confiable.
@Pipe({ name: 'safeHtml', standalone: true })
export class SafeHtmlPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string): SafeHtml {
    // Le decimos a Angular que confíe en este HTML sin sanitizar.
    // ¡Peligro! Si el HTML viene del usuario, puede haber XSS.
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
