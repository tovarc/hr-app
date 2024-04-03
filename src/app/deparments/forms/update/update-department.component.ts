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
import { DepartmentsApiService } from '../../../api/departments.service';

@Component({
  selector: 'update-department-modal',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    UIFormLabelComponent,
    UIModalClassicComponent,
  ],
  templateUrl: './update-department.component.html',
})
export class UpdateDepartmentModalComponent implements OnInit {
  private departmentsApiService = inject(DepartmentsApiService);

  @Input() department: any;
  @Output() close = new EventEmitter();
  @Output() success = new EventEmitter();

  public closeModal(): void {
    this.close.emit();
  }

  public closeOnSuccess(): void {
    this.success.emit();
  }

  ngOnInit(): void {
    this.updateDepartmentForm.patchValue({ ...this.department });
  }

  public updateDepartmentForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public updateDepartment(): void {
    const department = {
      id: this.department.id,
      ...this.updateDepartmentForm.value,
    };

    this.departmentsApiService.updateDepartment(department).subscribe({
      next: (response: any) => {
        if (response) {
          this.closeOnSuccess();
        }
      },
    });
  }
}
