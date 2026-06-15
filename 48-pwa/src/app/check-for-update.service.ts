import { Injectable, inject, signal } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({ providedIn: 'root' })
export class CheckForUpdateService {
  private readonly swUpdate = inject(SwUpdate);
  readonly updateAvailable = signal(false);

  constructor() {
    if (!this.swUpdate.isEnabled) return;
    this.swUpdate.versionUpdates.subscribe((event) => {
      if (event.type === 'VERSION_READY') {
        this.updateAvailable.set(true);
      }
    });
  }

  activateUpdate(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.activateUpdate().then(() => document.location.reload());
    }
  }
}
