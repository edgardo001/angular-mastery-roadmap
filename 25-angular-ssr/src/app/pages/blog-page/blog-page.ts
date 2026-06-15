import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  content: string;
}

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [DatePipe, RouterLink],
  template: `
    @if (selectedPost) {
      <article>
        <h1>{{ selectedPost.title }}</h1>
        <time>{{ selectedPost.date | date:'longDate' }}</time>
        <p>{{ selectedPost.content }}</p>
        <a routerLink="/blog">← Back to posts</a>
      </article>
    } @else {
      <section>
        <h1>Blog</h1>
        <p>Latest posts from our Angular SSR blog.</p>
        @for (post of posts; track post.id) {
          <article>
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
  private route = inject(ActivatedRoute);
  private meta = inject(Meta);
  private title = inject(Title);

  posts: Post[] = [
    { id: 1, title: 'Angular SSR Guide', excerpt: 'Learn how Server-Side Rendering improves SEO and performance.', date: '2026-03-15', content: 'Angular SSR (Server-Side Rendering) allows you to render your Angular application on the server...' },
    { id: 2, title: 'Understanding Hydration', excerpt: 'Hydration is the process that reuses server-rendered DOM on the client.', date: '2026-04-01', content: 'Client hydration is the process where Angular takes over the server-rendered page...' },
    { id: 3, title: 'Meta Tags for SEO', excerpt: 'Dynamic meta tags help search engines understand your content better.', date: '2026-05-10', content: 'Using Angular Meta service, you can dynamically set meta tags for each route...' }
  ];
  selectedPost: Post | null = null;

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.selectedPost = this.posts.find(p => p.id === +id) || null;
        if (this.selectedPost) {
          this.title.setTitle(this.selectedPost.title);
          this.meta.updateTag({ name: 'description', content: this.selectedPost.excerpt });
          this.meta.updateTag({ name: 'keywords', content: 'Angular, SSR, SEO' });
        }
      } else {
        this.selectedPost = null;
        this.title.setTitle('Angular SSR Blog');
        this.meta.updateTag({ name: 'description', content: 'A blog about Angular Server-Side Rendering' });
      }
    });
  }
}
