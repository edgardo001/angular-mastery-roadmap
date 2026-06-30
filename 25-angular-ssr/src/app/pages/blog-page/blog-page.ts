// =============================================================================
// ARCHIVO: blog-page.ts
// PROPÓSITO: Página del blog que muestra lista de posts y detalle individual
// =============================================================================
//
// Este componente demuestra SSR en acción:
// - Cuando visitas /blog, muestra todos los posts (renderizado en servidor)
// - Cuando visitas /blog/1, muestra el post 1 con meta tags dinámicos
//
// ¿Por qué importa para SSR?
// Los motores de búsqueda (Google) ven el contenido completo del blog
// sin necesidad de ejecutar JavaScript. ¡El SEO funciona perfecto!
//
// También demuestra cómo usar Angular Meta service para actualizar
// dinámicamente los meta tags de cada página (título, descripción, etc.)
// =============================================================================

// Component: Decorador que define un componente Angular.
import { Component, inject } from '@angular/core';

// ActivatedRoute: Proporciona acceso a la información de la ruta actual.
// Es como un GPS que te dice exactamente dónde estás (qué URL, qué parámetros).
import { ActivatedRoute, RouterLink } from '@angular/router';

// Meta: Servicio para manipular las meta tags del <head> del HTML.
// Útil para SEO: cada página puede tener su propia descripción y título.
//
// Title: Service para cambiar el título de la página (<title> del browser).
// Es el texto que aparece en la pestaña del navegador.
import { Meta, Title } from '@angular/platform-browser';

// DatePipe: Pipe de Angular que formate fechas.
// Ejemplo: {{ '2026-03-15' | date:'longDate' }} → "March 15, 2026"
import { DatePipe } from '@angular/common';

// Interface que define la forma de un post del blog.
// Es como un "molde" que garantiza que cada post tenga las mismas propiedades.
// Si un post no cumple este molde, TypeScript lanzará un error.
interface Post {
  id: number;       // Identificador único del post
  title: string;    // Título del post
  excerpt: string;  // Resumen corto (se muestra en la lista)
  date: string;     // Fecha de publicación
  content: string;  // Contenido completo (se muestra en el detalle)
}

@Component({
  selector: 'app-blog-page',
  standalone: true,
  // imports: DatePipe se usa para formatear fechas en el template,
  // RouterLink para crear enlaces SPA a cada post.
  imports: [DatePipe, RouterLink],

  template: `
    <!-- @if: Nuevo control flow de Angular (reemplaza *ngIf) -->
    <!-- Si selectedPost tiene valor (no es null), muestra el detalle -->
    @if (selectedPost) {
      <article>
        <h1>{{ selectedPost.title }}</h1>
        <!-- Pipe | date:'longDate' convierte la fecha string a formato legible -->
        <time>{{ selectedPost.date | date:'longDate' }}</time>
        <p>{{ selectedPost.content }}</p>
        <!-- routerLink crea un enlace SPA sin recargar la página -->
        <a routerLink="/blog">← Back to posts</a>
      </article>
    } @else {
      <!-- Si no hay post seleccionado, muestra la lista de posts -->
      <section>
        <h1>Blog</h1>
        <p>Latest posts from our Angular SSR blog.</p>

        <!-- @for: Nuevo control flow de Angular (reemplaza *ngFor) -->
        <!-- Recorre el array "posts" y crea un artículo por cada post -->
        <!-- track post.id le dice a Angular cómo identificar cada elemento -->
        <!-- (mejora el rendimiento al actualizar la lista) -->
        @for (post of posts; track post.id) {
          <article>
            <!-- Enlace dinámico: [routerLink] usa corchetes porque el valor -->
            <!-- es una expresión JavaScript, no un string literal -->
            <h2><a [routerLink]="['/blog', post.id]">{{ post.title }}</a></h2>
            <time>{{ post.date | date:'mediumDate' }}</time>
            <p>{{ post.excerpt }}</p>
          </article>
        }
      </section>
    }
  `,

  styles: [`
    article { background: white; border-radius: 8px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    h1 { color: #1e40af; margin-bottom: 0.5rem; }
    h2 { margin-bottom: 0.25rem; }
    time { color: #6b7280; font-size: 0.875rem; }
    a { color: #1e40af; text-decoration: none; }
    a:hover { text-decoration: underline; }
    p { margin-top: 0.75rem; line-height: 1.7; }
  `]
})
export class BlogPage {
  // inject() es una función moderna de Angular para obtener servicios.
  // Es como pedir herramientas prestadas: en lugar de crearlas tú mismo,
  // Angular te da las que ya existen en la aplicación.
  //
  // Es equivalente a usar constructor(private route: ActivatedRoute)
  // pero más limpio y moderno (funcional vs. basado en clases).

  // GPS de la ruta actual: nos dice qué parámetros tiene la URL
  private route = inject(ActivatedRoute);

  // Servicio para modificar las meta tags del <head> (SEO)
  private meta = inject(Meta);

  // Servicio para cambiar el título de la pestaña del navegador
  private title = inject(Title);

  // Array de posts hardcodeados para el ejemplo.
  // En una app real, esto vendría de una API HTTP.
  posts: Post[] = [
    { id: 1, title: 'Angular SSR Guide', excerpt: 'Learn how Server-Side Rendering improves SEO and performance.', date: '2026-03-15', content: 'Angular SSR (Server-Side Rendering) allows you to render your Angular application on the server...' },
    { id: 2, title: 'Understanding Hydration', excerpt: 'Hydration is the process that reuses server-rendered DOM on the client.', date: '2026-04-01', content: 'Client hydration is the process where Angular takes over the server-rendered page...' },
    { id: 3, title: 'Meta Tags for SEO', excerpt: 'Dynamic meta tags help search engines understand your content better.', date: '2026-05-10', content: 'Using Angular Meta service, you can dynamically set meta tags for each route...' }
  ];

  // Almacena el post seleccionado (cuando el usuario visita /blog/:id)
  // null significa que no se ha seleccionado ningún post (estamos en la lista)
  selectedPost: Post | null = null;

  constructor() {
    // paramMap es un Observable que emite cada vez que cambian los parámetros de la URL.
    // Es como un "escucha activo" que notifica cuando el GPS detecta un nuevo destino.
    //
    // subscribe() se suscribe a ese observable y ejecuta el código cada vez
    // que llega un nuevo valor. Es como suscribirse a un canal de YouTube:
    // cada vez que hay un video nuevo, recibes una notificación.
    this.route.paramMap.subscribe(params => {
      // params.get('id') obtiene el parámetro "id" de la URL.
      // Si la URL es /blog/2, params.get('id') retorna "2" (string)
      const id = params.get('id');

      if (id) {
        // Si hay un id, busca el post correspondiente en el array.
        // +id convierte el string "2" al número 2 (operador unary plus)
        // find() retorna el primer elemento que cumpla la condición, o undefined
        this.selectedPost = this.posts.find(p => p.id === +id) || null;

        if (this.selectedPost) {
          // Actualiza el título de la pestaña del navegador
          this.title.setTitle(this.selectedPost.title);

          // Actualiza la meta tag "description" para SEO
          // Los motores de búsqueda usan esto para mostrar el snippet
          this.meta.updateTag({ name: 'description', content: this.selectedPost.excerpt });

          // Meta tags adicionales para mejorar el posicionamiento
          this.meta.updateTag({ name: 'keywords', content: 'Angular, SSR, SEO' });
        }
      } else {
        // Si no hay id, estamos en la lista de posts (no en un post individual)
        this.selectedPost = null;

        // Establece título y descripción genéricos para la página de lista
        this.title.setTitle('Angular SSR Blog');
        this.meta.updateTag({ name: 'description', content: 'A blog about Angular Server-Side Rendering' });
      }
    });
  }
}
