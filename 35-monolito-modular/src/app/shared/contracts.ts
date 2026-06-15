import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, InventoryItem, Invoice } from './types';

export interface OrderServiceContract {
  getOrders(): Observable<Order[]>;
  createOrder(productId: string, quantity: number): Observable<Order>;
}

export interface InventoryServiceContract {
  getItems(): Observable<InventoryItem[]>;
  updateStock(productId: string, quantity: number): Observable<InventoryItem>;
}

export interface BillingServiceContract {
  getInvoices(): Observable<Invoice[]>;
  createInvoice(orderId: string, amount: number): Observable<Invoice>;
}

export const ORDER_SERVICE = new InjectionToken<OrderServiceContract>('OrderService');
export const INVENTORY_SERVICE = new InjectionToken<InventoryServiceContract>('InventoryService');
export const BILLING_SERVICE = new InjectionToken<BillingServiceContract>('BillingService');
