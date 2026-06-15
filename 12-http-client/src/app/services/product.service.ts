import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpContext } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SKIP_AUTH } from '../interceptors/skip-auth.context';

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

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  private mapToProduct(post: Post): Product {
    return {
      id: post.id,
      title: post.title,
      price: +(Math.random() * 100 + 10).toFixed(2),
      description: post.body,
      category: 'general',
    };
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Post[]>(API_URL, {
        params: new HttpParams().set('_limit', '10'),
      })
      .pipe(map((posts) => posts.map((p) => this.mapToProduct(p))));
  }

  getProduct(id: number): Observable<Product> {
    return this.http
      .get<Post>(`${API_URL}/${id}`)
      .pipe(map((post) => this.mapToProduct(post)));
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http
      .post<Post>(API_URL, product, {
        context: new HttpContext().set(SKIP_AUTH, true),
      })
      .pipe(map((post) => this.mapToProduct(post)));
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http
      .put<Post>(`${API_URL}/${product.id}`, product)
      .pipe(map((post) => this.mapToProduct(post)));
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`, {
      context: new HttpContext().set(SKIP_AUTH, true),
    });
  }

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
