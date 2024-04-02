import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UIFormLabelComponent } from '../../../ui/forms/label.components';
import { UIModalClassicComponent } from '../../../ui/modals/modal-classic.component';
import { EmployeesApiService } from '../../../api/employees.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IEmployee,
  IEmployeeForm,
} from '../../../interfaces/employee.interface';

@Component({
  selector: 'create-employee-modal',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    UIFormLabelComponent,
    UIModalClassicComponent,
  ],
  templateUrl: './create-employee.component.html',
})
export class CreateEmployeeModalComponent {
  private employeesApiService = inject(EmployeesApiService);

  @Output() close = new EventEmitter();
  @Output() success = new EventEmitter();

  public closeModal(): void {
    this.close.emit();
  }

  public closeOnSuccess(): void {
    this.success.emit();
  }

  public newEmployeeForm = new FormGroup({
    first_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    last_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    position_id: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(1)],
    }),
    department_id: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(1)],
    }),
    hire_date: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public createEmployee(): void {
    const employee = this.newEmployeeForm.value;

    this.employeesApiService.createEmployee(employee).subscribe({
      next: (response) => {
        if (response) {
          this.closeOnSuccess();
        }
      },
    });
  }
}
