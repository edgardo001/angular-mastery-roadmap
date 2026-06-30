/**
 * STORE DE TEMA (ThemeStore)
 * ===========================
 *
 * Gestiona el estado del tema (modo oscuro/claro) usando NgRx Signals Store.
 * NgRx Signals Store es una forma moderna de manejar estado global en Angular.
 *
 * ANÁLOGÍA: Es como un interruptor de luz inteligente que:
 * - Recuerda si la luz estaba encendida o apagada
 * - Se syncroniza con la preferencia del sistema operativo
 * - Guarda la preferencia para la próxima vez
 *
 * PALABRAS CLAVE:
 * - signalStore: Crea un "store" (almacén) de estado reactiva
 * - withState: Define el estado inicial del store
 * - withMethods: Agrega métodos para modificar el estado
 * - withHooks: Hooks que se ejecutan al inicializar/destruir el store
 * - patchState: Actualiza parcialmente el estado (sin reemplazar todo)
 * - effect: Crea un "efecto" que se ejecuta cuando cambian signals
 * - inject(DOCUMENT): Accede al documento HTML del navegador
 *
 * FLUJO:
 * 1. El store se inicializa con el valor guardado en localStorage
 * 2. Si no hay valor, usa la preferencia del sistema operativo
 * 3. Cuando cambia el tema, se actualiza localStorage y el DOM
 */

// Herramientas de NgRx Signals Store
// signalStore: Crea un store de estado
// withState: Define el estado inicial
// withMethods: Agrega métodos para modificar el estado
// withHooks: Hooks de inicialización
// patchState: Actualiza el estado parcialmente
import { signalStore, withState, withMethods, withHooks, patchState } from '@ngrx/signals';

// effect: Crea un efecto reactivo que se ejecuta cuando cambian signals
// inject: Obtiene servicios
import { effect, inject } from '@angular/core';

// DOCUMENT: Token de inyección para acceder al documento HTML
import { DOCUMENT } from '@angular/common';

// Interfaz que define la forma del estado del tema
interface ThemeState {
  darkMode: boolean; // true = modo oscuro, false = modo claro
}

// Clave para guardar la preferencia en localStorage
const THEME_KEY = 'ngrx-theme';

// signalStore: Crea un store de estado global
export const ThemeStore = signalStore(
  // providedIn: 'root': Disponible en toda la aplicación (singleton)
  { providedIn: 'root' },

  // withState: Define el estado inicial del store
  // darkMode: false = modo claro por defecto
  withState<ThemeState>({
    darkMode: false,
  }),

  // withMethods: Agrega métodos para modificar el estado
  // (store) => {}: Recibe el store para acceder a su estado
  withMethods((store) => ({
    // toggle(): Cambia entre modo oscuro y claro
    toggle() {
      // patchState: Actualiza solo la propiedad darkMode
      // !store.darkMode(): Niega el valor actual (true → false, false → true)
      patchState(store, { darkMode: !store.darkMode() });
    },
  })),

  // withHooks: Hooks que se ejecutan al inicializar el store
  withHooks({
    // onInit: Se ejecuta UNA VEZ cuando el store se crea
    onInit(store) {
      // inject(DOCUMENT): Accede al documento HTML del navegador
      const doc = inject(DOCUMENT);
      // Obtiene la preferencia guardada del localStorage
      const saved = localStorage.getItem(THEME_KEY);
      // Verifica si el sistema operativo prefiere modo oscuro
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // Usa la preferencia guardada, o la del sistema si no hay nada guardado
      const darkMode = saved !== null ? saved === 'true' : prefersDark;
      // Inicializa el store con el valor correcto
      patchState(store, { darkMode });

      // effect(): Crea un efecto reactivo que se ejecuta cuando cambia darkMode
      // Cada vez que store.darkMode() cambia, este efecto se ejecuta
      effect(() => {
        // toggle('dark'): Agrega/quita la clase 'dark' al body del documento
        // Si darkMode es true, agrega la clase. Si es false, la quita.
        doc.body.classList.toggle('dark', store.darkMode());
        // Guarda la preferencia en localStorage para la próxima visita
        localStorage.setItem(THEME_KEY, String(store.darkMode()));
      });
    },
  })
);
