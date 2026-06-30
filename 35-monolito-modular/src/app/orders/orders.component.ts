/**
 * Componente del módulo de Órdenes.
 *
 * Muestra la lista de órdenes y permite crear nuevas.
 * Usa signals para mantener el estado reactivo.
 *
 * inject() — Obtiene el servicio OrdersService del sistema de inyección.
 * signal() — Contenedor reactivo: cuando cambia, Angular actualiza la vista.
 * SlicePipe — Pipe de Angular para mostrar los primeros N caracteres de un string.
 *
 * Analogía: Este componente es como un cajero en una tienda.
 * Muestra las órdenes en pantalla y permite crear órdenes nuevas.
 */
import { Component, inject, signal } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { OrdersService } from './orders.service';
import { Order } from '../shared';

@Component({
  selector: 'app-orders',
  imports: [SlicePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  private readonly service = inject(OrdersService);

  /** Signal que almacena la lista de órdenes */
  readonly orders = signal<Order[]>([]);

  constructor() {
    // Carga las órdenes al inicializar el componente
    this.load();
  }

  /** Obtiene las órdenes del servicio y actualiza el signal */
  private load(): void {
    this.service.getOrders().subscribe(orders => this.orders.set(orders));
  }

  /**
   * Crea una orden nueva y recarga la lista.
   * Math.random() genera un número aleatorio para el ID del producto.
   * .subscribe() activa el Observable y ejecuta la operación.
   */
  createOrder(): void {
    this.service.createOrder(`PROD-${Math.floor(Math.random() * 100)}`, 1)
      .subscribe(() => this.load());
  }
}
