import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Monorepo con Nx</h1>
    <p class="subtitle">Estructura de monorepositorio simulada con Angular + Nx</p>

    <div class="grid">
      <div class="card">
        <h2>apps/</h2>
        <p>Contiene las aplicaciones del monorepositorio. Cada app tiene su propio <code>main.ts</code>, enrutamiento y configuración.</p>
      </div>
      <div class="card">
        <h2>libs/</h2>
        <p>Librerías compartidas: componentes, servicios, utilidades. Se importan desde cualquier app del monorepo.</p>
      </div>
      <div class="card">
        <h2>nx.json</h2>
        <p>Configuración central de Nx: cache de tareas, dependencias entre proyectos, y runners de ejecución.</p>
      </div>
      <div class="card">
        <h2>Beneficios</h2>
        <p>Código compartido, builds incrementales, dependencias explícitas, affected commands y caching distribuido.</p>
      </div>
    </div>

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
