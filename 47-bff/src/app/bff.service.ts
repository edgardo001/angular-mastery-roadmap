import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BffDashboardData } from './types';

@Injectable({ providedIn: 'root' })
export class BffService {
  private readonly http = inject(HttpClient);
  private readonly bffUrl = '/api/bff';

  getDashboardData(): Observable<BffDashboardData> {
    return this.http.get<BffDashboardData>(`${this.bffUrl}/dashboard`);
  }
}
