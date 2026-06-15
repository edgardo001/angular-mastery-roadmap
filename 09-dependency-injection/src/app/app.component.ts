import { Component, inject, Inject, Injector, Optional, Host, runInInjectionContext } from '@angular/core';
import { APP_CONFIG, OPTIONAL_FEATURE } from './config';
import { GREETING } from './app.config';
import { LoggerService } from './services/logger.service';
import { UserService } from './services/user.service';
import { AnalyticsService, ConsoleAnalyticsService, MockAnalyticsService } from './services/analytics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div style="padding: 2rem; max-width: 900px; margin: 0 auto;">
      <h1 style="margin-bottom: 1rem;">Dependency Injection — Angular 22</h1>

      <section style="margin-bottom: 2rem;">
        <h2>1. inject() + @Injectable()</h2>
        <p><strong>LoggerService</strong> <code>(providedIn: 'root')</code></p>
        <ul>
          <li>Debug mode: <code>{{ config.debug }}</code></li>
          <li>info() escribe en console.log solo si debug=true</li>
          <li>warn() y error() siempre disponibles</li>
        </ul>
        <p><strong>UserService</strong> <code>(providedIn: 'platform')</code></p>
        <ul>
          <li>Usuarios cargados: {{ users.length }}</li>
          @for (u of users; track u.id) {
            <li>{{ u.name }} &mdash; {{ u.email }}</li>
          }
        </ul>
      </section>

      <section style="margin-bottom: 2rem;">
        <h2>2. InjectionToken&lt;AppConfig&gt; — useValue</h2>
        <pre>{{ configString }}</pre>
      </section>

      <section style="margin-bottom: 2rem;">
        <h2>3. useFactory con dependencias</h2>
        <blockquote style="background:#e9ecef;padding:.5rem 1rem;border-radius:6px;">{{ greeting }}</blockquote>
      </section>

      <section style="margin-bottom: 2rem;">
        <h2>4. useClass — Intercambiar implementación</h2>
        <p>Analytics activo: <strong>{{ analyticsMode }}</strong></p>
        <button (click)="toggleAnalytics()">Cambiar a {{ analyticsMode === 'ConsoleAnalytics' ? 'MockAnalytics' : 'ConsoleAnalytics' }}</button>
        <button (click)="trackEvent()" style="margin-left: .5rem;">Disparar track()</button>
      </section>

      <section style="margin-bottom: 2rem;">
        <h2>5. @Optional() / @Host()</h2>
        <p>{{ optionalMessage }}</p>
      </section>

      <section style="margin-bottom: 2rem;">
        <h2>6. runInInjectionContext</h2>
        <p>Ejecuta inject() dentro de setTimeout (sin contexto DI nativo).</p>
        <button (click)="testRunInContext()">Probar runInInjectionContext</button>
        <p style="font-size:.85rem;color:#666;">{{ contextMessage }}</p>
      </section>
    </div>
  `,
})
export class AppComponent {
  private logger = inject(LoggerService);
  private userService = inject(UserService);
  private injector = inject(Injector);
  private consoleAnalytics = inject(ConsoleAnalyticsService);
  private mockAnalytics = inject(MockAnalyticsService);

  config = inject(APP_CONFIG);
  greeting = inject(GREETING);
  users = this.userService.getAll();

  configString = JSON.stringify(this.config, null, 2);

  analyticsMode = 'ConsoleAnalytics';
  analyticsService: AnalyticsService;

  contextMessage = '';
  optionalMessage: string;

  constructor(
    @Optional() @Host() @Inject(OPTIONAL_FEATURE) optionalFeature: string | null,
  ) {
    this.optionalMessage = optionalFeature
      ? `OPTIONAL_FEATURE encontrado: ${optionalFeature}`
      : 'OPTIONAL_FEATURE no encontrado (demostración @Optional() + @Host())';
    this.analyticsService = this.consoleAnalytics;
  }

  toggleAnalytics(): void {
    const useMock = this.analyticsService === this.consoleAnalytics;
    this.analyticsService = useMock ? this.mockAnalytics : this.consoleAnalytics;
    this.analyticsMode = useMock ? 'MockAnalytics' : 'ConsoleAnalytics';
    this.analyticsService.track('analytics_toggle', { mode: this.analyticsMode });
  }

  trackEvent(): void {
    this.analyticsService.track('button_click', { button: 'track_event' });
  }

  testRunInContext(): void {
    this.contextMessage = 'Ejecutando setTimeout sin contexto DI... (revisa consola)';

    setTimeout(() => {
      runInInjectionContext(this.injector, () => {
        const logger = inject(LoggerService);
        logger.info('inject() funciona dentro de runInInjectionContext!');
        this.contextMessage = ' inject() ejecutado correctamente dentro de setTimeout (ver consola)';
      });
    }, 1000);
  }
}
