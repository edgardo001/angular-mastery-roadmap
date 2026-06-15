import { Component, inject, signal } from '@angular/core';
import { InventoryService } from './inventory.service';
import { InventoryItem } from '../shared';

@Component({
  selector: 'app-inventory',
  imports: [],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent {
  private readonly service = inject(InventoryService);
  readonly items = signal<InventoryItem[]>([]);

  constructor() {
    this.service.getItems().subscribe(items => this.items.set(items));
  }
}
