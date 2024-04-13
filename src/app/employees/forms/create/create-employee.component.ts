import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UIFormLabelComponent } from '../../../ui/forms/label.components';
import { UIModalClassicComponent } from '../../../ui/modals/modal-classic.component';
import { EmployeesApiService } from '../../../api/employees.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { DepartmentsApiService } from '../../../api/departments.service';
import { PositionsApiService } from '../../../api/positions.service';
import { AuthApiService } from '../../../api/auth.service';
import { RolesApiService } from '../../../api/roles.service';

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
export class CreateEmployeeModalComponent implements OnInit {
  private employeesApiService = inject(EmployeesApiService);
  private departmentsApiService = inject(DepartmentsApiService);
  private positionsApiService = inject(PositionsApiService);
  private authApiService = inject(AuthApiService);
  private rolesApiService = inject(RolesApiService);

  public departments$!: Observable<any>;
  public positions$!: Observable<any>;
  public roles$!: Observable<any>;

  @Output() close = new EventEmitter();
  @Output() success = new EventEmitter();

  ngOnInit(): void {
    this.departments$ = this.departmentsApiService.getAllDepartments();
    this.positions$ = this.positionsApiService.getAllPositions();
    this.roles$ = this.rolesApiService.getAllRoles();
  }

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
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
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
    role_id: new FormControl(0, {
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
      next: (employeeResponse) => {
        if (employeeResponse) {
          this.authApiService
            .register({
              ...employee,
              employee_id: employeeResponse.id,
            })
            .subscribe({
              next: (response) => {
                console.log(response);
                this.closeOnSuccess();
              },
            });
        }
      },
    });
  }
}
