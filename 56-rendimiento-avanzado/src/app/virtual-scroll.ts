import { Component } from '@angular/core';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-virtual-scroll',
  standalone: true,
  imports: [ScrollingModule],
  template: `
    <section class="demo-section">
      <h2>Virtual Scrolling (CDK)</h2>
      <p class="note">Rendering {{ items.length }} items with virtualization for smooth performance.</p>

      <cdk-virtual-scroll-viewport itemSize="50" class="viewport">
        <div *cdkVirtualFor="let item of items" class="list-item">
          <span class="id">#{{ item.id }}</span>
          <span class="text">{{ item.text }}</span>
        </div>
      </cdk-virtual-scroll-viewport>
    </section>
  `,
  styles: [`
    .demo-section { margin: 2rem 0; }
    h2 { color: #1e293b; margin-bottom: 0.5rem; }
    .note { color: #64748b; font-size: 0.875rem; margin-bottom: 1rem; }
    .viewport { height: 400px; border: 1px solid #e2e8f0; border-radius: 8px; background: white; }
    .list-item { display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; height: 50px; border-bottom: 1px solid #f1f5f9; }
    .list-item:nth-child(even) { background: #f8fafc; }
    .id { font-weight: 600; color: #3b82f6; min-width: 60px; }
    .text { color: #334155; }
  `]
})
export class VirtualScrollComponent {
  items = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    text: `Item number ${i + 1} — this text demonstrates virtual scrolling`
  }));
}
