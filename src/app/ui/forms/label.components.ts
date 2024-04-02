import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-label',
  standalone: true,
  template: `<label
    for="hire-date"
    class="block text-sm font-medium mb-2 dark:text-white"
    >{{ label }}</label
  >`,
})
export class UIFormLabelComponent {
  @Input() label: string = '';
}
