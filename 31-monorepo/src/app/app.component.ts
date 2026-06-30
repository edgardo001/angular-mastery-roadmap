// =============================================================================
// ARCHIVO: app.component.ts
// PROPÓSITO: Componente raíz que visualiza la estructura de un monorepo
// =============================================================================
//
// Este componente muestra una representación visual de la estructura
// típica de un monorepositorio con Angular + Nx.
//
// ¿Qué es Nx?
// Nx es una herramienta de gestión de monorepos que agrega:
// - Caché de builds (no recompila lo que no cambió)
// - Dependencias explícitas entre proyectos
// - Comandos affected (solo ejecuta lo que cambió)
// - Generators (crea nuevos componentes/libs automáticamente)
//
// Es como un gerente de edificio que sabe exactamente:
// - Qué apartamentos están ocupados (apps)
// - Qué amenidades son compartidas (libs)
// - Quién es vecino de quién (dependencias)
// - Cuánto tarda cada mantenimiento (caché)
// =============================================================================

// Component: Decorador de Angular que define un componente
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,

  template: `
    <h1>Monorepo con Nx</h1>
    <p class="subtitle">Estructura de monorepositorio simulada con Angular + Nx</p>

    <!--
      GRID DE TARJETAS: Muestra los conceptos clave de un monorepo.
      Cada tarjeta explica una parte de la estructura.
    -->
    <div class="grid">
      <!--
        TARJETA 1: apps/
        Contiene las aplicaciones independientes del monorepo.
        Cada app tiene su propio main.ts, rutas y configuración.
        
        Ejemplo real: Una empresa tiene:
        - apps/web-app → Sitio web principal
        - apps/admin-app → Panel de administración
        - apps/mobile-app → App móvil ( Ionic/Capacitor)
      -->
      <div class="card">
        <h2>apps/</h2>
        <p>Contiene las aplicaciones del monorepositorio. Cada app tiene su propio <code>main.ts</code>, enrutamiento y configuración.</p>
      </div>

      <!--
        TARJETA 2: libs/
        Librerías compartidas entre todas las apps.
        Aquí van componentes, servicios, utilidades y modelos.
        
        Ejemplo real:
        - libs/shared/ui → Componentes de UI (botones, cards, modals)
        - libs/shared/utils → Funciones utilitarias (fechas, validaciones)
        - libs/shared/data-models → Interfaces y tipos TypeScript
        - libs/feature-auth → Servicio de autenticación compartido
      -->
      <div class="card">
        <h2>libs/</h2>
        <p>Librerías compartidas: componentes, servicios, utilidades. Se importan desde cualquier app del monorepo.</p>
      </div>

      <!--
        TARJETA 3: nx.json
        Configuración central de Nx. Define:
        - Qué tareas se cachean (build, test, lint)
        - Qué proyectos dependen de otros
        - Qué runners usar para ejecutar tareas
        
        Es como el "plano maestro" del edificio: todo está documentado aquí.
      -->
      <div class="card">
        <h2>nx.json</h2>
        <p>Configuración central de Nx: cache de tareas, dependencias entre proyectos, y runners de ejecución.</p>
      </div>

      <!--
        TARJETA 4: Beneficios
        Las ventajas de usar un monorepo con Nx:
        
        1. Código compartido: No duplicas lógica entre apps
        2. Builds incrementales: Solo recompila lo que cambió
        3. Dependencias explícitas: Sabes qué depende de qué
        4. Affected commands: Ejecuta tests/lint solo en lo que cambió
        5. Caching distribuido: Build una vez, reutiliza en CI/CD
      -->
      <div class="card">
        <h2>Beneficios</h2>
        <p>Código compartido, builds incrementales, dependencias explícitas, affected commands y caching distribuido.</p>
      </div>
    </div>

    <!--
      ÁRBOL DE ESTRUCTURA: Muestra visualmente cómo se organizan los archivos.
      Es como un mapa del edificio que muestra dónde está cada habitación.
    -->
    <pre class="tree">{{ tree }}</pre>
  `,

  styles: [`
    h1 { text-align: center; margin-bottom: .25rem; }
    .subtitle { text-align: center; color: #666; margin-bottom: 2rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; max-width: 960px; margin: 0 auto 2rem; }
    .card { background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 1.25rem; box-shadow: 0 2px 4px rgba(0,0,0,.06); }
    .card h2 { margin-bottom: .5rem; font-size: 1.1rem; color: #1a73e8; }
    .card p { font-size: .875rem; color: #444; line-height: 1.6; }
    code { background: #e8e8e8; padding: .125rem .375rem; border-radius: 4px; font-size: .8rem; }
    .tree { background: #1e1e2e; color: #cdd6f4; padding: 1.5rem; border-radius: 8px; font-size: .8rem; max-width: 960px; margin: 0 auto; overflow-x: auto; }
  `]
})
export class AppComponent {
  // readonly: Propiedad de solo lectura que no se puede modificar después
  // de la inicialización. Contiene el árbol de directorios como string.
  //
  // template literal (backticks ```) permite strings multilínea.
  // .trim() elimina espacios en blanco al inicio y final del string.
  //
  // Esta estructura es EJEMPLO de un monorepo real con Nx.
  // Un monorepo verdadero tendría más carpetas y archivos.
  readonly tree = `
monorepo/
├── nx.json
├── angular.json
├── package.json
├── apps/
│   ├── my-app/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── main.ts
│   │   │   └── index.html
│   │   ├── tsconfig.json
│   │   └── project.json
│   └── README.md
├── libs/
│   ├── shared/
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── button/
│   │   │   │   └── card/
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── project.json
│   └── README.md
└── tools/
    ├── generators/
    └── scripts/
`.trim();
}
