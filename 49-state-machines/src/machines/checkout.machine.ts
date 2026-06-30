// Máquina de estados para un flujo de checkout (compra en línea)
// Modela el proceso de compra: seleccionar → pagar → confirmar → completar
import { setup } from 'xstate';

// checkoutMachine: define el flujo de compra paso a paso
export const checkoutMachine = setup({
  types: {
    // Eventos posibles en el flujo de compra
    events: {} as
      | { type: 'START' } // Iniciar el checkout
      | { type: 'SELECT_PRODUCT' } // Seleccionar producto
      | { type: 'NEXT' } // Avanzar al siguiente paso
      | { type: 'PAY' } // Procesar pago
      | { type: 'CONFIRM' } // Confirmar el pedido
      | { type: 'BACK' } // Retroceder al paso anterior
      | { type: 'CANCEL' } // Cancelar toda la compra
      | { type: 'RETRY' }, // Reintentar después de error
  },
}).createMachine({
  id: 'checkout',
  initial: 'idle', // Estado inicial: inactivo
  
  states: {
    // Estado INACTIVO: esperando que el usuario inicie
    idle: {
      on: { START: 'selecting' }, // START lleva a SELECCIONANDO
    },
    // Estado SELECCIONANDO: el usuario elige productos
    selecting: {
      on: { 
        SELECT_PRODUCT: 'payment', // Seleccionar lleva a PAGO
        CANCEL: 'idle' // Cancelar vuelve a inactivo
      },
    },
    // Estado PAGO: el usuario ingresa datos de pago
    payment: {
      on: { 
        PAY: 'confirming', // Pagar lleva a CONFIRmando
        BACK: 'selecting', // Atrás vuelve a selección
        CANCEL: 'idle' // Cancelar vuelve a inactivo
      },
    },
    // Estado CONFIRmando: el usuario revisa y confirma el pedido
    confirming: {
      on: { 
        CONFIRM: 'done', // Confirmar lleva a COMPLETADO
        BACK: 'payment', // Atrás vuelve a pago
        CANCEL: 'idle' // Cancelar vuelve a inactivo
      },
    },
    // Estado COMPLETADO: estado final, el pedido se procesó
    done: {
      type: 'final', // 'final' indica que es un estado terminal (no hay más transiciones)
    },
  },
});
