/**
 * Componente que demuestra el contraste de color según WCAG 2.1.
 *
 * WCAG (Web Content Accessibility Guidelines) es el estándar internacional
 * de accesibilidad web. Define niveles de contraste mínimo para que el texto
 * sea legible para personas con discapacidad visual.
 *
 * Niveles de contraste:
 * - AA (mínimo): Ratio de 4.5:1 para texto normal, 3:1 para texto grande
 * - AAA (mejorado): Ratio de 7:1 para texto normal, 4.5:1 para texto grande
 *
 * Analogía: El contraste es como la diferencia entre leer un libro con
 * letra negra sobre fondo blanco (fácil) vs letra gris claro sobre fondo blanco (difícil).
 *
 * Atributos ARIA usados:
 * - role="region": Marca una sección significativa de la página
 * - role="table": Indica que el contenido es una tabla
 * - aria-label: Describe el propósito para lectores de pantalla
 * - scope="col": Indica que el th es encabezado de columna
 */
import { Component } from '@angular/core';

/**
 * Interfaz que define la estructura de un par de colores para verificar contraste.
 */
interface ContrastPair {
  label: string;      // Nombre descriptivo de la muestra
  foreground: string; // Color del texto (hexadecimal)
  background: string; // Color de fondo (hexadecimal)
  ratio: string;      // Ratio de contraste calculado
  passAA: boolean;    // ¿Cumple nivel AA?
  passAAA: boolean;   // ¿Cumple nivel AAA?
}

@Component({
  selector: 'app-contrast-card',
  standalone: true,
  template: `
    <div class="contrast-demo" role="region" aria-label="Demostración de contraste de color">
      <h3>Contraste de Color (WCAG)</h3>
      <p>Verificación de relaciones de contraste según WCAG 2.1 AA/AAA.</p>
      <table role="table" aria-label="Relaciones de contraste">
        <thead>
          <tr>
            <!-- scope="col": Indica que este th es encabezado de columna -->
            <th scope="col">Muestra</th>
            <th scope="col">Ratio</th>
            <th scope="col">AA</th>
            <th scope="col">AAA</th>
          </tr>
        </thead>
        <tbody>
          @for (pair of pairs; track pair.label) {
            <tr>
              <td>
                <!-- Estilos en línea para mostrar la combinación de colores real -->
                <span class="swatch" [style.background]="pair.background" [style.color]="pair.foreground">
                  {{ pair.label }}
                </span>
              </td>
              <td>{{ pair.ratio }}</td>
              <td [class.pass]="pair.passAA" [class.fail]="!pair.passAA">
                {{ pair.passAA ? 'Pasa' : 'Falla' }}
              </td>
              <td [class.pass]="pair.passAAA" [class.fail]="!pair.passAAA">
                {{ pair.passAAA ? 'Pasa' : 'Falla' }}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .contrast-demo { background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 1.25rem; }
    h3 { margin-bottom: .5rem; }
    p { font-size: .875rem; color: #555; margin-bottom: 1rem; }
    table { width: 100%; border-collapse: collapse; font-size: .875rem; }
    th, td { text-align: left; padding: .5rem .75rem; border-bottom: 1px solid #eee; }
    th { font-weight: 600; color: #333; }
    .swatch { display: inline-block; padding: .25rem .5rem; border-radius: 4px; font-weight: 500; font-size: .8rem; }
    .pass { color: #2e7d32; font-weight: 500; }
    .fail { color: #c62828; }
    td:focus-visible { outline: 2px solid #1a73e8; outline-offset: -2px; }
  `]
})
export class ContrastCardComponent {
  /**
   * Arreglo de pares de colores para demostrar diferentes niveles de contraste.
   * Cada par tiene un ratio calculado y si cumple AA/AAA.
   *
   * Nota: Estos valores son de ejemplo. En una app real, el ratio se calcula
   * usando una fórmula matemática basada en luminancia relativa.
   */
  readonly pairs: ContrastPair[] = [
    { label: 'Texto normal', foreground: '#1a1a2e', background: '#ffffff', ratio: '16.5:1', passAA: true, passAAA: true },
    { label: 'Texto gris', foreground: '#757575', background: '#ffffff', ratio: '4.6:1', passAA: true, passAAA: false },
    { label: 'Gris claro', foreground: '#bdbdbd', background: '#ffffff', ratio: '2.4:1', passAA: false, passAAA: false },
    { label: 'Blanco/azul', foreground: '#ffffff', background: '#1a73e8', ratio: '6.7:1', passAA: true, passAAA: true },
    { label: 'Sobre fondo', foreground: '#1a1a2e', background: '#f5f5f5', ratio: '14.8:1', passAA: true, passAAA: true },
  ];
}
