/**
 * STORE DEL CARRITO DE COMPRAS (CartStore)
 * ==========================================
 *
 * Gestiona el estado del carrito de compras usando NgRx Signals Store.
 * Permite agregar, eliminar y limpiar productos del carrito.
 *
 * ANÁLOGÍA: Es como un carrito de supermercado digital que:
 * - Recuerda los productos que agregaste
 * - Calcula el total automáticamente
 * - Guarda tu carrito para cuando vuelvas
 *
 * PALABRAS CLAVE:
 * - signalStore: Crea un store de estado reactivo
 * - withState: Define el estado inicial
 * - withComputed: Crea valores calculados que se actualizan automáticamente
 * - withMethods: Agrega métodos para modificar el estado
 * - withHooks: Hooks de inicialización
 * - patchState: Actualiza el estado parcialmente
 * - computed: Crea un valor calculado basado en signals
 *
 * DIFERENCIA ENTRE signal Y computed:
 * - signal: Variable que puedes CAMBIAR manualmente
 * - computed: Valor que se CALCULA automáticamente basándose en signals
 *   Ejemplo: totalItems se calcula sumando las cantidades de items
 */

// Herramientas de NgRx Signals Store
import { signalStore, withState, withComputed, withMethods, withHooks, patchState } from '@ngrx/signals';

// computed: Crea valores calculados que se actualizan automáticamente
import { computed } from '@angular/core';

// Interfaz que define la estructura de un item del carrito
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Interfaz que define la forma del estado del carrito
interface CartState {
  items: CartItem[];  // Lista de productos en el carrito
  loading: boolean;   // Estado de carga (para operaciones asíncronas)
}

// Clave para guardar el carrito en localStorage
const STORAGE_KEY = 'ngrx-cart';

// Función que carga el carrito desde localStorage
function loadCart(): CartItem[] {
  try {
    // Intenta leer y parsear el carrito guardado
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    // Si hay error (JSON inválido), retorna array vacío
    return [];
  }
}

// Función que guarda el carrito en localStorage
function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// signalStore: Crea un store de estado global para el carrito
export const CartStore = signalStore(
  // Disponible en toda la aplicación
  { providedIn: 'root' },

  // Estado inicial del carrito
  withState<CartState>({
    items: [],
    loading: false,
  }),

  // withComputed: Crea valores calculados basados en el estado
  // ({ items }): Desestructura el store para acceder a la signal items
  withComputed(({ items }) => ({
    // totalItems: Calcula la cantidad total de productos
    // reduce(): Recorre el array y acumula un valor
    totalItems: computed(() => items().reduce((sum, i) => sum + i.quantity, 0)),
    // totalPrice: Calcula el precio total del carrito
    totalPrice: computed(() =>
      items().reduce((sum, i) => sum + i.price * i.quantity, 0)
    ),
  })),

  // withMethods: Agrega métodos para modificar el carrito
  withMethods((store) => ({
    // addItem: Agrega un producto al carrito
    addItem(item: { id: number; name: string; price: number }) {
      // Busca si el producto ya está en el carrito
      const existing = store.items().find((i) => i.id === item.id);
      if (existing) {
        // Si ya existe, incrementa la cantidad
        // map(): Crea un nuevo array modificando el item existente
        const updated = store.items().map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        patchState(store, { items: updated });
        saveCart(updated);
      } else {
        // Si es nuevo, lo agrega al final con cantidad 1
        // spread operator (...): Copia el array existente y agrega el nuevo item
        const updated = [...store.items(), { ...item, quantity: 1 }];
        patchState(store, { items: updated });
        saveCart(updated);
      }
    },

    // removeItem: Elimina un producto del carrito por su ID
    removeItem(id: number) {
      // filter(): Crea un nuevo array sin el item con el ID especificado
      const updated = store.items().filter((i) => i.id !== id);
      patchState(store, { items: updated });
      saveCart(updated);
    },

    // clearCart: Vacía todo el carrito
    clearCart() {
      patchState(store, { items: [] });
      saveCart([]);
    },
  })),

  // withHooks: Hook que se ejecuta al inicializar el store
  withHooks({
    onInit(store) {
      // Carga el carrito guardado desde localStorage
      patchState(store, { items: loadCart() });
    },
  })
);
