import { Injectable } from '@angular/core';

export interface Identifiable {
  id: string | number;
}

@Injectable()
export class GenericCrudService<T extends Identifiable> {
  protected items: T[] = [];

  getAll(): T[] {
    return [...this.items];
  }

  getById(id: T['id']): T | undefined {
    return this.items.find(item => item.id === id);
  }

  create(item: T): T {
    this.items.push(item);
    return item;
  }

  update(id: T['id'], partial: Partial<T>): T | undefined {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return undefined;
    this.items[index] = { ...this.items[index], ...partial };
    return this.items[index];
  }

  delete(id: T['id']): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }

  count(): number {
    return this.items.length;
  }
}
