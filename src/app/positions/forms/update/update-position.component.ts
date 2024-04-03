import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UIFormLabelComponent } from '../../../ui/forms/label.components';
import { UIModalClassicComponent } from '../../../ui/modals/modal-classic.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PositionsApiService } from '../../../api/positions.service';

@Component({
  selector: 'update-position-modal',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    UIFormLabelComponent,
    UIModalClassicComponent,
  ],
  templateUrl: './update-position.component.html',
})
export class UpdatePositionModalComponent implements OnInit {
  private positionsApiService = inject(PositionsApiService);

  @Input() position: any;
  @Output() close = new EventEmitter();
  @Output() success = new EventEmitter();

  public closeModal(): void {
    this.close.emit();
  }

  public closeOnSuccess(): void {
    this.success.emit();
  }

  ngOnInit(): void {
    this.updatePositionForm.patchValue({ ...this.position });
  }

  public updatePositionForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    responsibilities: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    min_salary: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(1)],
    }),
    max_salary: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(1)],
    }),
  });

  public updatePosition(): void {
    const position = { id: this.position.id, ...this.updatePositionForm.value };

    this.positionsApiService.updatePosition(position).subscribe({
      next: (response: any) => {
        if (response) {
          this.closeOnSuccess();
        }
      },
    });
  }
}
