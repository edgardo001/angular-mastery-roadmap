import { Component, signal, computed, effect, afterNextRender, afterEveryRender, DestroyRef, OnInit, AfterViewInit, OnDestroy, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Cronometro - Ciclo de Vida y Efectos</h1>
    <p class="sub">
      ngOnInit | ngAfterViewInit | ngOnDestroy | effect() | afterNextRender | afterEveryRender | DestroyRef
    </p>

    <div class="display" #displayRef>{{ formattedTime() }}</div>

    <div class="controls">
      <button (click)="startStop()" class="btn primary">
        {{ running() ? 'Detener' : 'Iniciar' }}
      </button>
      <button (click)="lap()" [disabled]="!running()" class="btn">
        Vuelta
      </button>
      <button (click)="reset()" class="btn danger">
        Reiniciar
      </button>
    </div>

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
  readonly elapsed = signal<number>(0);
  readonly running = signal<boolean>(false);
  readonly laps = signal<string[]>([]);
  private renderCounter = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  readonly formattedTime = computed(() => {
    const total = this.elapsed();
    const min = Math.floor(total / 60);
    const sec = total % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  });

  constructor() {
    effect(() => {
      console.log('[effect] Elapsed seconds:', this.elapsed());
    });

    afterNextRender(() => {
      console.log('[afterNextRender] First render completed - DOM ready');
    });

    afterEveryRender(() => {
      this.renderCounter++;
      console.log('[afterEveryRender] Render cycle #' + this.renderCounter);
    });

    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => {
      console.log('[DestroyRef] Cleanup via DestroyRef.onDestroy()');
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    });
  }

  ngOnInit() {
    console.log('[ngOnInit] Stopwatch initialized');
  }

  ngAfterViewInit() {
    console.log('[ngAfterViewInit] View ready');
  }

  ngOnDestroy() {
    console.log('[ngOnDestroy] Component destroyed');
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  startStop() {
    if (this.running()) {
      this.stop();
    } else {
      this.start();
    }
  }

  private start() {
    this.running.set(true);
    this.intervalId = setInterval(() => {
      this.elapsed.update(v => v + 1);
    }, 1000);
  }

  private stop() {
    this.running.set(false);
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  lap() {
    if (this.running()) {
      this.laps.update(l => [...l, this.formattedTime()]);
    }
  }

  reset() {
    this.stop();
    this.elapsed.set(0);
    this.laps.set([]);
  }
}
