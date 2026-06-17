import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { BffDashboardData, LoginResponse, RawUser, Order, Product, TransformedProduct } from './types';

@Injectable({ providedIn: 'root' })
export class BffService {
  private readonly http = inject(HttpClient);
  private readonly bffUrl = '/api/bff';
  private sessionId = '';

  login(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.bffUrl}/login`, {}).pipe(
      tap(r => this.sessionId = r.sessionId)
    );
  }

  getDashboardData(): Observable<BffDashboardData> {
    return this.http.get<BffDashboardData>(`${this.bffUrl}/dashboard`, {
      headers: { 'x-session-id': this.sessionId }
    });
  }

  getTransformedProducts(): Observable<TransformedProduct[]> {
    return this.http.get<TransformedProduct[]>(`${this.bffUrl}/products`, {
      headers: { 'x-session-id': this.sessionId }
    });
  }

  getRawUsers(): Observable<RawUser[]> {
    return this.http.get<RawUser[]>(`${this.bffUrl}/raw/users`);
  }

  getRawOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.bffUrl}/raw/orders`);
  }

  getRawProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.bffUrl}/raw/products`);
  }
}
