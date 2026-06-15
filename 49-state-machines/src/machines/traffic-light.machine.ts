import { setup } from 'xstate';

export const trafficLightMachine = setup({
  types: {
    events: {} as { type: 'TIMER' } | { type: 'EMERGENCY' } | { type: 'RESET' },
  },
}).createMachine({
  id: 'trafficLight',
  initial: 'green',
  states: {
    green: {
      on: { TIMER: 'yellow' },
    },
    yellow: {
      on: { TIMER: 'red' },
    },
    red: {
      on: { TIMER: 'green', EMERGENCY: 'flashingRed' },
    },
    flashingRed: {
      on: { RESET: 'red' },
    },
  },
});
