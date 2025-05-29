import { Directive, HostListener, input } from '@angular/core';
import { AppFormComponent } from '../core/types/component.types';

@Directive({
  selector: '[externalSubmit]'
})
export class ExternalSubmitDirective {
  externalSubmit = input.required<AppFormComponent>();

  @HostListener('click') onClick() {
    const form = this.externalSubmit();
    if (!form) {
      throw new Error('Form is undefined.')
    }

    form.submit();
  }
}
