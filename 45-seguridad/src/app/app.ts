import { Component, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from './sanitize.pipe';
import { CspService } from './csp.service';

@Component({
  selector: 'app-root',
  imports: [SafeHtmlPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly sanitizer = inject(DomSanitizer);
  readonly csp = inject(CspService);

  unsafeHtml = signal('<script>alert("XSS")</script><p>Unsafe HTML</p>');
  safeHtml = signal('');
  nonceGenerated = signal('');

  sanitize(): void {
    const raw = this.unsafeHtml();
    const sanitized = this.sanitizer.sanitize(0, raw) as string;
    this.safeHtml.set(sanitized ?? '');
  }

  generateNonce(): void {
    this.nonceGenerated.set(this.csp.generateNonce());
  }
}
