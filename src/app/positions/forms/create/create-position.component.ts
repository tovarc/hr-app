import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output, inject } from '@angular/core';
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
  selector: 'create-position-modal',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    UIFormLabelComponent,
    UIModalClassicComponent,
  ],
  templateUrl: './create-position.component.html',
})
export class CreatePositionModalComponent {
  private positionsApiService = inject(PositionsApiService);

  @Output() close = new EventEmitter();
  @Output() success = new EventEmitter();

  public closeModal(): void {
    this.close.emit();
  }

  public closeOnSuccess(): void {
    this.success.emit();
  }

  public newPositionForm = new FormGroup({
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

  public createPosition(): void {
    const position = this.newPositionForm.value;

    const formattedPosition = {
      ...position,
      min_salary: Number(position.min_salary ?? 0),
      max_salary: Number(position.max_salary ?? 0),
    };

    console.log(position);

    this.positionsApiService.createPosition(formattedPosition).subscribe({
      next: (response) => {
        if (response) {
          this.closeOnSuccess();
        }
      },
    });
  }
}
