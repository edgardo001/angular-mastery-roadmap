// =============================================================================
// ARCHIVO: home.ts
// PROPÓSITO: Página principal que demuestra animaciones de lista (stagger)
// =============================================================================
//
// Este componente muestra una lista interactiva con animaciones:
// - Cuando agregas un elemento: aparece con efecto slide-in escalonado
// - Cuando eliminas un elemento: desaparece con animación de salida
// - Cuando la lista está vacía: muestra un mensaje con fade-in
//
// ¿Qué es una animación "stagger"?
// Es cuando los elementos aparecen uno después de otro con un pequeño
// retraso entre cada uno. Como si fueran cayendo fichas de dominó,
// una tras otra, no todas al mismo tiempo.
// =============================================================================

// Component y signal: Decorador de Angular y estado reactivo
import { Component, signal } from '@angular/core';

// Importa las animaciones definidas en animations.ts
// fadeIn: Animación de aparición gradual (de invisible a visible)
// slideIn: Animación de deslizamiento (entra desde un lado)
// listStagger: Animación escalonada para listas (elementos aparecen uno a uno)
import { fadeIn, slideIn, listStagger } from '../../animations';

@Component({
  selector: 'app-home',
  standalone: true,

  // animations: Lista de animaciones que este componente puede usar.
  // Cada animación se referencia por su nombre en el template.
  // Es como registrar efectos de sonido antes de usarlos en una película.
  animations: [fadeIn, slideIn, listStagger],

  template: `
    <div style="max-width:700px;margin:2rem auto;padding:0 1rem;">
      <!--
        [@fadeIn]: Sintaxis para USAR una animación en Angular.
        El @ precedido del nombre de la animación le dice a Angular:
        "Aplica esta animación cuando este elemento entre o salga del DOM"
        
        fadeIn se dispara cuando el elemento aparece (:enter)
      -->
      <h1 [@fadeIn] style="color:#1e40af;font-size:2rem;">Angular Animations</h1>

      <section [@fadeIn] style="margin:2rem 0;">
        <p>Demonstrates fade-in, slide, stagger, enter/leave animations.</p>
      </section>

      <!-- SECCIÓN DE INPUT PARA AGREGAR ELEMENTOS -->
      <div style="display:flex;gap:0.5rem;margin-bottom:1.5rem;">
        <!--
          #itemInput: Template reference variable.
          Es como una "etiqueta" que puedes usar para acceder al elemento HTML.
          Aquí permite leer el valor del input sin necesidad de ngModel.
        -->
        <input #itemInput
          (keyup.enter)="addItem(itemInput.value); itemInput.value=''"
          placeholder="Add an item"
          style="flex:1;padding:0.5rem;border:1px solid #d1d5db;border-radius:4px;">
        <button (click)="addItem(itemInput.value); itemInput.value=''"
          style="padding:0.5rem 1rem;background:#1e40af;color:white;border:none;border-radius:4px;cursor:pointer;">
          Add
        </button>
      </div>

      <!--
        [@listStagger]="items().length": Animación escalonada de lista.
        El valor bindings ("items().length") le dice a Angular CUÁNDO
        disparar la animación: cada vez que cambia la cantidad de elementos.
        
        Cuando items().length pasa de 3 a 4, los elementos nuevos
        aparecen con un efecto escalonado (uno tras otro).
      -->
      <ul [@listStagger]="items().length" style="list-style:none;padding:0;">
        <!--
          @for: Control flow que itera sobre el array.
          - track item: Angular usa el string para identificar cada elemento
          - let i = $index: Guarda el índice actual en la variable "i"
        -->
        @for (item of items(); track item; let i = $index) {
          <!--
            [@slideIn]: Cada <li> tiene esta animación.
            - Cuando aparece (:enter): se desliza desde la izquierda
            - Cuando desaparece (:leave): se desliza hacia la derecha
          -->
          <li [@slideIn] style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem;margin-bottom:0.5rem;background:white;border-radius:6px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <span>{{ item }}</span>
            <button (click)="removeItem(i)"
              style="background:#ef4444;color:white;border:none;padding:0.25rem 0.75rem;border-radius:4px;cursor:pointer;">
              &times;
            </button>
          </li>
        }
      </ul>

      <!-- Mensaje cuando la lista está vacía -->
      @if (items().length === 0) {
        <p [@fadeIn] style="text-align:center;color:#9ca3af;">No items yet</p>
      }
    </div>
  `
})
export class HomePage {
  // signal(): Estado reactivo que contiene la lista de elementos.
  // Inicializa con 3 elementos de ejemplo.
  // Cuando cambia, Angular actualiza el template y dispara las animaciones.
  items = signal<string[]>(['Angular', 'Animations', 'Signals']);

  // Agrega un nuevo elemento a la lista.
  addItem(text: string) {
    const trimmed = text.trim();
    // Solo agrega si el texto no está vacío después de trim()
    if (trimmed) this.items.update(list => [...list, trimmed]);
    // La animación listStagger se dispara automáticamente porque
    // items().length cambió (de 3 a 4, por ejemplo)
  }

  // Elimina un elemento por su índice.
  removeItem(index: number) {
    // filter() crea un nuevo array sin el elemento en la posición index.
    // La animación :leave del listStagger se activa automáticamente.
    this.items.update(list => list.filter((_, i) => i !== index));
  }
}
