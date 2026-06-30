/**
 * COMPONENTE PRINCIPAL CON TANSTACK QUERY (App)
 * ==============================================
 *
 * Demuestra cómo usar TanStack Query para gestionar datos del servidor.
 * TanStack Query maneja: caché, reintentos, loading states, errores, etc.
 *
 * ANÁLOGÍA: Es como un gerente de biblioteca.
 * - Las "queries" son como pedir libros al sistema
 * - La "caché" es como tener libros prestados en tu escritorio
 * - Las "mutations" son como pedir libros nuevos o devolverlos
 *
 * PALABRAS CLAVE:
 * - injectQuery(): Crea una query que obtiene datos del servidor
 * - injectMutation(): Crea una mutación que modifica datos en el servidor
 * - injectQueryClient(): Accede al administrador de caché
 * - queryKey: Identificador único de la query (para caché)
 * - queryFn: Función que ejecuta la petición HTTP
 * - staleTime: Tiempo que los datos se consideran "frescos" (no refrescar)
 * - invalidateQueries(): Marca datos como "obsoletos" para refrescarlos
 * - lastValueFrom(): Convierte Observable a Promise (para usar async/await)
 *
 * FLUJO DE UNA QUERY:
 * 1. La query se ejecuta (fetch de datos)
 * 2. Los datos se guardan en caché
 * 3. Si alguien pide los mismos datos, usa la caché
 * 4. Después de staleTime, la caché se considera obsoleta
 * 5. Se vuelven a obtener datos frescos del servidor
 *
 * FLUJO DE UNA MUTACIÓN:
 * 1. El usuario ejecuta la mutación (crear, editar, eliminar)
 * 2. Se envía la petición al servidor
 * 3. Si es exitosa, se invalida la caché relacionada
 * 4. Las queries relacionadas se refrescan automáticamente
 */

// Component: Decorador del componente
// inject, signal: Herramientas de Angular para dependencias y reactividad
import { Component, inject, signal } from '@angular/core';

// FormsModule: Necesario para [(ngModel)] (two-way binding)
import { FormsModule } from '@angular/forms';

// Herramientas de TanStack Query para Angular
// injectQuery: Crea una query para obtener datos
// injectMutation: Crea una mutación para modificar datos
// injectQueryClient: Accede al administrador de caché
import { injectQuery, injectMutation, injectQueryClient } from '@tanstack/angular-query-experimental';

// lastValueFrom: Convierte Observable de RxJS a Promise
// map: Operador de RxJS para transformar datos
import { lastValueFrom, map } from 'rxjs';

// HttpClient: Para hacer peticiones HTTP al servidor
import { HttpClient } from '@angular/common/http';

// Interfaz que define la estructura de un Post
interface Post {
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  // templateUrl: Archivo HTML externo con el template
  templateUrl: './app.html',
  // styleUrl: Archivo CSS externo con los estilos
  styleUrl: './app.css'
})
export class App {
  // inject(): Obtiene el HttpClient para hacer peticiones HTTP
  private http = inject(HttpClient);
  // injectQueryClient(): Obtiene el administrador de caché
  // Permite invalidar caché después de mutaciones
  private queryClient = injectQueryClient();

  // Signal para el título del nuevo post (two-way binding con input)
  newTitle = signal('');

  // injectQuery(): Crea una query para obtener posts del servidor
  // queryKey: ['posts']: Identificador único de la query (para caché)
  // queryFn: Función que ejecuta la petición HTTP
  // staleTime: 5 minutos - los datos se consideran "frescos" por 5 min
  postsQuery = injectQuery(() => ({
    queryKey: ['posts'],
    queryFn: () =>
      // lastValueFrom(): Convierte Observable a Promise
      // Esto permite usar async/await en lugar de subscribe
      lastValueFrom(
        // http.get: Hace una petición GET al servidor
        // map(posts => posts.slice(0, 10)): Toma solo los primeros 10 posts
        this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts').pipe(
          map(posts => posts.slice(0, 10))
        )
      ),
    // staleTime: Tiempo que los datos se consideran "frescos"
    // 1000 * 60 * 5 = 5 minutos en milisegundos
    staleTime: 1000 * 60 * 5,
  }));

  // injectMutation(): Crea una mutación para CREAR un post
  // mutationFn: Función que ejecuta la petición HTTP POST
  // onSuccess: Se ejecuta después de que la mutación es exitosa
  createMutation = injectMutation(() => ({
    mutationFn: (title: string) =>
      // http.post: Envía un POST al servidor para crear un nuevo post
      lastValueFrom(
        this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', {
          title,
          body: 'lorem ipsum',
          userId: 1,
        })
      ),
    // onSuccess: Se ejecuta después de crear el post exitosamente
    // invalidateQueries: Marca la query ['posts'] como obsoleta
    // Esto causa que la query se refresque automáticamente
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  }));

  // injectMutation(): Crea una mutación para ELIMINAR un post
  deleteMutation = injectMutation(() => ({
    mutationFn: (id: number) =>
      // http.delete: Envía DELETE al servidor para eliminar el post
      lastValueFrom(
        this.http.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      ),
    // Después de eliminar, refresca la lista de posts
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  }));

  // Método para crear un nuevo post
  createPost() {
    const title = this.newTitle();
    // trim(): Elimina espacios en blanco del inicio y final
    if (title.trim()) {
      // .mutate(): Ejecuta la mutación con el título
      this.createMutation.mutate(title);
      // Limpia el input después de crear
      this.newTitle.set('');
    }
  }

  // Método para eliminar un post por su ID
  deletePost(id: number) {
    this.deleteMutation.mutate(id);
  }
}
