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
import { EmployeesApiService } from '../../../api/employees.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DepartmentsApiService } from '../../../api/departments.service';
import { PositionsApiService } from '../../../api/positions.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'update-employee-modal',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    UIFormLabelComponent,
    UIModalClassicComponent,
  ],
  templateUrl: './update-employee.component.html',
})
export class UpdateEmployeeModalComponent implements OnInit {
  private employeesApiService = inject(EmployeesApiService);
  private departmentsApiService = inject(DepartmentsApiService);
  private positionsApiService = inject(PositionsApiService);

  public departments$!: Observable<any>;
  public positions$!: Observable<any>;

  @Input() employee: any;
  @Output() close = new EventEmitter();
  @Output() success = new EventEmitter();

  public closeModal(): void {
    this.close.emit();
  }

  public closeOnSuccess(): void {
    this.success.emit();
  }

  ngOnInit(): void {
    this.departments$ = this.departmentsApiService.getAllDepartments();
    this.positions$ = this.positionsApiService.getAllPositions();

    console.log(this.employee);

    this.updateEmployeeForm.patchValue({
      ...this.employee,
      hire_date: this.employee.hire_date.split('T')[0],
      position_id: this.employee.position.id,
      department_id: this.employee.department.id,
    });
  }

  public updateEmployeeForm = new FormGroup({
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

  public updateEmployee(): void {
    const employee = { id: this.employee.id, ...this.updateEmployeeForm.value };

    this.employeesApiService.updateEmployee(employee).subscribe({
      next: (response: any) => {
        if (response) {
          this.closeOnSuccess();
        }
      },
    });
  }
}
