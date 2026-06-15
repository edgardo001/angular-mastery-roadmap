import { Directive, Input, TemplateRef, ViewContainerRef, inject, effect } from '@angular/core';
import { FeatureFlagsService, FeatureFlagKey } from './feature-flags.service';

@Directive({ selector: '[ffShow]' })
export class FeatureFlagShowDirective {
  private readonly flags = inject(FeatureFlagsService);
  private readonly template = inject(TemplateRef);
  private readonly container = inject(ViewContainerRef);

  private key: FeatureFlagKey = 'newCheckout';
  private negate = false;

  @Input() set ffShow(val: FeatureFlagKey) {
    this.key = val;
    this.negate = false;
    this.update();
  }

  @Input() set ffShowNegate(val: boolean) {
    this.negate = val;
    this.update();
  }

  private update(): void {
    const sig = this.flags.getSignal(this.key);
    effect(() => {
      const enabled = sig();
      if (this.negate ? !enabled : enabled) {
        this.container.createEmbeddedView(this.template);
      } else {
        this.container.clear();
      }
    });
  }
}

@Directive({ selector: '[ffHide]' })
export class FeatureFlagHideDirective {
  private readonly flags = inject(FeatureFlagsService);
  private readonly template = inject(TemplateRef);
  private readonly container = inject(ViewContainerRef);

  private key: FeatureFlagKey = 'newCheckout';

  @Input() set ffHide(val: FeatureFlagKey) {
    this.key = val;
    const sig = this.flags.getSignal(this.key);
    effect(() => {
      if (!sig()) {
        this.container.createEmbeddedView(this.template);
      } else {
        this.container.clear();
      }
    });
  }
}
