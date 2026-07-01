// Máquina de estados para un flujo de checkout (compra en línea)
// Modela el proceso de compra: seleccionar → pagar → confirmar → completar
// Demuestra: context, actions, guards, invoke (servicios asincrónicos)
import { setup, assign, fromPromise } from 'xstate';

// checkoutMachine: define el flujo de compra paso a paso
// Esta máquina demuestra todos los conceptos avanzados de XState:
// - context: datos del carrito, dirección, estado de pago
// - actions: assign() para modificar datos
// - guards: condiciones para avanzar entre pasos
// - invoke: llamar a un API de pago simulado (asincrónico)

// Definición de tipos para los items del carrito
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Definición de tipos para el output del invoke (resultado del pago)
interface PaymentResult {
  success: boolean;
  paymentId: string;
  message: string;
}

// Definición de tipos para el input del invoke
interface PaymentInput {
  items: CartItem[];
  total: number;
  address: string;
  paymentMethod: string;
}

// paymentService: simula una API de pago con Promise
// fromPromise: convierte una Promise en un actor de XState
// En XState v5, los actors se definen en setup() y se referencian por nombre
const paymentService = fromPromise(async ({ input }: { input: PaymentInput }): Promise<PaymentResult> => {
  // input: datos que se pasan al servicio (context de la máquina)
  const { total } = input;

  // Simulamos una llamada a API con Promise + setTimeout
  return new Promise<PaymentResult>((resolve, reject) => {
    setTimeout(() => {
      // Simulamos éxito o error aleatorio (20% de chance de error)
      const isError = Math.random() < 0.2;

      if (isError) {
        // reject(): rechaza la Promise → XState va al estado 'error'
        reject(new Error('Payment declined. Please try again.'));
      } else {
        // resolve(): resuelve la Promise → XState va al estado 'done'
        resolve({
          success: true,
          paymentId: `PAY-${Date.now()}`, // ID único basado en timestamp
          message: `Payment of $${total.toFixed(2)} processed successfully`,
        });
      }
    }, 2000); // 2 segundos de delay (simula latencia de red)
  });
});

export const checkoutMachine = setup({
  // actors: define los servicios asincrónicos que la máquina puede invocar
  // Cada actor tiene un nombre que se usa en invoke.src
  actors: {
    paymentActor: paymentService,
  },

  types: {
    // context: datos que la máquina guarda durante el checkout
    // Es como la "memoria" del carrito de compras
    context: {} as {
      items: CartItem[];
      total: number;           // Total de la compra
      address: string;         // Dirección de envío (obligatoria para confirmar)
      paymentMethod: string;   // Método de pago (obligatorio para confirmar)
      error: string | null;    // Mensaje de error si falla el pago
      paymentId: string | null; // ID de la transacción exitosa
    },
    // Eventos: acciones que el usuario puede realizar
    events: {} as
      | { type: 'START' }           // Iniciar el checkout
      | { type: 'ADD_ITEM'; item: { id: number; name: string; price: number } } // Agregar producto
      | { type: 'REMOVE_ITEM'; itemId: number }  // Eliminar producto
      | { type: 'SET_ADDRESS'; address: string } // Establecer dirección
      | { type: 'SET_PAYMENT_METHOD'; method: string } // Establecer método de pago
      | { type: 'PAY' }            // Procesar pago
      | { type: 'CONFIRM' }        // Confirmar el pedido
      | { type: 'BACK' }           // Retroceder al paso anterior
      | { type: 'CANCEL' }         // Cancelar toda la compra
      | { type: 'RETRY' },         // Reintentar después de error
  },

  // guards: condiciones que deben cumplirse para avanzar
  // Son como "requisitos" en un formulario: no puedes pasar si no los cumples
  guards: {
    // hasItems: solo puede avanzar a pago si hay items en el carrito
    hasItems: ({ context }) => context.items.length > 0,

    // hasAddress: solo puede confirmar si hay dirección de envío
    hasAddress: ({ context }) => context.address.trim().length > 0,

    // hasPaymentMethod: solo puede pagar si eligió método de pago
    hasPaymentMethod: ({ context }) => context.paymentMethod.length > 0,

    // canConfirm: necesita dirección Y método de pago para confirmar
    canConfirm: ({ context }) =>
      context.address.trim().length > 0 &&
      context.paymentMethod.length > 0,
  },
}).createMachine({
  id: 'checkout',
  initial: 'idle', // Estado inicial: inactivo

  // context: datos iniciales del checkout
  context: {
    items: [],            // Carrito vacío al inicio
    total: 0,             // Total en 0
    address: '',          // Sin dirección
    paymentMethod: '',    // Sin método de pago
    error: null,          // Sin errores
    paymentId: null,      // Sin ID de pago
  },

  states: {
    // Estado INACTIVO: esperando que el usuario inicie
    idle: {
      entry: [
        assign({
          // Reinicia todos los datos al volver a idle
          items: [],
          total: 0,
          address: '',
          paymentMethod: '',
          error: null,
          paymentId: null,
        }),
      ],
      on: {
        START: {
          target: 'selecting',
          // actions: limpiar errores anteriores al iniciar
          actions: assign({
            error: null,
          }),
        },
      },
    },

    // Estado SELECCIONANDO: el usuario elige productos
    selecting: {
      on: {
        ADD_ITEM: {
          // self: transición que se queda en el mismo estado
          // Es como un "refresh": el usuario agrega un producto y sigue aquí
          target: 'selecting',
          actions: assign({
            // spread copia el array anterior y agrega el nuevo item
            items: ({ context, event }) => [
              ...context.items,
              { ...event.item, quantity: 1 }, // Agrega con quantity = 1
            ],
            // Recalcula el total sumando el precio del item agregado
            total: ({ context, event }) => context.total + event.item.price,
          }),
        },
        REMOVE_ITEM: {
          target: 'selecting',
          actions: assign({
            // Encuentra el item que se va a eliminar para calcular el nuevo total
            items: ({ context, event }) =>
              context.items.filter((item) => item.id !== event.itemId),
            // Recalcula el total: resta el precio * quantity del item eliminado
            total: ({ context, event }) => {
              const itemToRemove = context.items.find((i) => i.id === event.itemId);
              return itemToRemove
                ? context.total - itemToRemove.price * itemToRemove.quantity
                : context.total;
            },
          }),
        },
        // PAY: avanzar a pago (con guard: must have items)
        PAY: {
          target: 'payment',
          guard: { type: 'hasItems' }, // Solo avanza si hay items en el carrito
        },
        CANCEL: 'idle',
      },
    },

    // Estado PAGO: el usuario ingresa datos de pago
    payment: {
      on: {
        SET_ADDRESS: {
          target: 'payment',
          actions: assign({
            address: ({ event }) => event.address,
          }),
        },
        SET_PAYMENT_METHOD: {
          target: 'payment',
          actions: assign({
            paymentMethod: ({ event }) => event.method,
          }),
        },
        // CONFIRM: avanzar a confirmación (con guard: needs address + payment)
        CONFIRM: {
          target: 'confirming',
          guard: { type: 'canConfirm' }, // Necesita dirección Y método de pago
        },
        BACK: 'selecting',
        CANCEL: 'idle',
      },
    },

    // Estado CONFIRmando: el usuario revisa y confirma el pedido
    confirming: {
      on: {
        // CONFIRM: procesar el pago (invoca servicio asincrónico)
        CONFIRM: 'processingPayment',
        BACK: 'payment',
        CANCEL: 'idle',
      },
    },

    // Estado PROCESANDO PAGO: invoke llama al API de pago simulado
    processingPayment: {
      // invoke: llama a un servicio asincrónico
      // Es como hacer un fetch() o llamar a un API REST
      // XState maneja automáticamente el loading, success y error
      invoke: {
        // src: nombre del actor definido en setup().actors
        // En XState v5, se referencia por nombre (string)
        src: 'paymentActor',

        // input: datos que se pasan al servicio asincrónico
        // Es como los "parámetros" de una función API
        input: ({ context }) => ({
          items: context.items,
          total: context.total,
          address: context.address,
          paymentMethod: context.paymentMethod,
        }),
      },

      // onDone: se ejecuta cuando el invoke termina exitosamente
      // Es como el .then() de una Promise
      onDone: {
        target: 'done',
        actions: assign({
          // event.output contiene lo que retornó la Promise
          paymentId: ({ event }) => {
            const output = event.output as PaymentResult;
            return output.paymentId;
          },
          error: null,
        }),
      },

      // onError: se ejecuta cuando el invoke falla
      // Es como el .catch() de una Promise
      onError: {
        target: 'paymentError',
        actions: assign({
          error: ({ event }) => {
            // event['error'] contiene el error lanzado por la Promise
            // Usamos bracket notation porque error viene de un index signature
            const err = event['error'];
            return err instanceof Error ? err.message : 'Payment failed';
          },
        }),
      },
    },

    // Estado ERROR DE PAGO: el pago falló, el usuario puede reintentar
    paymentError: {
      on: {
        RETRY: 'processingPayment', // Reintentar el pago
        CANCEL: 'idle',             // Cancelar y empezar de nuevo
      },
    },

    // Estado COMPLETADO: estado final, el pedido se procesó
    done: {
      type: 'final', // 'final' indica que es un estado terminal
    },
  },
});
