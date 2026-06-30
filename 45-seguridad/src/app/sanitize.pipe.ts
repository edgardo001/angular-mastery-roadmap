// Importamos las herramientas de Angular para crear pipes y sanitizar contenido
// Pipe: transforma datos para mostrarlos en el template (como un filtro)
// PipeTransform: interfaz que define cómo transformar el dato
// SecurityContext: indica el tipo de contenido que estamos validando (HTML, URL, etc.)
import { Pipe, PipeTransform, inject, SecurityContext } from '@angular/core';
// DomSanitizer: servicio de Angular que limpia contenido peligroso
// SafeHtml: tipo que indica que el HTML ha sido sanitizado y es seguro
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// PIPE 1: SanitizeHtmlPipe - Limpia HTML para prevenir ataques XSS
// Un pipe se usa en templates con el símbolo | : {{ miHtml | sanitizeHtml }}
// Este pipe elimina etiquetas peligrosas como <script>, onclick, etc.
@Pipe({ name: 'sanitizeHtml', standalone: true })
export class SanitizeHtmlPipe implements PipeTransform {
  // inject() obtiene el servicio DomSanitizer de Angular (patrón de inyección moderno)
  private readonly sanitizer = inject(DomSanitizer);

  // transform() es el método que ejecuta la sanitización
  // Recibe un string con HTML y devuelve HTML seguro
  transform(value: string): SafeHtml {
    // sanitize() limpia el HTML según el contexto especificado
    // SecurityContext.HTML indica que validaremos como HTML
    // Si encuentra código peligroso, lo elimina automáticamente
    return this.sanitizer.sanitize(SecurityContext.HTML, value) as SafeHtml ?? '';
  }
}

// PIPE 2: SafeHtmlPipe - Marca HTML como seguro SIN sanitizar
// ¡PELIGRO! Este pipe confía ciegamente en el contenido
// Solo úsalo cuando el HTML viene de una fuente 100% confiable (tu propio código)
@Pipe({ name: 'safeHtml', standalone: true })
export class SafeHtmlPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string): SafeHtml {
    // bypassSecurityTrustHtml() le dice a Angular: "confía en este HTML"
    // Angular NO lo sanitiza, así que si contiene código malicioso, se ejecutará
    // Ejemplo de uso seguro: mostrar HTML que tú mismo generaste en el servidor
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
