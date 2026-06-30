/**
 * ARCHIVO: countries.component.ts - Componente de Países con GraphQL
 *
 * Este componente demuestra cómo usar GraphQL con Apollo Angular para:
 * 1. Obtener datos de una API GraphQL real (países del mundo)
 * 2. Mostrar los datos en una interfaz de usuario interactiva
 * 3. Filtrar y buscar países en tiempo real
 * 4. Calcular estadísticas dinámicamente
 *
 * GraphQL vs REST en este ejemplo:
 * - REST: GET /api/countries → devuelve TODOS los campos de TODOS los países
 * - GraphQL: query { countries { name, capital } } → solo los campos que necesitas
 *
 * Analogía: Es como ir al supermercado. En REST pides "una caja de cereal"
 * y te dan todo lo que hay en el estante. En GraphQL puedes pedir
 * "solo el cereal marca X, tamaño familiar" y te dan exactamente eso.
 *
 * API usada: https://countries.trevorblades.com/graphql
 * - Gratuita, no requiere autenticación
 * - Datos reales de todos los países del mundo
 */

// Component: Decorador de Angular que define las propiedades de un componente.
// inject: Función para obtener servicios sin constructores.
// signal: Función para crear valores reactivos (como variables que notifican cambios).
import { Component, inject, OnInit, signal } from '@angular/core';

// CommonModule: Directivas básicas de Angular (*ngIf, *ngFor, etc.)
import { CommonModule } from '@angular/common';

// FormsModule: Directivas para formularios [(ngModel)]
import { FormsModule } from '@angular/forms';

// Apollo: Cliente GraphQL para Angular. Permite ejecutar queries y mutations.
import { Apollo } from 'apollo-angular';

// Importamos las consultas GraphQL y los tipos de respuesta.
import {
  GET_COUNTRIES,
  SEARCH_COUNTRIES,
  Country,
  GetCountriesResponse,
} from '../countries.graphql';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="countries-container">
      <h2>Países del Mundo (GraphQL)</h2>
      <p class="subtitle">Datos reales de la API GraphQL de países</p>
      
      <!-- Barra de búsqueda -->
      <div class="search-bar">
        <input 
          type="text" 
          [(ngModel)]="searchTerm"
          (input)="searchCountries()"
          placeholder="Buscar país por nombre..."
          class="search-input" />
        <span class="result-count">{{ filteredCountries().length }} países</span>
      </div>

      <!-- Indicador de carga -->
      @if (loading()) {
        <div class="loading">
          <div class="spinner"></div>
          <p>Cargando países...</p>
        </div>
      }

      <!-- Mensaje de error -->
      @if (error()) {
        <div class="error">
          <p>Error: {{ error() }}</p>
          <button (click)="loadCountries()">Reintentar</button>
        </div>
      }

      <!-- Grid de países -->
      @if (!loading() && !error()) {
        <div class="countries-grid">
          @for (country of filteredCountries(); track country.code) {
            <div class="country-card">
              <span class="flag">{{ country.emoji }}</span>
              <h3>{{ country.name }}</h3>
              <div class="info">
                <p><strong>Código:</strong> {{ country.code }}</p>
                <p><strong>Capital:</strong> {{ country.capital || 'N/A' }}</p>
                <p><strong>Moneda:</strong> {{ country.currency || 'N/A' }}</p>
                <p><strong>Idiomas:</strong> {{ formatLanguages(country.languages) }}</p>
                @if (country.continent) {
                  <p><strong>Continente:</strong> {{ country.continent.name }}</p>
                }
              </div>
            </div>
          } @empty {
            <div class="no-results">
              <p>No se encontraron países con "{{ searchTerm }}"</p>
            </div>
          }
        </div>
      }

      <!-- Estadísticas -->
      @if (!loading()) {
        <div class="stats">
          <h3>Estadísticas</h3>
          <div class="stat-grid">
            <div class="stat">
              <span class="stat-value">{{ allCountries().length }}</span>
              <span class="stat-label">Total países</span>
            </div>
            <div class="stat">
              <span class="stat-value">{{ getCurrenciesCount() }}</span>
              <span class="stat-label">Monedas</span>
            </div>
            <div class="stat">
              <span class="stat-value">{{ getLanguagesCount() }}</span>
              <span class="stat-label">Idiomas</span>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .countries-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .subtitle {
      color: #666;
      margin-bottom: 20px;
    }

    .search-bar {
      display: flex;
      gap: 15px;
      align-items: center;
      margin-bottom: 20px;
    }

    .search-input {
      flex: 1;
      padding: 12px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.2s;
    }

    .search-input:focus {
      border-color: #1a73e8;
      outline: none;
    }

    .result-count {
      color: #666;
      font-size: 14px;
      white-space: nowrap;
    }

    .loading {
      text-align: center;
      padding: 60px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e0e0e0;
      border-top-color: #1a73e8;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .error {
      text-align: center;
      padding: 40px;
      background: #ffebee;
      border-radius: 8px;
    }

    .error button {
      margin-top: 10px;
      padding: 10px 20px;
      background: #1a73e8;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    .error button:hover {
      background: #1557b0;
    }

    .countries-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }

    .country-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
    }

    .country-card:hover {
      transform: translateY(-4px);
    }

    .flag {
      font-size: 40px;
    }

    .country-card h3 {
      margin: 10px 0;
      color: #1a1a2e;
    }

    .info p {
      margin: 5px 0;
      font-size: 14px;
      color: #666;
    }

    .no-results {
      grid-column: 1 / -1;
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .stats {
      margin-top: 40px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 12px;
    }

    .stat-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 15px;
    }

    .stat {
      text-align: center;
    }

    .stat-value {
      display: block;
      font-size: 24px;
      font-weight: bold;
      color: #1a73e8;
    }

    .stat-label {
      color: #666;
      font-size: 14px;
    }
  `],
})
export class CountriesComponent implements OnInit {
  /**
   * apollo: Cliente Apollo para ejecutar consultas GraphQL.
   * Se inyecta mediante la función inject() en lugar del constructor.
   */
  private apollo = inject(Apollo);

  /**
   * allCountries: Signal que contiene TODOS los países del servidor.
   * Se usa como fuente de verdad para el filtrado local.
   */
  allCountries = signal<Country[]>([]);

  /**
   * filteredCountries: Signal que contiene los países filtrados.
   * Se actualiza cuando el usuario escribe en el campo de búsqueda.
   */
  filteredCountries = signal<Country[]>([]);

  /**
   * loading: Signal que indica si se está cargando datos del servidor.
   * Se usa en el template para mostrar un indicador de carga.
   */
  loading = signal(true);

  /**
   * error: Signal que contiene un mensaje de error si la consulta falla.
   * Se usa en el template para mostrar errores al usuario.
   */
  error = signal<string | null>(null);

  /**
   * searchTerm: Variable del template para el campo de búsqueda.
   * Se usa con [(ngModel)] para双向绑定 (two-way binding).
   */
  searchTerm = '';

  /**
   * ngOnInit: Se ejecuta una vez cuando el componente se inicializa.
   * Aquí cargamos la lista inicial de países.
   */
  ngOnInit() {
    this.loadCountries();
  }

  /**
   * loadCountries: Obtiene la lista de países del servidor GraphQL.
   *
   * watchQuery(): Crea una consulta "observable" que:
   * 1. Se ejecuta inmediatamente
   * 2. Se re-ejecuta cuando cambian los datos en la caché
   * 3. Actualiza automáticamente el template cuando llegan nuevos datos
   *
   * Flujo:
   * 1. Establecemos loading = true (mostramos spinner)
   * 2. Ejecutamos la consulta GraphQL GET_COUNTRIES
   * 3. Cuando llegan los datos, actualizamos los signals
   * 4. Establecemos loading = false (ocultamos spinner)
   */
  loadCountries() {
    this.loading.set(true);
    this.error.set(null);

    /**
     * watchQuery<GetCountriesResponse>: Tipa la respuesta del servidor.
     * valueChanges: Observable que emite cada vez que cambian los datos.
     * subscribe(): Nos suscribimos para recibir los datos cuando lleguen.
     */
    this.apollo
      .watchQuery<GetCountriesResponse>({
        query: GET_COUNTRIES,
      })
      .valueChanges.subscribe({
        next: ({ data, loading }) => {
          this.loading.set(loading);
          if (data?.countries) {
            this.allCountries.set(data.countries);
            this.filteredCountries.set(data.countries);
          }
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err.message);
        },
      });
  }

  /**
   * searchCountries: Filtra países por nombre o código.
   *
   * Este es un filtrado LOCAL (no se hace al servidor).
   * El usuario escribe en el campo de búsqueda y Angular filtra
   * la lista de países en tiempo real.
   *
   * Analogía: Es como usar Ctrl+F en un documento. No vuelves a descargar
   * el documento, solo buscas dentro de lo que ya tienes.
   */
  searchCountries() {
    const term = this.searchTerm.toLowerCase();
    if (!term) {
      this.filteredCountries.set(this.allCountries());
      return;
    }
    const filtered = this.allCountries().filter(
      (c) =>
        c.name.toLowerCase().includes(term) || c.code.toLowerCase().includes(term)
    );
    this.filteredCountries.set(filtered);
  }

  /**
   * formatLanguages: Convierte un array de idiomas a un string legible.
   *
   * @param languages - Array de objetos { name: string }
   * @returns String con los idiomas separados por comas
   *
   * Ejemplo: [{ name: "Spanish" }, { name: "English" }] → "Spanish, English"
   */
  formatLanguages(languages: { name: string }[]): string {
    return languages?.map((l) => l.name).join(', ') || 'N/A';
  }

  /**
   * getCurrenciesCount: Cuenta cuántas monedas diferentes hay.
   *
   * Usa un Set para eliminar duplicados (muchos países usan el euro, por ejemplo).
   * El Set solo almacena valores únicos.
   */
  getCurrenciesCount(): number {
    const currencies = new Set(
      this.allCountries().map((c) => c.currency).filter(Boolean)
    );
    return currencies.size;
  }

  /**
   * getLanguagesCount: Cuenta cuántos idiomas diferentes hay.
   *
   * Usa flatMap para aplanar todos los arrays de idiomas en uno solo,
   * luego Set para eliminar duplicados.
   */
  getLanguagesCount(): number {
    const languages = new Set(
      this.allCountries().flatMap((c) => c.languages?.map((l) => l.name) || [])
    );
    return languages.size;
  }
}
