// ThemeComponent: componente que permite cambiar entre temas (claro, oscuro, azul)
// Angular CDK (Component Dev Kit) proporciona herramientas de bajo nivel para construir componentes
// Aquí usamos signals para manejar el estado del tema actual
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-switcher">
      <h3>Theme Switcher</h3>
      <div class="theme-options">
        <!-- Botón para tema claro: cambia data-theme a 'light' -->
        <button
          (click)="setTheme('light')"
          [class.active]="currentTheme() === 'light'"
          class="theme-btn light">
          Light
        </button>
        <!-- Botón para tema oscuro -->
        <button
          (click)="setTheme('dark')"
          [class.active]="currentTheme() === 'dark'"
          class="theme-btn dark">
          Dark
        </button>
        <!-- Botón para tema azul -->
        <button
          (click)="setTheme('blue')"
          [class.active]="currentTheme() === 'blue'"
          class="theme-btn blue">
          Blue
        </button>
      </div>
      <p class="current">Tema actual: <strong>{{ currentTheme() }}</strong></p>
    </div>
  `,
  styles: [`
    .theme-switcher { padding: 20px; background: var(--bg-primary, white); border-radius: 12px; }
    .theme-options { display: flex; gap: 10px; margin: 15px 0; }
    .theme-btn {
      padding: 12px 20px; border: 2px solid #ddd; border-radius: 8px;
      cursor: pointer; font-size: 14px; transition: all 0.2s;
    }
    .theme-btn:hover { border-color: #1a73e8; }
    .theme-btn.active { border-color: #1a73e8; background: #e3f2fd; }
    .theme-btn.light { background: #ffffff; }
    .theme-btn.dark { background: #1a1a2e; color: white; }
    .theme-btn.blue { background: #1565c0; color: white; }
    .current { color: #666; margin-top: 10px; }
  `],
})
export class ThemeComponent {
  // signal: crea un valor reactivo que notifica a los componentes cuando cambia
  // Aquí guardamos el tema actual (light, dark o blue)
  currentTheme = signal<'light' | 'dark' | 'blue'>('light');

  // Cambia el tema actualiza el atributo data-theme del elemento raíz
  // Los estilos CSS pueden usar [data-theme="dark"] para aplicar colores diferentes
  setTheme(theme: 'light' | 'dark' | 'blue') {
    this.currentTheme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}
