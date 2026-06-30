// ──────────────────────────────────────────────
// footer.component.ts — Pie de página
// ──────────────────────────────────────────────
//
// FooterComponent es el componente más simple: solo recibe
// datos del padre y los muestra. No tiene lógica propia.
//
// Flujo de datos:
//   AppComponent → [year], [company] → FooterComponent
//   (solo recibe datos, no envía eventos)
//
// Patrón en Angular:
// - Componentes "tontos" (smart): solo muestran datos que reciben
// - Componentes "inteligentes" (smart): tienen lógica y manejan eventos
// FooterComponent es un componente "tonto": solo muestra lo que le pasan

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <!--
        Interpolación con múltiples valores:
        {{ year }} → 2026 (new Date().getFullYear())
        {{ company }} → 'Angular Mastery'
        Resultado: <p>© 2026 Angular Mastery. Todos los derechos reservados.</p>

        &copy; es la entidad HTML para el símbolo ©
      -->
      <p>&copy; {{ year }} {{ company }}. Todos los derechos reservados.</p>
    </footer>
  `,

  // Estilos scoped: footer simple con fondo oscuro
  styles: [`
    footer { text-align: center; padding: 1.5rem; background: #1a1a2e; color: #999; font-size: 0.875rem; }
  `]
})
export class FooterComponent {
  // @Input({ required: true }): year es obligatorio
  // El padre debe pasar el año: [year]="currentYear"
  @Input({ required: true }) year!: number;

  // @Input({ required: true }): company es obligatorio
  // El padre debe pasar el nombre de la empresa: [company]="companyName"
  @Input({ required: true }) company!: string;
}
