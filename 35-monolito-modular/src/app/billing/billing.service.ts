import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BillingServiceContract, Invoice } from '../shared';

@Injectable()
export class BillingService implements BillingServiceContract {
  private invoices: Invoice[] = [];

  getInvoices(): Observable<Invoice[]> {
    return of([...this.invoices]);
  }

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
