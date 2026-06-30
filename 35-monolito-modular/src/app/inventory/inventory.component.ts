/**
 * Componente del módulo de Inventario.
 *
 * Muestra la lista de productos disponibles en el almacén.
 * Usa signal() para mantener el estado reactivo de los ítems.
 *
 * Analogía: Es como un tablero de control que muestra cuántos productos
 * hay en cada estante de la tienda.
 */
import { Component, inject, signal } from '@angular/core';
import { InventoryService } from './inventory.service';
import { InventoryItem } from '../shared';

@Component({
  selector: 'app-inventory',
  imports: [],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent {
  private readonly service = inject(InventoryService);

  /** Signal con la lista de ítems de inventario */
  readonly items = signal<InventoryItem[]>([]);

  constructor() {
    // Carga los ítems al crear el componente
    this.service.getItems().subscribe(items => this.items.set(items));
  }
}
