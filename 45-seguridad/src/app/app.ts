// Componente raíz de la aplicación de seguridad
// Demuestra técnicas de protección contra XSS y CSP
import { Component, inject, signal } from '@angular/core';
// DomSanitizer: servicio para limpiar contenido peligroso
import { DomSanitizer } from '@angular/platform-browser';
// Pipe personalizado para marcar HTML como seguro
import { SafeHtmlPipe } from './sanitize.pipe';
// Servicio para generar nonces de CSP
import { CspService } from './csp.service';

@Component({
  selector: 'app-root', // Nombre del componente en el HTML
  imports: [SafeHtmlPipe], // Importamos el pipe para usarlo en el template
  templateUrl: './app.html', // Template externo (HTML)
  styleUrl: './app.css', // Estilos CSS
})
export class App {
  // inject() obtiene servicios de Angular (patrón moderno vs constructor)
  private readonly sanitizer = inject(DomSanitizer);
  readonly csp = inject(CspService);

  // signal(): crea una variable reactiva que Angular observa automáticamente
  // Cuando cambia, el template se actualiza automáticamente
  unsafeHtml = signal('<script>alert("XSS")</script><p>Unsafe HTML</p>');
  safeHtml = signal('');
  nonceGenerated = signal('');

  // Sanitiza el HTML peligroso usando DomSanitizer
  sanitize(): void {
    const raw = this.unsafeHtml(); // Leemos el valor del signal
    // sanitize(0, raw) limpia el HTML (0 = SecurityContext.HTML)
    const sanitized = this.sanitizer.sanitize(0, raw) as string;
    this.safeHtml.set(sanitized ?? ''); // Actualizamos el signal con el HTML limpio
  }

  // Genera un nonce nuevo usando el servicio CSP
  generateNonce(): void {
    this.nonceGenerated.set(this.csp.generateNonce());
  }
}
