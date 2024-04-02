import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'modal-classic',
  standalone: true,
  templateUrl: './modal-classic.component.html',
})
export class UIModalClassicComponent {
  @Input() title: string = '';
  @Output() close = new EventEmitter();

  @HostListener('document:keydown', ['$event'])
  handleEscapeEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') this.close.emit();
  }

  public closeModal(): void {
    this.close.emit();
  }
}
