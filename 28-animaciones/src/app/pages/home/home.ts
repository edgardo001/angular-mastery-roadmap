import { Component, signal } from '@angular/core';
import { fadeIn, slideIn, listStagger } from '../../animations';

@Component({
  selector: 'app-home',
  standalone: true,
  animations: [fadeIn, slideIn, listStagger],
  template: `
    <div style="max-width:700px;margin:2rem auto;padding:0 1rem;">
      <h1 [@fadeIn] style="color:#1e40af;font-size:2rem;">Angular Animations</h1>

      <section [@fadeIn] style="margin:2rem 0;">
        <p>Demonstrates fade-in, slide, stagger, enter/leave animations.</p>
      </section>

      <div style="display:flex;gap:0.5rem;margin-bottom:1.5rem;">
        <input #itemInput
          (keyup.enter)="addItem(itemInput.value); itemInput.value=''"
          placeholder="Add an item"
          style="flex:1;padding:0.5rem;border:1px solid #d1d5db;border-radius:4px;">
        <button (click)="addItem(itemInput.value); itemInput.value=''"
          style="padding:0.5rem 1rem;background:#1e40af;color:white;border:none;border-radius:4px;cursor:pointer;">
          Add
        </button>
      </div>

      <ul [@listStagger]="items().length" style="list-style:none;padding:0;">
        @for (item of items(); track item; let i = $index) {
          <li [@slideIn] style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem;margin-bottom:0.5rem;background:white;border-radius:6px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <span>{{ item }}</span>
            <button (click)="removeItem(i)"
              style="background:#ef4444;color:white;border:none;padding:0.25rem 0.75rem;border-radius:4px;cursor:pointer;">
              &times;
            </button>
          </li>
        }
      </ul>

      @if (items().length === 0) {
        <p [@fadeIn] style="text-align:center;color:#9ca3af;">No items yet</p>
      }
    </div>
  `
})
export class HomePage {
  items = signal<string[]>(['Angular', 'Animations', 'Signals']);

  addItem(text: string) {
    const trimmed = text.trim();
    if (trimmed) this.items.update(list => [...list, trimmed]);
  }

  removeItem(index: number) {
    this.items.update(list => list.filter((_, i) => i !== index));
  }
}
