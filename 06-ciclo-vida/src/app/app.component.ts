/**
 * PROYECTO 06 — Ciclo de Vida y Efectos
 *
 * Este componente demuestra los HOOKS de ciclo de vida de Angular:
 * - ngOnInit: cuando el componente se inicializa
 * - ngAfterViewInit: cuando la vista está lista en el DOM
 * - ngOnDestroy: cuando el componente se destruye
 * - effect(): ejecuta código cuando una signal cambia
 * - afterNextRender: ejecuta una vez después del primer render
 * - afterRender: ejecuta después de cada render
 * - DestroyRef: limpieza moderna sin necesidad de OnDestroy
 *
 * ANLOGÍA: El ciclo de vida es como la vida de una persona:
 * - ngOnInit = nacimiento (inicialización)
 * - afterNextRender = primer paso (DOM listo)
 * - afterRender = cada paso que da (post-pintado)
 * - effect = reacciones automáticas al entorno
 * - ngOnDestroy = muerte (limpieza de recursos)
 */

import { Component, signal, computed, effect, afterNextRender, afterRender, DestroyRef, OnInit, AfterViewInit, OnDestroy, inject } from '@angular/core';

/**
 * @Component define un cronómetro que demuestra el ciclo de vida completo.
 * Cada hook se ejecuta en un momento específico de la "vida" del componente.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Cronometro - Ciclo de Vida y Efectos</h1>
    <p class="sub">
      ngOnInit | ngAfterViewInit | ngOnDestroy | effect() | afterNextRender | afterRender | DestroyRef
    </p>

    <!--
      #displayRef es una "template reference variable" — una referencia directa
      al elemento DOM. afterNextRender la usa para medir el ancho del display.
      Es como ponerle una etiqueta al elemento para encontrarlo después.
    -->
    <div class="display" #displayRef>{{ formattedTime() }}</div>

    <div class="controls">
      <!-- Botón que alterna entre iniciar/detener -->
      <button (click)="startStop()" class="btn primary">
        {{ running() ? 'Detener' : 'Iniciar' }}
      </button>
      <!-- Botón deshabilitado si no está corriendo -->
      <button (click)="lap()" [disabled]="!running()" class="btn">
        Vuelta
      </button>
      <button (click)="reset()" class="btn danger">
        Reiniciar
      </button>
    </div>

    <!-- @if/@else para mostrar estado actual -->
    <div class="status">
      @if (running()) {
        <span class="running">En ejecucion...</span>
      } @else {
        <span class="stopped">Detenido</span>
      }
    </div>

    <div class="info">
      <small>Abre la consola (F12) para ver los logs del ciclo de vida</small>
    </div>

    <!-- Lista de vueltas usando @for -->
    @if (laps().length > 0) {
      <div class="laps">
        <h3>Vueltas ({{ laps().length }})</h3>
        @for (lap of laps(); track $index; let i = $index) {
          <div class="lap-item" [class.even]="$even">
            <span class="lap-num">Vuelta {{ i + 1 }}</span>
            <span class="lap-time">{{ lap }}</span>
          </div>
        }
      </div>
    }
  `,
  styles: [`
    h1 { text-align: center; margin-bottom: .25rem; }
    .sub { text-align: center; color: #666; margin-bottom: 2rem; font-size: .8rem; letter-spacing: .02em; }

    /* Display grande como un reloj digital */
    .display { font-size: 4rem; font-weight: 700; text-align: center; font-variant-numeric: tabular-nums; color: #1a1a2e; background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,.08); margin-bottom: 1.5rem; letter-spacing: .05em; }
    .controls { display: flex; justify-content: center; gap: .75rem; margin-bottom: 1rem; }
    .btn { padding: .6rem 1.5rem; border: none; border-radius: 8px; font-size: .95rem; cursor: pointer; background: #e8e8e8; color: #333; transition: background .15s; }
    .btn:hover:not(:disabled) { filter: brightness(.92); }
    .btn:disabled { opacity: .4; cursor: not-allowed; }
    .btn.primary { background: #667eea; color: white; }
    .btn.danger { background: #e74c3c; color: white; }
    .status { text-align: center; margin-bottom: 1rem; font-size: .85rem; }
    .running { color: #27ae60; font-weight: 600; }
    .stopped { color: #999; }
    .info { text-align: center; margin-bottom: 2rem; }
    .info small { color: #aaa; font-style: italic; }
    .laps { background: white; border-radius: 12px; padding: 1.25rem; box-shadow: 0 1px 6px rgba(0,0,0,.06); }
    .laps h3 { font-size: 1rem; margin-bottom: .75rem; color: #667eea; }
    .lap-item { display: flex; justify-content: space-between; padding: .5rem .75rem; border-radius: 6px; font-size: .9rem; }
    .lap-item.even { background: #f8f9ff; }
    .lap-num { color: #666; }
    .lap-time { font-weight: 600; font-variant-numeric: tabular-nums; }
  `]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  /** Tiempo transcurrido en segundos */
  readonly elapsed = signal<number>(0);

  /** Si el cronómetro está corriendo */
  readonly running = signal<boolean>(false);

  /** Array de tiempos de vueltas */
  readonly laps = signal<string[]>([]);

  /** Contador de renders (para afterRender) */
  private renderCounter = 0;

  /** ID del interval para poder cancelarlo */
  private intervalId: ReturnType<typeof setInterval> | null = null;

  /**
   * computed() crea una SIGNAL DERIVADA — su valor depende de otras signals.
   * Cada vez que elapsed() cambia, formattedTime() se recalcula automáticamente.
   *
   * ANLOGÍA: Es como una calculadora que se actualiza sola cuando cambias
   * el número de entrada. No necesitas presionar "=" — lo hace solo.
   */
  readonly formattedTime = computed(() => {
    const total = this.elapsed();
    const min = Math.floor(total / 60);
    const sec = total % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  });

  /**
   * El CONSTRUCTOR es el primer lugar donde puedes usar effect(), afterNextRender(),
   * afterRender(), e inject(). Esto es porque el constructor se ejecuta
   * ANTES de que Angular haya pintado algo en el DOM.
   *
   * ANLOGÍA: Es como preparar tu equipo ANTES de salir a correr.
   */
  constructor() {
    /**
     * effect() se ejecuta CADA VEZ que una signal que usa cambia.
     * Aquí, cada vez que elapsed() cambia, se loguea en consola.
     *
     * IMPORTANTE: effect() NO debe usarse para lógica asíncrona.
     * Para eso usa afterNextRender() o RxJS.
     */
    effect(() => {
      console.log('[effect] Elapsed seconds:', this.elapsed());
    });

    /**
     * afterNextRender() se ejecuta UNA SOLA VEZ después del primer render.
     * Es seguro acceder al DOM aquí porque ya existe.
     *
     * ANLOGÍA: Es como verificar que la mesa está lista después de
     * que el camarero la puso.
     */
    afterNextRender(() => {
      console.log('[afterNextRender] First render completed - DOM ready');
    });

    /**
     * afterRender() se ejecuta DESPUÉS DE CADA render.
     * Útil para medir performance o ejecutar lógica post-pintado.
     */
    afterRender(() => {
      this.renderCounter++;
      console.log('[afterRender] Render cycle #' + this.renderCounter);
    });

    /**
     * inject(DestroyRef) obtiene una referencia al "punto de destrucción" del componente.
     * onDestroy() registra una función que se ejecuta cuando el componente muere.
     *
     * Es la forma MODERNA de limpiar recursos (alternativa a ngOnDestroy).
     *
     * ANLOGÍA: Es como dejar una nota que dice "cuando me vaya, apaga la luz".
     */
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => {
      console.log('[DestroyRef] Cleanup via DestroyRef.onDestroy()');
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    });
  }

  /**
   * ngOnInit() se ejecuta DESPUÉS del primer cambio de detección.
   * Es el lugar más común para cargar datos iniciales.
   *
   * Secuencia: constructor → ngOnInit → ngAfterViewInit
   */
  ngOnInit() {
    console.log('[ngOnInit] Stopwatch initialized');
  }

  /**
   * ngAfterViewInit() se ejecuta cuando la vista (template) está lista.
   * Aquí puedes acceder a @ViewChild, template refs, etc.
   */
  ngAfterViewInit() {
    console.log('[ngAfterViewInit] View ready');
  }

  /**
   * ngOnDestroy() se ejecuta cuando el componente se destruye.
   * SIEMPRE limpia intervals, suscripciones, event listeners aquí.
   *
   * Si no limpias, el interval seguirá corriendo en memoria = MEMORY LEAK.
   *
   * ANLOGÍA: Es como cerrar la llave de gas cuando te mudas.
   */
  ngOnDestroy() {
    console.log('[ngOnDestroy] Component destroyed');
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Alterna entre iniciar y detener el cronómetro.
   */
  startStop() {
    if (this.running()) {
      this.stop();
    } else {
      this.start();
    }
  }

  /**
   * Inicia el cronómetro: pone running=true y crea un interval cada 1 segundo.
   * Cada segundo, elapsed se incrementa en 1.
   */
  private start() {
    this.running.set(true);
    this.intervalId = setInterval(() => {
      this.elapsed.update(v => v + 1);
    }, 1000);
  }

  /**
   * Detiene el cronómetro y cancela el interval.
   */
  private stop() {
    this.running.set(false);
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Registra una vuelta: captura el tiempo actual y lo agrega al array.
   */
  lap() {
    if (this.running()) {
      this.laps.update(l => [...l, this.formattedTime()]);
    }
  }

  /**
   * Reinicia todo: detiene, limpia tiempo y vueltas.
   */
  reset() {
    this.stop();
    this.elapsed.set(0);
    this.laps.set([]);
  }
}
