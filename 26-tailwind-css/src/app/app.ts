// =============================================================================
// ARCHIVO: app.ts
// PROPÓSITO: Componente raíz que demuestra Tailwind CSS con Angular signals
// =============================================================================
//
// Este componente muestra un diseño completo con:
// - Dark mode (modo oscuro) usando signals de Angular
// - Layout responsive con CSS Grid de Tailwind
// - Transiciones suaves entre temas
// - Tarjetas de características con hover effects
//
// ¿Qué es Tailwind CSS?
// Es un framework CSS "utility-first": en lugar de escribir clases como
// .card o .button, usas clases predefinidas como "rounded-xl shadow-md".
// Es como tener una caja de herramientas con todo listo para usar.
// =============================================================================

// Component: Decorador que define este como un componente Angular
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,

  // imports vacío: este componente no necesita otros componentes Angular.
  // Solo usa clases de Tailwind CSS en su template.
  imports: [],

  template: `
    <!-- 
      [class.dark]="darkMode()" es un binding de clase DINÁMICO.
      Cuando darkMode() es true, se agrega la clase CSS "dark" al div.
      Tailwind usa la convención "dark:" para estilos del modo oscuro.
      
      Clases de Tailwind usadas:
      - min-h-screen: altura mínima = 100vh (pantalla completa)
      - bg-gray-50 / dark:bg-gray-900: fondo claro / oscuro
      - transition-colors: transición suave al cambiar colores
    -->
    <div [class.dark]="darkMode()" class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      <!-- HEADER: Barra superior con título y botón de tema -->
      <header class="bg-white dark:bg-gray-800 shadow-sm">
        <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Tailwind CSS</h1>
          
          <!-- 
            Botón que alterna el modo oscuro.
            (click)="toggleDark()" escucha el click y ejecuta el método.
            Las clases condicionales usan la misma sintaxis: dark: para modo oscuro.
          -->
          <button (click)="toggleDark()"
            class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            {{ darkMode() ? '☀️ Light' : '🌙 Dark' }}
          </button>
        </div>
      </header>

      <!-- CONTENIDO PRINCIPAL -->
      <main class="max-w-6xl mx-auto px-4 py-8">
        
        <!-- 
          GRID RESPONSIVE: Una de las mayores ventajas de Tailwind.
          - grid-cols-1: 1 columna en móvil
          - md:grid-cols-2: 2 columnas en tablets (≥768px)
          - lg:grid-cols-3: 3 columnas en desktop (≥1024px)
          - gap-6: espacio entre tarjetas
          
          Es como un organizador de cajones que se adapta al tamaño del mueble.
        -->
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- @for: Nuevo control flow de Angular que reemplaza *ngFor -->
          <!-- track item.title: Angular usa el título para identificar cada elemento -->
          @for (item of features; track item.title) {
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div class="text-3xl mb-3">{{ item.icon }}</div>
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">{{ item.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm">{{ item.desc }}</p>
            </div>
          }
        </section>

        <!-- SECCIÓN CON GRADIENTE -->
        <!-- bg-gradient-to-r: Gradiente de izquierda a derecha -->
        <!-- from-blue-500 to-purple-600: Colores del gradiente -->
        <section class="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h2 class="text-3xl font-bold mb-4">Responsive & Modern</h2>
          <p class="text-blue-100 mb-6 max-w-2xl">This layout adapts from mobile to desktop using Tailwind responsive utilities. Grid columns change automatically.</p>
          <!-- 
            Chips/badges con opacidad:
            bg-white/20 = blanco al 20% de opacidad
            rounded-full = bordes completamente redondos (forma de pastilla)
          -->
          <div class="flex flex-wrap gap-3">
            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">Flexbox</span>
            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">Grid</span>
            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">Dark Mode</span>
            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">Signals</span>
          </div>
        </section>

        <!-- FOOTER -->
        <footer class="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; 2026 Tailwind CSS Angular Demo</p>
        </footer>
      </main>
    </div>
  `
})
export class App {
  // signal(): Crea una señal reactiva de Angular.
  // Es como una variable inteligente: cuando cambia, Angular actualiza
  // automáticamente todas las partes del template que la usan.
  //
  // darkMode() → lee el valor (como una variable normal)
  // darkMode.set(true) → cambia el valor directamente
  // darkMode.update(fn) → cambia el valor basándose en el anterior
  //
  // Aquí inicializamos en false (modo claro por defecto)
  darkMode = signal(false);

  // Array de características para mostrar en las tarjetas.
  // En una app real, esto podría venir de una API.
  features = [
    { icon: '🎨', title: 'Dark Mode', desc: 'Toggle con signals, persistido via clase en root.' },
    { icon: '📱', title: 'Responsive', desc: 'Grid adapta de 1 a 2 a 3 columnas entre breakpoints.' },
    { icon: '⚡', title: 'Signals', desc: 'Estado del dark mode manejado con signals de Angular.' },
    { icon: '🎯', title: 'Utility First', desc: 'Todo el estilo usa clases de utilidad de Tailwind.' },
    { icon: '🌗', title: 'Theme Toggle', desc: 'Transición suave entre temas claro y oscuro.' },
    { icon: '🧩', title: 'Modular', desc: 'Arquitectura limpia de componentes con APIs standalone.' }
  ];

  // Método que alterna el estado del modo oscuro.
  // update() recibe una función que toma el valor anterior y retorna el nuevo.
  // Es como un interruptor de luz: si estaba encendido, lo apaga, y viceversa.
  toggleDark() {
    this.darkMode.update(v => !v);
  }
}
