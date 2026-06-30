// =============================================================================
// ARCHIVO: animations.ts
// PROPÓSITO: Definiciones de animaciones reutilizables para Angular
// =============================================================================
//
// Este archivo contiene TODAS las animaciones del proyecto.
// Las animaciones en Angular se definen usando una API declarativa:
// describes QUÉ quieres que pase, no CÓMO implementarlo.
//
// Es como dar instrucciones a un coreógrafo de baile:
// "Cuando entre la bailarina, que se ilumine gradualmente en 600ms"
// en lugar de escribir el código CSS keyframes tú mismo.
//
// API de Animaciones de Angular:
// - trigger(): Define un nombre para la animación (como @fadeIn)
// - state(): Define un estado específico (como "expanded" o "collapsed")
// - style(): Define estilos CSS para un momento específico
// - transition(): Define cuándo se ejecuta la animación (enter, leave, etc.)
// - animate(): Define la duración y la curva de movimiento
// - query(): Busca elementos hijos para animar
// - stagger(): Aplica un retraso progresivo a elementos encontrados
// - keyframes(): Define múltiples pasos en la animación
// =============================================================================

// Importa todas las funciones necesarias de la API de animaciones de Angular
import { trigger, state, style, transition, animate, query, stagger, keyframes } from '@angular/animations';

// =============================================================================
// ANIMACIÓN 1: fadeIn (Aparición Gradual)
// =============================================================================
// Esta animación hace que un elemento aparezca gradualmente de invisible
// a visible. Es como subir la intensidad de una luz lentamente.
//
// trigger('fadeIn'): Crea una animación llamada "fadeIn" que se usa en
// el template como [@fadeIn]
//
// transition(':enter'): Se ejecuta cuando el elemento ENTRA al DOM
// (cuando Angular lo agrega al HTML). :enter es un alias de "void => *"
//
// flujo: opacity 0 → opacity 1 en 600ms con ease-out (desaceleración)
export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    // Estado inicial: completamente invisible
    style({ opacity: 0 }),
    // Anima durante 600ms con ease-out hasta opacity 1
    animate('600ms ease-out', style({ opacity: 1 }))
  ])
]);

// =============================================================================
// ANIMACIÓN 2: slideIn (Deslizamiento de Entrada y Salida)
// =============================================================================
// Esta animación tiene DOS transiciones:
// - :enter: El elemento entra deslizándose desde la izquierda
// - :leave: El elemento sale deslizándose hacia la derecha
//
// Es como una puerta giratoria: entra por un lado y sale por el otro.
//
// translateX(-100%): Mueve el elemento a la izquierda (fuera de pantalla)
// translateX(0): Posición normal
// translateX(100%): Mueve el elemento a la derecha (fuera de pantalla)
export const slideIn = trigger('slideIn', [
  // Entrada: desliza desde la izquierda hacia la posición normal
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
  ]),
  // Salida: desliza desde la posición normal hacia la derecha
  transition(':leave', [
    animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
  ])
]);

// =============================================================================
// ANIMACIÓN 3: listStagger (Aparición Escalonada de Lista)
// =============================================================================
// Esta es la animación más compleja. Hace que los elementos de una lista
// aparezcan uno después de otro con un retraso de 80ms entre cada uno.
//
// ¿Qué es "stagger"?
// Es como lanzar una moneda al aire varias veces con un retraso:
// la primera moneda sube, luego la segunda, luego la tercera...
// Cada elemento tiene su propio momento de aparición.
//
// query(':enter'): Busca todos los elementos que están entrando al DOM
// stagger(80): Aplica un retraso de 80ms entre cada elemento encontrado
// { optional: true }: No lanza error si no encuentra elementos
export const listStagger = trigger('listStagger', [
  // transition('* => *'): Se ejecuta en CUALQUIER cambio de estado
  // Es como un "escucha universal" que detecta cualquier actualización
  transition('* => *', [
    // Busca elementos que están entrando y los anima escalonadamente
    query(':enter', [
      // Estado inicial de cada elemento: invisible y ligeramente abajo
      style({ opacity: 0, transform: 'translateY(20px)' }),
      // Cada elemento aparece 80ms después del anterior
      stagger(80, [
        // Anima cada elemento durante 400ms hasta su posición final
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true }),

    // Busca elementos que están saliendo y los anima escalonadamente
    query(':leave', [
      // Cada elemento sale 40ms después del anterior
      stagger(40, [
        // Se desliza ligeramente a la izquierda mientras desaparece
        animate('250ms ease-in', style({ opacity: 0, transform: 'translateX(-20px)' }))
      ])
    ], { optional: true })
  ])
]);

// =============================================================================
// ANIMACIÓN 4: routeSlide (Transición entre Rutas)
// =============================================================================
// Esta animación crea un efecto de "deslizamiento" cuando cambias de ruta.
// El contenido actual se desliza hacia la izquierda y el nuevo entra
// desde la derecha, como si fueran páginas de un libro.
//
// position: 'absolute': Los elementos salientes y entrantes se superponen
// durante la transición para evitar un "salto" visual.
//
// * <=> *: Se ejecuta en cualquier cambio de ruta (ida y vuelta)
export const routeSlide = trigger('routeSlide', [
  transition('* <=> *', [
    // Paso 1: Posiciona ambos elementos (el que sale y el que entra)
    // de forma absoluta para que se superpongan durante la animación
    query(':enter, :leave', [
      style({ position: 'absolute', width: '100%' })
    ], { optional: true }),

    // Paso 2: El elemento entrante empieza fuera de pantalla (derecha)
    query(':enter', [
      style({ transform: 'translateX(100%)', opacity: 0 })
    ], { optional: true }),

    // Paso 3: El elemento saliente se desliza hacia la izquierda
    query(':leave', [
      animate('350ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
    ], { optional: true }),

    // Paso 4: El elemento entrante se desliza hacia su posición final
    query(':enter', [
      animate('350ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
    ], { optional: true })
  ])
]);

// =============================================================================
// ANIMACIÓN 5: expandCollapse (Expandir/Colapsar)
// =============================================================================
// Esta animación alterna entre dos estados: colapsado y expandido.
// Es como un acordeón que se abre y se cierra.
//
// state(): Define estilos estáticos para un estado específico.
// - 'collapsed': altura 0, invisible, overflow oculto
// - 'expanded': altura automática (*), visible, overflow oculto
//
// transition(): Cuando cambia entre "collapsed" y "expanded",
// anima durante 350ms con ease-in-out (suave en ambos extremos).
export const expandCollapse = trigger('expandCollapse', [
  state('collapsed', style({ height: '0', opacity: 0, overflow: 'hidden' })),
  state('expanded', style({ height: '*', opacity: 1, overflow: 'hidden' })),
  transition('collapsed <=> expanded', animate('350ms ease-in-out'))
]);
