/**
 * Servicio del módulo de Facturación.
 *
 * Implementa BillingServiceContract y maneja la lógica de facturas.
 * Almacena facturas en memoria (arreglo privado).
 *
 * En un monolito modular, cada servicio es responsable de su dominio.
 * El servicio de facturación NO sabe nada sobre órdenes o inventario.
 * Solo sabe crear y consultar facturas.
 *
 * Analogía: Es como el departamento de contabilidad de una empresa.
 * Solo se preocupa por facturas, no por el inventario o las ventas.
 */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BillingServiceContract, Invoice } from '../shared';

@Injectable()
export class BillingService implements BillingServiceContract {
  /** Arreglo en memoria que simula una base de datos de facturas */
  private invoices: Invoice[] = [];

  /** Retorna una copia de las facturas */
  getInvoices(): Observable<Invoice[]> {
    return of([...this.invoices]);
  }

  /**
   * Crea una factura nueva asociada a una orden.
   * paid: false — La factura inicia como no pagada.
   */
  createInvoice(orderId: string, amount: number): Observable<Invoice> {
    const invoice: Invoice = {
      id: crypto.randomUUID(),
      orderId,
      amount,
      paid: false,
      issuedAt: new Date(),
    };
    this.invoices.push(invoice);
    return of(invoice);
  }
}
