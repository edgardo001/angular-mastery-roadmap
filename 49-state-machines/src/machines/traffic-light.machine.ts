// Máquina de estados para un semáforo
// XState: librería que implementa máquinas de estados finitos
// Una máquina de estados define todos los estados posibles y las transiciones entre ellos
import { setup, assign } from 'xstate';

// trafficLightMachine: define el comportamiento del semáforo
// setup() crea la máquina con tipos de eventos definidos
// En XState v5, setup() reemplaza a createMachine() directamente
export const trafficLightMachine = setup({
  // types: define los tipos TypeScript para la máquina
  // Esto permite autocompletado y detección de errores en tiempo de compilación
  types: {
    // context: datos que la máquina guarda y puede modificar
    // Es como la "memoria" de la máquina
    context: {} as {
      countdown: number;      // Cuenta regresiva en cada estado
      cycleCount: number;     // Cuántas veces ha completado el ciclo completo
      maxCycles: number;      // Ciclos máximos antes de bloquear transición a verde
      log: string[];          // Registro de cambios de estado (para debugging)
    },
    // events: define los eventos que la máquina puede recibir
    // cada evento tiene un type que indica qué pasó
    events: {} as
      | { type: 'TIMER' }     // Temporizador: avanza al siguiente color
      | { type: 'EMERGENCY' } // Emergencia: activa modo rojo parpadeante
      | { type: 'RESET' },    // Reset: vuelve al estado normal
  },

  // guards: condiciones que deben cumplirse para que una transición ocurra
  // Un guard es como un guardia de seguridad: solo deja pasar si se cumple la condición
  guards: {
    // canChangeLight: solo permite cambiar de luz si la cuenta regresiva llegó a 0
    canChangeLight: ({ context }) => context.countdown <= 0,

    // canGoGreen: solo permite ir a verde si no se alcanzó el máximo de ciclos
    canGoGreen: ({ context }) => context.cycleCount < context.maxCycles,

    // isInEmergency: verifica si estamos en emergencia (para la condición del botón)
    // En este caso, el guard ya está implícito en la transición, pero lo mostramos
    // como ejemplo de cómo se podría usar en otros contextos
    isInEmergency: () => false, // Placeholder: en producción, verificaría el estado actual
  },
}).createMachine({
  id: 'trafficLight', // Identificador único de la máquina
  initial: 'green', // Estado inicial cuando se crea la máquina

  // context: datos iniciales de la máquina
  // Es como el "estado inicial" de los datos (no confundir con el estado de la máquina)
  context: {
    countdown: 5,        // 5 segundos antes de cambiar
    cycleCount: 0,       // Empieza en 0 ciclos completados
    maxCycles: 3,        // Máximo 3 ciclos antes de bloquear verde
    log: [],             // Log vacío al inicio
  },

  // states: define todos los estados posibles del semáforo
  states: {
    // Estado VERDE: el semáforo está en verde
    green: {
      // entry: acciones que se ejecutan AL ENTRAR al estado
      // Es como "encender la luz verde" cuando llegas a este estado
      entry: [
        // assign(): función de XState que modifica el context
        // Es como un setter: actualiza datos sin mutar el original
        assign({
          countdown: 5, // Reinicia cuenta regresiva a 5 segundos
          // spread operator (...) copia el array anterior y agrega el nuevo mensaje
          log: ({ context }) => [...context.log, '🟢 Entrando a verde'],
        }),
      ],

      // exit: acciones que se ejecutan AL SALIR del estado
      // Es como "apagar la luz verde" cuando te vas de este estado
      exit: [
        assign({
          log: ({ context }) => [...context.log, '🟢 Saliendo de verde'],
        }),
      ],

      // on: define qué eventos puede recibir y a qué estado van
      on: {
        TIMER: {
          // target: hacia dónde va la transición
          target: 'yellow',
          // guard: condición que debe cumplirse para que la transición ocurra
          // canChangeLight: solo cambia si la cuenta regresiva llegó a 0
          guard: 'canChangeLight',
          // actions: qué hacer cuando la transición ocurre
          // assign() modifica el context durante la transición
          actions: assign({
            cycleCount: ({ context }) => context.cycleCount + 1, // Incrementa ciclos
            log: ({ context }) => [...context.log, '🟢 TIMER → amarillo'],
          }),
        },
      },
    },

    // Estado AMARILLO
    yellow: {
      entry: [
        assign({
          countdown: 2, // Amarillo dura solo 2 segundos
          log: ({ context }) => [...context.log, '🟡 Entrando a amarillo'],
        }),
      ],
      exit: [
        assign({
          log: ({ context }) => [...context.log, '🟡 Saliendo de amarillo'],
        }),
      ],
      on: {
        TIMER: {
          target: 'red',
          guard: 'canChangeLight',
          actions: assign({
            log: ({ context }) => [...context.log, '🟡 TIMER → rojo'],
          }),
        },
      },
    },

    // Estado ROJO
    red: {
      entry: [
        assign({
          countdown: 5, // Rojo dura 5 segundos
          log: ({ context }) => [...context.log, '🔴 Entrando a rojo'],
        }),
      ],
      exit: [
        assign({
          log: ({ context }) => [...context.log, '🔴 Saliendo de rojo'],
        }),
      ],
      on: {
        TIMER: {
          // guard: canGoGreen verifica que no se haya alcanzado el máximo de ciclos
          target: 'green',
          guard: 'canGoGreen', // Solo vuelve a verde si quedan ciclos
          actions: assign({
            log: ({ context }) => [...context.log, '🔴 TIMER → verde'],
          }),
        },
        // EMERGENCY: lleva a rojo parpadeante (sin guard, siempre disponible)
        EMERGENCY: {
          target: 'flashingRed',
          actions: assign({
            log: ({ context }) => [...context.log, '🔴 EMERGENCY → rojo parpadeante'],
          }),
        },
      },
    },

    // Estado ROJO PARPADEANTE (modo emergencia)
    flashingRed: {
      entry: [
        assign({
          countdown: 0, // Sin cuenta regresiva en emergencia
          log: ({ context }) => [...context.log, '🚨 Entrando a modo emergencia'],
        }),
      ],
      exit: [
        assign({
          log: ({ context }) => [...context.log, '🚨 Saliendo de modo emergencia'],
        }),
      ],
      on: {
        RESET: {
          target: 'red',
          // actions: ejecutar código al transicionar
          actions: assign({
            cycleCount: 0, // Reinicia el contador de ciclos al resetear
            log: ({ context }) => [...context.log, '🚨 RESET → rojo normal'],
          }),
        },
      },
    },
  },
});
