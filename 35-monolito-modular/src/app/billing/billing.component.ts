/**
 * Componente del módulo de Facturación.
 *
 * Muestra la lista de facturas emitidas.
 * Usa inject() para obtener el servicio y signal() para el estado reactivo.
 *
 * Analogía: Es como una pantalla que muestra el estado de las facturas
 * de la empresa: cuáles están pagadas, cuáles pendientes, etc.
 */
import { Component, inject, signal } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { BillingService } from './billing.service';
import { Invoice } from '../shared';

@Component({
  selector: 'app-billing',
  imports: [SlicePipe],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css',
})
export class BillingComponent {
  private readonly service = inject(BillingService);

  /** Signal con la lista de facturas */
  readonly invoices = signal<Invoice[]>([]);

  constructor() {
    // Carga las facturas al crear el componente
    this.service.getInvoices().subscribe(invoices => this.invoices.set(invoices));
  }
}
