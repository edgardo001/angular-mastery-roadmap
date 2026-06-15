import { setup } from 'xstate';

export const checkoutMachine = setup({
  types: {
    events: {} as
      | { type: 'START' }
      | { type: 'SELECT_PRODUCT' }
      | { type: 'NEXT' }
      | { type: 'PAY' }
      | { type: 'CONFIRM' }
      | { type: 'BACK' }
      | { type: 'CANCEL' }
      | { type: 'RETRY' },
  },
}).createMachine({
  id: 'checkout',
  initial: 'idle',
  states: {
    idle: {
      on: { START: 'selecting' },
    },
    selecting: {
      on: { SELECT_PRODUCT: 'payment', CANCEL: 'idle' },
    },
    payment: {
      on: { PAY: 'confirming', BACK: 'selecting', CANCEL: 'idle' },
    },
    confirming: {
      on: { CONFIRM: 'done', BACK: 'payment', CANCEL: 'idle' },
    },
    done: {
      type: 'final',
    },
  },
});
