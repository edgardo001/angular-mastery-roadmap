import { Component, inject } from '@angular/core';
import { FeatureFlagsService, FeatureFlagKey } from './feature-flags.service';
import { FeatureFlagShowDirective, FeatureFlagHideDirective } from './feature-flag.directive';

@Component({
  selector: 'app-root',
  imports: [FeatureFlagShowDirective, FeatureFlagHideDirective],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly flags = inject(FeatureFlagsService);

  toggle(key: FeatureFlagKey): void {
    this.flags.toggle(key);
  }

  get flagList() {
    return this.flags.allFlags();
  }
}
