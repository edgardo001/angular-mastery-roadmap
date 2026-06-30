// Componente principal que demuestra el patrón BFF (Backend For Frontend)
// Un BFF es un servidor intermedio que adapta APIs para el frontend
// Reduce llamadas HTTP, filtra datos sensibles, y transforma respuestas
import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BffService } from './bff.service';
import { BffDashboardData, RawUser, Order, Product, TransformedProduct } from './types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // CommonModule da acceso a directivas comunes como ngClass, ngStyle, etc.
  template: `
    <!-- Header con estado de conexión -->
    <header class="topbar">
      <h1>🔐 BFF <span class="dim">(Backend For Frontend)</span></h1>
      <!-- [class.on]: clase CSS condicional basada en el valor del signal -->
      <span class="badge" [class.on]="loggedIn()">● {{ loggedIn() ? 'Conectado' : 'Desconectado' }}</span>
    </header>

    <div class="layout">
      <!-- @if/@else: control flow moderno de Angular para condicionales -->
      @if (loading()) {
        <section class="card loading-card">
          <div class="spinner"></div>
          <p>Cargando demo...</p>
        </section>
      } @else if (error()) {
        <section class="card error-card">
          <p>❌ {{ error() }}</p>
        </section>
      } @else {
        <!-- Sidebar con arquitectura BFF -->
        <aside class="sidebar">
          <div class="card">
            <h3>🧭 Arquitectura BFF</h3>
            <div class="arch">
              <div class="arch-flows">
                <!-- Flujo SIN BFF: múltiples llamadas directas al backend -->
                <div class="flow bad">
                  <div class="flow-header">❌ Sin BFF</div>
                  <div class="flow-calls">
                    <div class="call">GET /users <span class="bytes">{{ rawUsersBytes() }}B</span></div>
                    <div class="call">GET /orders <span class="bytes">{{ rawOrdersBytes() }}B</span></div>
                    <div class="call">GET /products <span class="bytes">{{ rawProductsBytes() }}B</span></div>
                  </div>
                  <div class="flow-total">🔴 3 llamadas · <strong>{{ totalRawBytes() }}B</strong> transferidos</div>
                </div>
                <div class="flow-vs">VS</div>
                <!-- Flujo CON BFF: una sola llamada que agrega todo -->
                <div class="flow good">
                  <div class="flow-header">✅ Con BFF</div>
                  <div class="flow-calls">
                    <div class="call single">GET /bff/dashboard <span class="bytes">{{ bffBytes() }}B</span></div>
                  </div>
                  <div class="flow-total">🟢 1 llamada · <strong>{{ bffBytes() }}B</strong> transferidos</div>
                </div>
              </div>
              <!-- Barra de progreso mostrando el ahorro de datos -->
              <div class="savings">
                🚀 Ahorro: <strong>{{ savingsPercent() }}%</strong> menos datos transferidos
                <div class="bar-track">
                  <div class="bar-fill" [style.width.%]="bffPercentOfRaw()"></div>
                </div>
                <small>{{ totalRawBytes() }}B → {{ bffBytes() }}B</small>
              </div>
            </div>
          </div>

          <div class="card">
            <h3>📦 Lo que el BFF hizo</h3>
            <ul class="bff-actions">
              <li><span class="tag auth">Auth</span> Validó tu sesión</li>
              <li><span class="tag sanitize">Sanitizar</span> Ocultó datos sensibles (seguro social, tarjeta)</li>
              <li><span class="tag aggregate">Agregar</span> 3 → 1 llamada</li>
              <li><span class="tag transform">Transformar</span> Stock → bool, precio → formato</li>
            </ul>
          </div>
        </aside>

        <!-- Contenido principal con datos del dashboard -->
        <main class="content">
          <section class="card">
            <h2>📊 Dashboard Agregado</h2>
            <p class="desc">Datos de 3 backends distintos, combinados en <strong>1 sola respuesta</strong></p>

            <div class="summary-cards">
              <!-- ?. es optional chaining: si dashboard() es null, devuelve undefined -->
              <!-- ?? es nullish coalescing: si el valor es null/undefined, usa 0 -->
              <div class="stat">
                <span class="stat-num">{{ dashboard()?.summary?.totalOrders ?? 0 }}</span>
                <span class="stat-label">Órdenes</span>
              </div>
              <div class="stat">
                <span class="stat-num">\${{ dashboard()?.summary?.totalRevenue ?? 0 }}</span>
                <span class="stat-label">Ingresos</span>
              </div>
              <div class="stat warn">
                <span class="stat-num">{{ dashboard()?.summary?.lowStockProducts ?? 0 }}</span>
                <span class="stat-label">Stock Bajo</span>
              </div>
            </div>
            <div class="user-info">
              <strong>{{ dashboard()?.user?.name }}</strong> — {{ dashboard()?.user?.email }}
              <span class="role-tag">{{ dashboard()?.user?.role }}</span>
            </div>
          </section>

          <!-- Comparación entre datos crudos y transformados -->
          <section class="card full-compare">
            <h2>⚖️ Lo que el navegador recibe</h2>

            <!-- Tabs para alternar entre vista sin BFF y con BFF -->
            <div class="tabs">
              <button class="tab" [class.active]="tab() === 'direct'" (click)="tab.set('direct')">❌ Sin BFF (directo)</button>
              <button class="tab" [class.active]="tab() === 'bff'" (click)="tab.set('bff')">✅ Con BFF</button>
            </div>

            @if (tab() === 'direct') {
              <div class="payload-view">
                <div class="payload-header">
                  <span class="payload-badge bad">3 respuestas</span>
                  <span>{{ totalRawBytes() }}B total</span>
                </div>
                <div class="payload-group">
                  <div class="payload-label">GET /api/users — {{ rawUsersBytes() }}B</div>
                  <pre>{{ rawUsersJson() }}</pre>
                  <div class="highlight-bad">⚠️ Datos sensibles expuestos al navegador (seguro social, tarjeta de crédito)</div>
                </div>
                <div class="payload-group">
                  <div class="payload-label">GET /api/orders — {{ rawOrdersBytes() }}B</div>
                  <pre>{{ rawOrdersJson() }}</pre>
                </div>
                <div class="payload-group">
                  <div class="payload-label">GET /api/products — {{ rawProductsJson().length }}B</div>
                  <pre>{{ rawProductsJson() }}</pre>
                </div>
              </div>
            } @else {
              <div class="payload-view">
                <div class="payload-header">
                  <span class="payload-badge good">1 respuesta</span>
                  <span>{{ bffBytes() }}B total</span>
                </div>
                <div class="payload-group">
                  <div class="payload-label">GET /api/bff/dashboard — {{ bffBytes() }}B</div>
                  <pre>{{ bffJson() }}</pre>
                  <div class="highlight-good">
                    ✅ Datos sensibles ocultos · ✅ Precios formateados · ✅ Stock simplificado · ✅ Datos agregados
                  </div>
                </div>
              </div>
            }
          </section>
        </main>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .topbar {
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      color: #e0e0e0; padding: 1rem 2rem;
      display: flex; align-items: center; justify-content: space-between;
      border-bottom: 3px solid #e94560;
    }
    .topbar h1 { font-size: 1.5rem; margin: 0; }
    .topbar .dim { font-weight: 400; font-size: 1rem; color: #8899aa; }
    .badge {
      font-size: 0.85rem; padding: 0.35rem 0.9rem; border-radius: 20px;
      background: #333; color: #999;
    }
    .badge.on { background: #065f46; color: #6ee7b7; }

    .layout { display: flex; gap: 1.5rem; padding: 1.5rem; max-width: 1400px; margin: 0 auto; align-items: flex-start; }
    .sidebar { width: 320px; flex-shrink: 0; display: flex; flex-direction: column; gap: 1rem; position: sticky; top: 1.5rem; }
    .content { flex: 1; display: flex; flex-direction: column; gap: 1.5rem; }

    .card {
      background: #fff; border-radius: 12px; padding: 1.5rem;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }
    .card h2 { margin: 0 0 0.25rem; font-size: 1.2rem; }
    .card h3 { margin: 0 0 0.5rem; font-size: 1rem; }
    .desc { color: #64748b; font-size: 0.9rem; margin-bottom: 1rem; }

    .loading-card, .error-card { text-align: center; padding: 4rem; }
    .spinner {
      width: 36px; height: 36px; border: 4px solid #e2e8f0;
      border-top-color: #3b82f6; border-radius: 50%;
      animation: spin 0.8s linear infinite; margin: 0 auto 1rem;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .arch-flows { display: flex; flex-direction: column; gap: 0.75rem; }
    .flow-header { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.4rem; }
    .flow-calls { display: flex; flex-direction: column; gap: 0.3rem; }
    .call {
      font-family: monospace; font-size: 0.75rem;
      padding: 0.35rem 0.6rem; border-radius: 6px;
      display: flex; justify-content: space-between;
    }
    .call .bytes { color: #64748b; }
    .bad .call { background: #fef2f2; border-left: 3px solid #ef4444; }
    .good .call.single { background: #f0fdf4; border-left: 3px solid #22c55e; }
    .flow-total { font-size: 0.8rem; padding: 0.4rem 0; }
    .flow-vs { text-align: center; font-size: 0.8rem; font-weight: 700; color: #64748b; }

    .savings {
      margin-top: 0.75rem; padding: 0.75rem; background: #f0fdf4;
      border-radius: 8px; font-size: 0.85rem; text-align: center;
    }
    .bar-track {
      height: 8px; background: #e2e8f0; border-radius: 4px;
      margin: 0.4rem auto; max-width: 200px; overflow: hidden;
    }
    .bar-fill { height: 100%; background: linear-gradient(90deg, #22c55e, #16a34a); border-radius: 4px; transition: width 0.5s; }

    .bff-actions { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
    .bff-actions li { font-size: 0.85rem; display: flex; align-items: center; gap: 0.5rem; }
    .tag {
      font-size: 0.6rem; font-weight: 700; text-transform: uppercase;
      padding: 0.15rem 0.4rem; border-radius: 4px; letter-spacing: 0.5px;
    }
    .tag.auth { background: #fef3c7; color: #92400e; }
    .tag.sanitize { background: #dbeafe; color: #1e40af; }
    .tag.aggregate { background: #e0e7ff; color: #3730a3; }
    .tag.transform { background: #f3e8ff; color: #6b21a8; }

    .summary-cards { display: flex; gap: 1rem; margin-bottom: 1rem; }
    .stat {
      background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;
      padding: 1rem 1.5rem; text-align: center; flex: 1;
    }
    .stat-num { display: block; font-size: 1.5rem; font-weight: 700; color: #1e293b; }
    .stat-label { font-size: 0.8rem; color: #64748b; }
    .stat.warn .stat-num { color: #d97706; }
    .user-info { font-size: 0.9rem; color: #475569; display: flex; align-items: center; gap: 0.5rem; }
    .role-tag { background: #dbeafe; color: #1e40af; font-size: 0.75rem; padding: 0.15rem 0.5rem; border-radius: 6px; }

    .tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
    .tab {
      flex: 1; padding: 0.6rem; border: 2px solid #e2e8f0; border-radius: 8px;
      background: #f8fafc; cursor: pointer; font-size: 0.85rem; font-weight: 600;
      transition: all 0.15s;
    }
    .tab.active { border-color: #3b82f6; background: #eff6ff; }
    .tab:not(.active):hover { border-color: #94a3b8; }

    .payload-view { display: flex; flex-direction: column; gap: 1rem; }
    .payload-header {
      display: flex; align-items: center; gap: 0.75rem;
      font-size: 0.85rem; font-weight: 600;
    }
    .payload-badge {
      font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 6px;
    }
    .payload-badge.bad { background: #fef2f2; color: #dc2626; }
    .payload-badge.good { background: #f0fdf4; color: #16a34a; }

    .payload-group { border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
    .payload-label {
      background: #f8fafc; padding: 0.4rem 0.75rem;
      font-family: monospace; font-size: 0.75rem; color: #475569;
      border-bottom: 1px solid #e2e8f0;
    }
    pre {
      margin: 0; padding: 0.75rem; font-size: 0.7rem; line-height: 1.5;
      background: #1e293b; color: #e2e8f0; overflow-x: auto;
      max-height: 200px; overflow-y: auto;
    }
    .highlight-bad { padding: 0.4rem 0.75rem; font-size: 0.75rem; color: #dc2626; background: #fef2f2; }
    .highlight-good { padding: 0.4rem 0.75rem; font-size: 0.75rem; color: #16a34a; background: #f0fdf4; }
  `]
})
export class AppComponent implements OnInit {
  // inject(): obtiene el servicio BffService de Angular
  private readonly bff = inject(BffService);

  // signals(): variables reactivas que Angular observa para actualizar el template
  readonly tab = signal<'direct' | 'bff'>('bff'); // Pestaña activa
  readonly loggedIn = signal(false); // Estado de login
  readonly loading = signal(true); // Estado de carga
  readonly error = signal(''); // Mensaje de error

  // Datos del backend (sin transformar)
  readonly dashboard = signal<BffDashboardData | null>(null);
  readonly transformedProducts = signal<TransformedProduct[]>([]);
  readonly rawUsers = signal<RawUser[]>([]);
  readonly rawOrders = signal<Order[]>([]);
  readonly rawProducts = signal<Product[]>([]);

  // computed(): valores derivados que se recalculan automáticamente cuando cambian los signals
  // Convierten los datos a JSON formateado para mostrar en la interfaz
  readonly rawUsersJson = computed(() => JSON.stringify(this.rawUsers(), null, 2));
  readonly rawOrdersJson = computed(() => JSON.stringify(this.rawOrders(), null, 2));
  readonly rawProductsJson = computed(() => JSON.stringify(this.rawProducts(), null, 2));
  readonly bffJson = computed(() => JSON.stringify(this.dashboard(), null, 2));

  // Calculamos el tamaño en bytes de cada respuesta (para comparar transferencia de datos)
  readonly rawUsersBytes = computed(() => new Blob([this.rawUsersJson()]).size);
  readonly rawOrdersBytes = computed(() => new Blob([this.rawOrdersJson()]).size);
  readonly rawProductsBytes = computed(() => new Blob([this.rawProductsJson()]).size);
  readonly totalRawBytes = computed(() => this.rawUsersBytes() + this.rawOrdersBytes() + this.rawProductsBytes());
  readonly bffBytes = computed(() => new Blob([this.bffJson()]).size);
  
  // Porcentaje de ahorro al usar BFF vs llamadas directas
  readonly savingsPercent = computed(() => {
    const raw = this.totalRawBytes();
    const bff = this.bffBytes();
    if (raw === 0) return 0;
    return Math.round((1 - bff / raw) * 100);
  });
  readonly bffPercentOfRaw = computed(() => {
    const raw = this.totalRawBytes();
    if (raw === 0) return 100;
    return Math.round((this.bffBytes() / raw) * 100);
  });

  // ngOnInit(): hook del ciclo de vida que se ejecuta al iniciar el componente
  // Aquí hacemos el login y cargamos los datos
  ngOnInit() {
    this.bff.login().subscribe({
      next: () => {
        this.loggedIn.set(true);
        this.loadAll(); // Una vez logueado, cargamos todos los datos
      },
      error: (e) => {
        this.error.set('Error de login: ' + e.message);
        this.loading.set(false);
      },
    });
  }

  // Carga todos los datos en paralelo (llamadas HTTP simultáneas)
  private loadAll() {
    this.bff.getDashboardData().subscribe({
      next: (d) => this.dashboard.set(d),
      error: (e) => this.error.set('Error dashboard: ' + e.message),
    });
    this.bff.getTransformedProducts().subscribe({
      next: (p) => this.transformedProducts.set(p),
      error: (e) => this.error.set('Error products: ' + e.message),
    });
    this.bff.getRawUsers().subscribe({
      next: (u) => this.rawUsers.set(u),
      error: (e) => this.error.set('Error raw users: ' + e.message),
    });
    this.bff.getRawOrders().subscribe({
      next: (o) => this.rawOrders.set(o),
      error: (e) => this.error.set('Error raw orders: ' + e.message),
    });
    this.bff.getRawProducts().subscribe({
      next: (p) => { this.rawProducts.set(p); this.loading.set(false); },
      error: (e) => { this.error.set('Error raw products: ' + e.message); this.loading.set(false); },
    });
  }
}
