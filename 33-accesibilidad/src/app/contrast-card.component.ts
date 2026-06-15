import { Component } from '@angular/core';

interface ContrastPair {
  label: string;
  foreground: string;
  background: string;
  ratio: string;
  passAA: boolean;
  passAAA: boolean;
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
  readonly pairs: ContrastPair[] = [
    { label: 'Texto normal', foreground: '#1a1a2e', background: '#ffffff', ratio: '16.5:1', passAA: true, passAAA: true },
    { label: 'Texto gris', foreground: '#757575', background: '#ffffff', ratio: '4.6:1', passAA: true, passAAA: false },
    { label: 'Gris claro', foreground: '#bdbdbd', background: '#ffffff', ratio: '2.4:1', passAA: false, passAAA: false },
    { label: 'Blanco/azul', foreground: '#ffffff', background: '#1a73e8', ratio: '6.7:1', passAA: true, passAAA: true },
    { label: 'Sobre fondo', foreground: '#1a1a2e', background: '#f5f5f5', ratio: '14.8:1', passAA: true, passAAA: true },
  ];
}
