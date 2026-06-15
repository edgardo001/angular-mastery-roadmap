import { Injectable, signal, WritableSignal } from '@angular/core';

export type FeatureFlagKey = 'newCheckout' | 'darkMode' | 'betaSearch';

@Injectable({ providedIn: 'root' })
export class FeatureFlagsService {
  private readonly flags = new Map<FeatureFlagKey, WritableSignal<boolean>>();

  constructor() {
    this.initFlag('newCheckout', false);
    this.initFlag('darkMode', false);
    this.initFlag('betaSearch', false);
  }

  isEnabled(key: FeatureFlagKey): boolean {
    return this.flags.get(key)?.() ?? false;
  }

  getSignal(key: FeatureFlagKey): WritableSignal<boolean> {
    if (!this.flags.has(key)) {
      this.initFlag(key, false);
    }
    return this.flags.get(key)!;
  }

  setFlag(key: FeatureFlagKey, value: boolean): void {
    this.getSignal(key).set(value);
  }

  toggle(key: FeatureFlagKey): void {
    const sig = this.getSignal(key);
    sig.update((v) => !v);
  }

  allFlags(): Array<{ key: FeatureFlagKey; value: boolean }> {
    return Array.from(this.flags.entries()).map(([key, sig]) => ({
      key,
      value: sig(),
    }));
  }

  private initFlag(key: FeatureFlagKey, defaultValue: boolean): void {
    this.flags.set(key, signal(defaultValue));
  }
}
