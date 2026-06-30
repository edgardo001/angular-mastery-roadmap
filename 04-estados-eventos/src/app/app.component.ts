/**
 * ============================================================
 * app.component.ts — Componente raíz de la aplicación
 * ============================================================
 *
 * Este es el "plato principal" del ejemplo. Demuestra cómo
 * Angular maneja el ESTADO (datos) y los EVENTOS (acciones
 * del usuario) usando Signals.
 *
 * Analogía: Un restaurante inteligente donde:
 *   - Un MENÚ DIGITAL (signals) muestra platos disponibles
 *   - Cuando el cliente pide algo (evento), el menú se actualiza
 *   - El chef (effect) reacciona automáticamente al nuevo pedido
 *   - La cuenta (computed) se recalcula solo
 *
 * Conceptos clave que aprenderás:
 *   - signal()    → Guardar datos que cambian
 *   - computed()  → Calcular valores derivados automáticamente
 *   - effect()    → Ejecutar código cuando cambia un signal
 *   - model()     → Two-way binding (sincronizar input con dato)
 *   - ngModel     → Directiva para two-way binding en templates
 */

// Component: Decorador que dice "esta clase es un componente Angular"
// signal: Crea una caja de datos reactiva que Angular observa
// computed: Crea un valor derivado que se recalcula automáticamente
// effect: Ejecuta código cuando cambia un signal que lee
// model: Crea un signal con two-way binding (para inputs)
import { Component, signal, computed, effect, model } from '@angular/core';

// FormsModule: Módulo que permite usar ngModel (two-way binding).
// Sin esto, no podrías escribir en un input y que se actualice
// la variable automáticamente. Es como un intérprete que traduce
// entre el input y el código.
import { FormsModule } from '@angular/forms';

// DatePipe: Pipe que formatea fechas.
// Convierte objetos Date a texto legible como "14:30:00".
import { DatePipe } from '@angular/common';

/**
 * LogEntry: Define qué datos tiene cada entrada del historial.
 * Es como un formulario de registro: tiene campos específicos.
 * "interface" NO crea código ejecutable, solo sirve para
 * que TypeScript verifique que usas los campos correctos.
 */
interface LogEntry {
  action: string;    // Qué pasó (texto descriptivo, ej: "Incremento")
  timestamp: Date;   // Cuándo pasó (objeto Date con fecha y hora)
}

/**
 * @Component() — Decorador que transforma una clase en componente.
 * Es como las instrucciones de un set de LEGO: dice qué piezas usar,
 * cómo pintar, y cómo se llama.
 */
@Component({
  // selector: Nombre HTML para usar este componente (<app-root>)
  selector: 'app-root',
  // standalone: true → Componente independiente (sin módulo NgModule)
  // Angular moderno (v17+) usa standalone por defecto
  standalone: true,
  // imports: Módulos que este componente necesita para funcionar
  // FormsModule → Para ngModel (two-way binding)
  // DatePipe    → Para formatear fechas en el template
  imports: [FormsModule, DatePipe],
  template: `
    <h1>Contador interactivo con Signals</h1>

    <!-- ============================================ -->
    <!-- SECCIÓN 1: Contador con Signals              -->
    <!-- ============================================ -->
    <!--
      {{ count() }} → Lee el valor del signal "count".
      Los paréntesis () son OBLIGATORIOS: signal() es una función.
      Un Signal es como una CAJA que guarda un valor; cuando cambias
      su contenido, Angular actualiza automáticamente la pantalla.
    -->
    <section>
      <h2>Contador: {{ count() }}</h2>
      <!-- (click)="increment()" → Cuando haces clic, llama a increment() -->
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
      <button (click)="reset()">Reset</button>

      <!-- parity() es un computed: se calcula AUTOMÁTICAMENTE cuando count() cambia -->
      <p>El número es <strong>{{ parity() }}</strong></p>

      <!-- @let es una variable local en el template (Angular 18+), como un "atajo" -->
      @let doubled = count() * 2;
      <p>El doble (&#64;let) es: <strong>{{ doubled }}</strong></p>
    </section>

    <!-- ============================================ -->
    <!-- SECCIÓN 2: Two-way Binding con ngModel       -->
    <!-- ============================================ -->
    <!--
      [(ngModel)]="message" → "banana in a box": sincroniza el input
      con la variable bidireccionalmente. El usuario escribe → la variable
      se actualiza; la variable cambia → el input muestra el nuevo valor.
    -->
    <section>
      <h3>Mensaje personalizado (two-way binding)</h3>
      <input [(ngModel)]="message" placeholder="Escribe algo..." />
      <p>Mensaje: <strong>{{ message() }}</strong></p>
    </section>

    <!-- ============================================ -->
    <!-- SECCIÓN 3: Eventos de teclado                -->
    <!-- ============================================ -->
    <!--
      (keydown) = Evento que se dispara al presionar una tecla.
      $event = Objeto con info del evento (qué tecla, shift, ctrl, etc.)
      #keyInput = "template reference variable" → Accede al elemento HTML.
    -->
    <section>
      <h3>Evento de teclado</h3>
      <input #keyInput placeholder="Presiona una tecla..."
        (keydown)="onKeydown($event, keyInput.value)" />
      <!-- @if = Directiva de control de flujo: solo muestra si hay valor -->
      @if (lastKey()) {
        <p>Última tecla presionada: <strong>{{ lastKey() }}</strong></p>
      }
    </section>

    <!-- ============================================ -->
    <!-- SECCIÓN 4: Historial de acciones             -->
    <!-- ============================================ -->
    <!--
      logs() es un signal con un ARRAY de objetos LogEntry.
      @for recorre el array; track entry.timestamp optimiza el rendimiento.
      date:'HH:mm:ss' es un Pipe que formatea la fecha a hora.
    -->
    <section>
      <h3>Historial de acciones</h3>
      @if (logs().length === 0) {
        <p>No hay acciones registradas.</p>
      }
      <ul>
        @for (entry of logs(); track entry.timestamp) {
          <li>{{ entry.timestamp | date:'HH:mm:ss' }} — {{ entry.action }}</li>
        }
      </ul>
    </section>
  `,
  // styles: CSS que solo aplica a ESTE componente (encapsulado).
  // Es como un uniforme: solo los de esta escuela lo usan.
  styles: [`
    section { margin: 1.5rem 0; padding: 1rem; background: #fff; border-radius: 8px; }
    button { margin-right: 0.5rem; padding: 0.4rem 1rem; font-size: 1.2rem; cursor: pointer; }
    input { padding: 0.4rem; font-size: 1rem; width: 250px; }
    ul { margin-top: 0.5rem; padding-left: 1.5rem; }
    li { margin: 0.25rem 0; }
    h2 { margin-bottom: 0.5rem; }
    h3 { margin-bottom: 0.5rem; }
  `]
})
/**
 * export class AppComponent — La clase del componente.
 * Contiene TODA la lógica: variables (signals), valores derivados
 * (computed), efectos secundarios (effect) y métodos para eventos.
 */
export class AppComponent {
  // ============================================================
  // PROPIEDADES — Las "variables" del componente
  // ============================================================

  // signal(0): Crea un signal con valor inicial 0.
  // Es como una caja encantada: guardas un valor y cuando lo
  // cambias, Angular actualiza la pantalla automáticamente.
  // Usa .set() para reemplazar, .update() para modificar.
  count = signal(0);

  // model('Hola Signals'): Crea un signal con two-way binding.
  // Se usa con [(ngModel)] en el template para sincronizar
  // el input con esta variable bidireccionalmente.
  message = model('Hola Signals');

  // signal(''): Guarda la última tecla presionada (string vacío al inicio)
  lastKey = signal('');

  // signal<LogEntry[]>([]): Signal que contiene un ARRAY de LogEntry.
  // El tipo <LogEntry[]> le dice a TypeScript qué estructura tiene cada objeto.
  // Inicia como array vacío [].
  logs = signal<LogEntry[]>([]);

  // ============================================================
  // COMPUTED — Valores derivados que se recalculan solos
  // ============================================================

  // computed(() => ...): Crea un valor que depende de otros signals.
  // Cada vez que count() cambia, se recalcula automáticamente.
  // Retorna 'par' si es divisible entre 2, 'impar' si no.
  // Es como una calculadora que siempre muestra el resultado actual.
  parity = computed(() => this.count() % 2 === 0 ? 'par' : 'impar');

  // ============================================================
  // EFFECT — Código que reacciona a cambios en signals
  // ============================================================

  // effect(() => { ... }): Se ejecuta cuando lee un signal que cambia.
  // Aquí lee this.count(), así que se ejecuta cada vez que count cambia.
  // Agrega un log al historial automáticamente.
  // Es como un chef que reacciona cuando cambia el pedido del cliente.
  private countEffect = effect(() => {
    const c = this.count();
    this.addLog(`[effect] Contador actualizado → ${c}`);
  });

  // ============================================================
  // MÉTODOS — Funciones que responden a eventos del usuario
  // ============================================================

  // increment(): Aumenta count en 1 y registra la acción.
  // .update(c => c + 1) usa el valor anterior para calcular el nuevo.
  increment() {
    this.count.update(c => c + 1);
    this.addLog('Incremento');
  }

  // decrement(): Reduce count en 1 y registra la acción.
  decrement() {
    this.count.update(c => c - 1);
    this.addLog('Decremento');
  }

  // reset(): Reestablece count a 0 y registra la acción.
  // .set(0) reemplaza el valor directamente (sin usar el anterior).
  reset() {
    this.count.set(0);
    this.addLog('Reset');
  }

  // onKeydown(): Se ejecuta al presionar una tecla.
  // event.key contiene el nombre de la tecla ('a', 'Enter', 'Shift', etc.)
  onKeydown(event: KeyboardEvent, inputValue: string) {
    this.lastKey.set(event.key);
    this.addLog(`Tecla presionada: ${event.key}`);
  }

  // ============================================================
  // MÉTODO PRIVADO — Agrega entradas al historial
  // ============================================================

  // addLog(): Agrega un nuevo objeto {action, timestamp} al array de logs.
  // .update() recibe el array anterior y retorna uno nuevo con el elemento
  // agregado al final usando spread operator [...array, nuevo].
  // Es como agregar una nueva línea al final de un cuaderno de bitácora.
  private addLog(action: string) {
    this.logs.update(entries => [...entries, { action, timestamp: new Date() }]);
  }
}
