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
  readonly invoices = signal<Invoice[]>([]);

  constructor() {
    this.service.getInvoices().subscribe(invoices => this.invoices.set(invoices));
  }
}
