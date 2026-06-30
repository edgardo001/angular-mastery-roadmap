// BFFService: servicio que se comunica con el Backend For Frontend
// Un BFF es un servidor intermedio que adapta las APIs para el frontend
// Como un traductor que habla con múltiples backend y le da al frontend solo lo que necesita
import { Injectable, inject } from '@angular/core';
// HttpClient: servicio de Angular para hacer peticiones HTTP (GET, POST, etc.)
import { HttpClient } from '@angular/common/http';
// Observable: tipo de RxJS que representa un flujo de datos asíncrono
// tap: operador de RxJS para ejecutar side effects (como guardar un sessionId)
import { Observable, map, tap } from 'rxjs';
// Importamos los tipos de datos que usaremos
import { BffDashboardData, LoginResponse, RawUser, Order, Product, TransformedProduct } from './types';

// providedIn: 'root' significa que este servicio está disponible en toda la aplicación
@Injectable({ providedIn: 'root' })
export class BffService {
  // inject() obtiene servicios de Angular (forma moderna vs constructor)
  private readonly http = inject(HttpClient);
  private readonly bffUrl = '/api/bff'; // URL base del BFF
  private sessionId = ''; // ID de sesión para autenticación

  // login(): autentica al usuario y guarda el sessionId
  // POST: envía datos al servidor para crear un recurso (en este caso, una sesión)
  login(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.bffUrl}/login`, {}).pipe(
      // tap: ejecuta código sin modificar el Observable
      // Guarda el sessionId para usarlo en futuras peticiones
      tap(r => this.sessionId = r.sessionId)
    );
  }

  // getDashboardData(): obtiene datos agregados del dashboard
  // El BFF combina datos de múltiples fuentes en una sola respuesta
  getDashboardData(): Observable<BffDashboardData> {
    return this.http.get<BffDashboardData>(`${this.bffUrl}/dashboard`, {
      // headers: enviamos el sessionId para autenticación
      headers: { 'x-session-id': this.sessionId }
    });
  }

  // getTransformedProducts(): obtiene productos transformados por el BFF
  // El BFF convierte stock a boolean, precios a formato legible, etc.
  getTransformedProducts(): Observable<TransformedProduct[]> {
    return this.http.get<TransformedProduct[]>(`${this.bffUrl}/products`, {
      headers: { 'x-session-id': this.sessionId }
    });
  }

  // Estos métodos obtienen datos CRUDOS directamente del backend
  // El BFF los filtra y transforma antes de enviarlos al frontend
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
