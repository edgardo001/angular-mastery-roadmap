// ──────────────────────────────────────────────
// footer.component.ts — Pie de página
// ──────────────────────────────────────────────
//
// ANÁLOGÍA DEL MUNDO REAL:
// FooterComponent es como el "letrero de copyright" en la puerta de una tienda.
// Solo muestra información (año y nombre de empresa), no hace nada más.
// Es el componente más simple porque no necesita "pensar", solo "mostrar".
//
// FooterComponent es el componente más simple: solo recibe
// datos del padre y los muestra. No tiene lógica propia.
//
// Flujo de datos:
//   AppComponent → [year], [company] → FooterComponent
//   (solo recibe datos, no envía eventos - es como un letrero estático)
//
// Patrón en Angular:
// - Componentes "tontos" (presentational): solo muestran datos que reciben
//   ANÁLOGÍA: Son como un espejo que refleja lo que le muestras.
// - Componentes "inteligentes" (smart): tienen lógica y manejan eventos
//   ANÁLOGÍA: Son como un asistente personal que piensa y actúa.
//
// FooterComponent es un componente "tonto": solo muestra lo que le pasan.
// Es como un letrero que dice "© 2026 Angular Mastery" sin hacer nada más.

import { Component, Input } from '@angular/core';

// @Component: Decorador que transforma una clase TypeScript en un componente Angular
//
// ANÁLOGÍA: Es como una "etiqueta de producto" que le dice al sistema:
// - Cómo se llama este producto (selector)
// - Cómo se usa (template)
// - Cómo se ve (styles)
@Component({
  // selector: 'app-footer' → nombre HTML del componente
  // Se usa en el template del padre como: <app-footer></app-footer>
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <!--
        Interpolación con múltiples valores:
        {{ year }} → 2026 (new Date().getFullYear())
        {{ company }} → 'Angular Mastery'
        Resultado: <p>© 2026 Angular Mastery. Todos los derechos reservados.</p>
        
        ANÁLOGÍA: Es como un "relleno automático" de formularios.
        {{ year }} se reemplaza por 2026, {{ company }} por 'Angular Mastery'.
        Angular actualiza automáticamente cuando los valores cambian.
        
        &copy; es la entidad HTML para el símbolo ©
        (HTML no puede mostrar © directamente, usa &copy; como atajo)
      -->
      <p>&copy; {{ year }} {{ company }}. Todos los derechos reservados.</p>
    </footer>
  `,

  // styles: CSS que solo se aplica a ESTE componente
  // ANÁLOGÍA: Es como pintar solo la fachada de una tienda.
  // El color no se "filtra" a las otras tiendas del centro comercial.
  styles: [`
    footer { text-align: center; padding: 1.5rem; background: #1a1a2e; color: #999; font-size: 0.875rem; }
  `]
})
export class FooterComponent {
  // @Input({ required: true }): year es obligatorio
  // El padre debe pasar el año: [year]="currentYear"
  //
  // ANÁLOGÍA: Es como un letrero que necesita el año para ser válido.
  // Sin el año, el letrero está incompleto y no tiene sentido.
  @Input({ required: true }) year!: number;

  // @Input({ required: true }): company es obligatorio
  // El padre debe pasar el nombre de la empresa: [company]="companyName"
  //
  // ANÁLOGÍA: Es como un letrero que necesita el nombre de la tienda.
  // Sin el nombre, el letrero no sabe qué empresa representa.
  @Input({ required: true }) company!: string;
}
