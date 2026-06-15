import { Injectable, signal } from '@angular/core';

export interface DataItem {
  id: number;
  label: string;
  value: number;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class HeavyDataService {
  private items = signal<DataItem[]>([]);
  readonly itemsSignal = this.items.asReadonly();
  readonly renderCount = signal(0);

  generateItems(count: number): void {
    this.renderCount.update((c) => c + 1);
    const data: DataItem[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      label: `Item #${i}`,
      value: Math.random() * 1000,
      timestamp: Date.now(),
    }));
    this.items.set(data);
  }
}
