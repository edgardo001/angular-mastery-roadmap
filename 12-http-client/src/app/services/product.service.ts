// ============================================================================
// SERVICIO DE PRODUCTOS (product.service.ts)
// ============================================================================
// Este servicio encapsula todas las peticiones HTTP para gestionar productos.
// Es como un "traductor" entre la aplicación y el servidor API.

// Injectable: Decorador que permite a Angular inyectar este servicio
// inject(): Función moderna para obtener dependencias sin constructor
import { Injectable, inject } from '@angular/core';

// HttpClient: Servicio de Angular para hacer peticiones HTTP (GET, POST, PUT, DELETE)
// HttpParams: Para agregar parámetros de consulta (?_limit=10)
// HttpContext: Para pasar datos a los interceptores sin modificar la petición
import { HttpClient, HttpParams, HttpContext } from '@angular/common/http';

// Observable: Tipo de dato asíncrono de RxJS (similar a Promise pero más potente)
// map: Operador de RxJS para transformar datos antes de llegar al subscriber
import { Observable, map } from 'rxjs';

// Token de contexto para decirle al interceptor auth que NO agregue el token
import { SKIP_AUTH } from '../interceptors/skip-auth.context';

// Interfaces: Contratos de tipo que definen la forma de los datos
// Es como un "plano" que dice qué campos tiene un objeto
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// @Injectable({ providedIn: 'root' }): Servicio singleton (una sola instancia)
// Angular crea UN servicio y lo comparte con todos los componentes que lo pidan
@Injectable({ providedIn: 'root' })
export class ProductService {
  // inject(HttpClient): Obtiene una instancia de HttpClient para hacer peticiones HTTP
  private http = inject(HttpClient);

  // Método privado que transforma un Post de la API en un Product de nuestra app
  // mapToProduct: Convierte los datos del servidor al formato que necesitamos
  private mapToProduct(post: Post): Product {
    return {
      id: post.id,
      title: post.title,
      price: +(Math.random() * 100 + 10).toFixed(2),  // Precio simulado
      description: post.body,
      category: 'general',
    };
  }

  // GET: Obtener todos los productos (limitados a 10)
  // .pipe(map(...)): Transforma la respuesta antes de que llegue al componente
  getProducts(): Observable<Product[]> {
    return this.http
      .get<Post[]>(API_URL, {
        params: new HttpParams().set('_limit', '10'),  // Agrega ?_limit=10 a la URL
      })
      .pipe(map((posts) => posts.map((p) => this.mapToProduct(p))));
  }

  // GET: Obtener un solo producto por ID
  getProduct(id: number): Observable<Product> {
    return this.http
      .get<Post>(`${API_URL}/${id}`)
      .pipe(map((post) => this.mapToProduct(post)));
  }

  // POST: Crear un nuevo producto
  // HttpContext: Pasamos SKIP_AUTH=true para que el interceptor auth no agregue el token
  // ANÁLOGÍA: Es como ir por una puerta especial que no requiere credencial
  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http
      .post<Post>(API_URL, product, {
        context: new HttpContext().set(SKIP_AUTH, true),
      })
      .pipe(map((post) => this.mapToProduct(post)));
  }

  // PUT: Actualizar un producto existente
  updateProduct(product: Product): Observable<Product> {
    return this.http
      .put<Post>(`${API_URL}/${product.id}`, product)
      .pipe(map((post) => this.mapToProduct(post)));
  }

  // DELETE: Eliminar un producto por ID
  // También usa SKIP_AUTH porque DELETE es una operación que no necesita autenticación
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`, {
      context: new HttpContext().set(SKIP_AUTH, true),
    });
  }

  // GET con filtro: Buscar productos por categoría
  // Filtra en el cliente (en el navegador) por el título del post
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http
      .get<Post[]>(API_URL, {
        params: new HttpParams().set('_limit', '10'),
      })
      .pipe(
        map((posts) =>
          posts
            .filter((p) => p.title.toLowerCase().includes(category.toLowerCase()))
            .map((p) => this.mapToProduct(p)),
        ),
      );
  }
}
