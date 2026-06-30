// Máquina de estados para un semáforo
// XState: librería que implementa máquinas de estados finitos
// Una máquina de estados define todos los estados posibles y las transiciones entre ellos
import { setup } from 'xstate';

// trafficLightMachine: define el comportamiento del semáforo
// setup() crea la máquina con tipos de eventos definidos
export const trafficLightMachine = setup({
  types: {
    // events: define los eventos que la máquina puede recibir
    // cada evento tiene un type que indica qué pasó
    events: {} as { type: 'TIMER' } | { type: 'EMERGENCY' } | { type: 'RESET' },
  },
}).createMachine({
  id: 'trafficLight', // Identificador único de la máquina
  initial: 'green', // Estado inicial cuando se crea la máquina
  
  // states: define todos los estados posibles del semáforo
  states: {
    // Estado VERDE: el semáforo está en verde
    green: {
      // on: define qué eventos puede recibir y a qué estado van
      on: { TIMER: 'yellow' }, // TIMER lo lleva a AMARILLO
    },
    // Estado AMARILLO
    yellow: {
      on: { TIMER: 'red' }, // TIMER lo lleva a ROJO
    },
    // Estado ROJO
    red: {
      on: { 
        TIMER: 'green', // TIMER lo lleva a VERDE (ciclo normal)
        EMERGENCY: 'flashingRed' // EMERGENCY lo lleva a ROJO PARPADEANTE
      },
    },
    // Estado ROJO PARPADEANTE (modo emergencia)
    flashingRed: {
      on: { RESET: 'red' }, // RESET lo lleva de vuelta a ROJO normal
    },
  },
});
