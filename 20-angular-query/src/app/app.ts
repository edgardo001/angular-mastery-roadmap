import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { injectQuery, injectMutation, injectQueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Post {
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private http = inject(HttpClient);
  private queryClient = injectQueryClient();

  newTitle = signal('');

  postsQuery = injectQuery(() => ({
    queryKey: ['posts'],
    queryFn: () =>
      lastValueFrom(
        this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts').pipe(
          map(posts => posts.slice(0, 10))
        )
      ),
    staleTime: 1000 * 60 * 5,
  }));

  createMutation = injectMutation(() => ({
    mutationFn: (title: string) =>
      lastValueFrom(
        this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', {
          title,
          body: 'lorem ipsum',
          userId: 1,
        })
      ),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  }));

  deleteMutation = injectMutation(() => ({
    mutationFn: (id: number) =>
      lastValueFrom(
        this.http.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      ),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  }));

  createPost() {
    const title = this.newTitle();
    if (title.trim()) {
      this.createMutation.mutate(title);
      this.newTitle.set('');
    }
  }

  deletePost(id: number) {
    this.deleteMutation.mutate(id);
  }
}
