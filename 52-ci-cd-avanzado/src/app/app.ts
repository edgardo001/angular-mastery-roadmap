// ============================================================
// app.ts — Componente raíz de la aplicación
// ============================================================
// Un Componente es como una "pieza de LEGO": tiene su propio
// HTML (template), CSS (styles) y lógica TypeScript.
// En Angular 22+, los componentes son "standalone" (independientes),
// lo que significa que no necesitan un módulo NgModule para funcionar.

// @Component es un DECORADOR — una forma de decirle a Angular:
// "Esta clase es un componente, y estos son sus datos."
import { Component } from '@angular/core';

@Component({
  // selector: el nombre del tag HTML que usamos para este componente.
  // Es como un nombre personalizado: <app-root></app-root>
  selector: 'app-root',

  // standalone: true significa que este componente es independiente.
  // No necesita ser declarado en ningún módulo. Es como un mini-app autónoma.
  standalone: true,

  // template: el HTML del componente. Aquí definimos qué ve el usuario.
  // Este es un dashboard que muestra el estado de un pipeline CI/CD.
  template: `
    <main>
      <h1>CI/CD Pipeline Dashboard</h1>
      <section>
        <h2>Pipeline Status</h2>
        <ul>
          <li><span class="dot green"></span> Lint</li>
          <li><span class="dot green"></span> Test</li>
          <li><span class="dot green"></span> Build</li>
          <li><span class="dot yellow"></span> Deploy Dev</li>
          <li><span class="dot gray"></span> Deploy Staging</li>
          <li><span class="dot gray"></span> Deploy Production</li>
        </ul>
      </section>
      <section>
        <h2>Environments</h2>
        <div class="env-cards">
          <div class="card"><h3>Dev</h3><p>dev.example.com</p></div>
          <div class="card"><h3>Staging</h3><p>staging.example.com</p></div>
          <div class="card"><h3>Production</h3><p>example.com</p></div>
        </div>
      </section>
    </main>
  `,

  // styles: CSS que solo aplica a este componente (encapsulado).
  // No "escapa" a otros componentes, evitando conflictos de estilos.
  styles: [`
    main { max-width: 800px; margin: 2rem auto; padding: 1rem; }
    h1 { color: #1e40af; margin-bottom: 1.5rem; }
    h2 { margin: 1.5rem 0 0.75rem; color: #374151; }
    ul { list-style: none; display: flex; gap: 1.5rem; }
    li { display: flex; align-items: center; gap: 0.5rem; }
    .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
    .green { background: #22c55e; }
    .yellow { background: #eab308; }
    .gray { background: #9ca3af; }
    .env-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
    .card { background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .card h3 { color: #1e40af; margin-bottom: 0.25rem; }
  `]
})
// export class App {} — La clase del componente. Aquí iría la lógica.
// En este caso es un componente "tonto" (solo muestra HTML/CSS, sin lógica).
export class App {}
