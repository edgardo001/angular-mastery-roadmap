import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
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
export class App {}
