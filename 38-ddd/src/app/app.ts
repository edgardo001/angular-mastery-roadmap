/**
 * Componente raíz de la aplicación DDD.
 *
 * Demuestra el uso de entidades, value objects y repositorios del dominio.
 * El componente actúa como la "capa de presentación" que interactúa con el dominio.
 *
 * En DDD, el flujo es:
 * Componente → Caso de uso (no aplica aquí) → Entidad → Value Object → Repositorio
 *
 * inject() — Obtiene el repositorio del sistema de inyección.
 * signal() — Contenedor reactivo para el estado de la UI.
 */
import { Component, inject, signal } from '@angular/core';
import { ORDER_REPOSITORY } from './domain/repositories/order-repository';
import { OrderRepository } from './domain/repositories/order-repository';
import { Order, OrderId } from './domain/entities/order';
import { User, UserId } from './domain/entities/user';
import { Product, ProductId } from './domain/entities/product';
import { Email } from './domain/value-objects/email';
import { Money } from './domain/value-objects/money';
import { Address } from './domain/value-objects/address';

/** Interfaz simplificada para mostrar órdenes en la UI */
interface OrderSummary {
  id: string;
  status: string;
  total: string;
  lines: number;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  /**
   * inject<OrderRepository>(ORDER_REPOSITORY) — Obtiene la implementación concreta
   * del repositorio registrada en app.config.ts.
   */
  private readonly orderRepo = inject<OrderRepository>(ORDER_REPOSITORY);

  /** Signal con el resumen de órdenes */
  readonly orders = signal<OrderSummary[]>([]);

  /** Signal con el log de operaciones */
  readonly log = signal<string[]>([]);

  /** Agrega un mensaje al log con marca de tiempo */
  private addLog(msg: string): void {
    this.log.update(l => [...l, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  }

  /**
   * Crea una orden de ejemplo completa con todos los pasos de DDD:
   * 1. Crear un usuario (entidad)
   * 2. Crear una dirección (value object)
   * 3. Crear un producto (entidad)
   * 4. Crear una orden (entidad con estado y reglas de negocio)
   * 5. Agregar líneas a la orden
   * 6. Confirmar la orden (genera evento de dominio)
   * 7. Guardar en el repositorio
   *
   * Cada paso usa factory methods (create, from, of, register) en lugar
   * de constructores directos. Esto garantiza que las entidades siempre
   * estén en un estado válido.
   */
  async createSampleOrder(): Promise<void> {
    // 1. Crear usuario con value objects
    const customer = User.register('Juan Pérez', Email.from('juan@example.com'));
    const shippingAddress = Address.of({
      street: 'Av. Reforma 123',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '06600',
      country: 'México',
    });
    customer.updateShippingAddress(shippingAddress);

    // 2. Crear producto con precio como Money value object
    const product = Product.create('Laptop', Money.of(999.99), 10);

    // 3. Crear orden
    const order = Order.create(customer.getId(), shippingAddress);

    // 4. Agregar línea a la orden
    order.addLine(product.getId(), product.getName(), product.getPrice(), 1);
    this.addLog(`Orden creada: ${order.getId()} — Total: ${order.getTotal()}`);

    // 5. Reducir stock y confirmar (genera OrderPlacedEvent)
    product.reduceStock(1);
    order.confirm();
    this.addLog(`Orden confirmada — Eventos: ${order.getDomainEvents().length}`);

    // 6. Guardar en repositorio
    await this.orderRepo.save(order);
    this.addLog('Orden guardada en repositorio');

    await this.refreshOrders();
  }

  /** Refresca la lista de órdenes desde el repositorio */
  async refreshOrders(): Promise<void> {
    this.addLog('Listando órdenes...');
    const summaries: OrderSummary[] = [];
    const allOrders = [
      await this.orderRepo.findById(OrderId.from('placeholder')),
    ].filter(Boolean) as Order[];

    this.orders.set(summaries);
  }

  /** Limpia el log */
  clearLog(): void {
    this.log.set([]);
  }
}
