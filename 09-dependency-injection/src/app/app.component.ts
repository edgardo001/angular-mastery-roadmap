/**
 * PROYECTO 09 — Dependency Injection
 *
 * Este componente demuestra el sistema de DI de Angular:
 * - inject(): obtener dependencias sin constructor
 * - InjectionToken: tokens para valores no-clase
 * - useValue: proveer un valor estático
 * - useFactory: crear un valor con lógica
 * - useClass: intercambiar implementaciones
 * - @Optional() / @Host(): modificadores de resolución
 * - runInInjectionContext: usar inject() fuera de componentes
 *
 * ANLOGÍA: DI es como un "restaurante automático":
 * - Tú (el componente) solo pides el plato (dependencia)
 * - No te importa COCINÓ la cocina (cómo se creó el servicio)
 * - Si quieres otro sabor, le dices al mesero (provider) que cambie
 */

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

      <!-- SECCIÓN 1: inject() + @Injectable() -->
      <section style="margin-bottom: 2rem;">
        <h2>1. inject() + &#64;Injectable()</h2>
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
            <li>{{ u.name }} — {{ u.email }}</li>
          }
        </ul>
      </section>

      <!-- SECCIÓN 2: InjectionToken con useValue -->
      <section style="margin-bottom: 2rem;">
        <h2>2. InjectionToken&lt;AppConfig&gt; — useValue</h2>
        <pre>{{ configString }}</pre>
      </section>

      <!-- SECCIÓN 3: useFactory con dependencias -->
      <section style="margin-bottom: 2rem;">
        <h2>3. useFactory con dependencias</h2>
        <blockquote style="background:#e9ecef;padding:.5rem 1rem;border-radius:6px;">{{ greeting }}</blockquote>
      </section>

      <!-- SECCIÓN 4: useClass — intercambiar implementaciones -->
      <section style="margin-bottom: 2rem;">
        <h2>4. useClass — Intercambiar implementación</h2>
        <p>Analytics activo: <strong>{{ analyticsMode }}</strong></p>
        <button (click)="toggleAnalytics()">Cambiar a {{ analyticsMode === 'ConsoleAnalytics' ? 'MockAnalytics' : 'ConsoleAnalytics' }}</button>
        <button (click)="trackEvent()" style="margin-left: .5rem;">Disparar track()</button>
      </section>

      <!-- SECCIÓN 5: @Optional() / @Host() -->
      <section style="margin-bottom: 2rem;">
        <h2>5. &#64;Optional() / &#64;Host()</h2>
        <p>{{ optionalMessage }}</p>
      </section>

      <!-- SECCIÓN 6: runInInjectionContext -->
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
  /**
   * inject() reemplaza al constructor DI.
   * Es como ir a una máquina expendedora y pedir el producto directamente.
   */
  private logger = inject(LoggerService);
  private userService = inject(UserService);
  private injector = inject(Injector);
  private consoleAnalytics = inject(ConsoleAnalyticsService);
  private mockAnalytics = inject(MockAnalyticsService);

  /**
   * inject(APP_CONFIG) obtiene el valor del InjectionToken APP_CONFIG.
   * Es como pedir una configuración específica al "restaurante".
   */
  config = inject(APP_CONFIG);

  /** GREETING viene de useFactory: se genera con lógica basada en config */
  greeting = inject(GREETING);

  /** Obtiene todos los usuarios del servicio */
  users = this.userService.getAll();

  /** JSON de la config para mostrar en pantalla */
  configString = JSON.stringify(this.config, null, 2);

  /** Modo actual de analytics (ConsoleAnalytics o MockAnalytics) */
  analyticsMode = 'ConsoleAnalytics';

  /** Servicio de analytics activo (se intercambia con toggle) */
  analyticsService: AnalyticsService;

  /** Mensaje de runInInjectionContext */
  contextMessage = '';

  /** Mensaje de @Optional */
  optionalMessage: string;

  /**
   * @Optional() + @Host() + @Inject(OPTIONAL_FEATURE):
   * - @Optional(): si OPTIONAL_FEATURE no existe, retorna null (no lanza error)
   * - @Host(): limita la búsqueda al inyector del componente actual
   * - @Inject(token): especifica qué InjectionToken inyectar
   *
   * ANLOGÍA: Es como pedir un plato que "puede que no exista en el menú".
   * Si no existe, el mesero te dice "no tenemos" en vez de lanzar un error.
   */
  constructor(
    @Optional() @Host() @Inject(OPTIONAL_FEATURE) optionalFeature: string | null,
  ) {
    this.optionalMessage = optionalFeature
      ? \`OPTIONAL_FEATURE encontrado: \${optionalFeature}\`
      : 'OPTIONAL_FEATURE no encontrado (demostración @Optional() + @Host())';
    this.analyticsService = this.consoleAnalytics;
  }

  /**
   * Alterna entre ConsoleAnalytics y MockAnalytics.
   * Demuestra cómo un mismo código puede usar diferentes implementaciones
   * simplemente cambiando el servicio.
   */
  toggleAnalytics(): void {
    const useMock = this.analyticsService === this.consoleAnalytics;
    this.analyticsService = useMock ? this.mockAnalytics : this.consoleAnalytics;
    this.analyticsMode = useMock ? 'MockAnalytics' : 'ConsoleAnalytics';
    this.analyticsService.track('analytics_toggle', { mode: this.analyticsMode });
  }

  /** Dispara un evento de analytics */
  trackEvent(): void {
    this.analyticsService.track('button_click', { button: 'track_event' });
  }

  /**
   * runInInjectionContext permite usar inject() DENTRO de un setTimeout,
   * Promise, o cualquier callback que esté "fuera" del contexto de Angular.
   *
   * ANLOGÍA: Es como llevar tu "tarjeta de restaurante" (Injector)
   * a otro lugar para poder seguir pidiendo platos.
   */
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
