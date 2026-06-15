import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  readonly result = signal<number>(0);
  readonly lastOperation = signal<string>('');

  add(a: number, b: number): number {
    const r = a + b;
    this.result.set(r);
    this.lastOperation.set('add');
    return r;
  }

  subtract(a: number, b: number): number {
    const r = a - b;
    this.result.set(r);
    this.lastOperation.set('subtract');
    return r;
  }

  multiply(a: number, b: number): number {
    const r = a * b;
    this.result.set(r);
    this.lastOperation.set('multiply');
    return r;
  }

  divide(a: number, b: number): number {
    if (b === 0) throw new Error('Cannot divide by zero');
    const r = a / b;
    this.result.set(r);
    this.lastOperation.set('divide');
    return r;
  }

  clear(): void {
    this.result.set(0);
    this.lastOperation.set('');
  }
}
