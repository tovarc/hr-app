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
import { Observable, of } from 'rxjs';
import { AttendanceStatusApiService } from '../../../api/attendance-status.service';
import { AttendancesApiService } from '../../../api/attendance.service';
import { UserService } from '../../../shared/services/user.service';
import { RoleDirective } from '../../../shared/directives/role.directive';

@Component({
  selector: 'create-attendance-modal',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    UIFormLabelComponent,
    UIModalClassicComponent,
    RoleDirective,
  ],
  templateUrl: './create-attendance.component.html',
})
export class CreateAttendanceModalComponent implements OnInit {
  private employeesApiService = inject(EmployeesApiService);
  private attendanceStatusApiService = inject(AttendanceStatusApiService);
  private attendanceApiService = inject(AttendancesApiService);
  private userService = inject(UserService);

  public attendanceStatus$!: Observable<any>;
  public employees$!: Observable<any[]>;

  @Output() close = new EventEmitter();
  @Output() success = new EventEmitter();

  ngOnInit(): void {
    this.attendanceStatus$ =
      this.attendanceStatusApiService.getAllAttendanceStatus();

    if (this.userService.loggedUserRole() == 'admin') {
      this.employees$ = this.employeesApiService.getAllEmployees();
    }

    if (this.userService.loggedUserRole() == 'employee') {
      this.newAttendanceForm.patchValue({
        employee_id: this.userService.loggedUser().employee.id,
      });
    }
  }

  public closeModal(): void {
    this.close.emit();
  }

  public closeOnSuccess(): void {
    this.success.emit();
  }

  public newAttendanceForm = new FormGroup({
    employee_id: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(1)],
    }),

    date: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    time_in: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    time_out: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    status_id: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(1)],
    }),
  });

  public createAttendance(): void {
    const attendance = {
      ...this.newAttendanceForm.value,
    };

    if (this.userService.loggedUserRole() == 'admin') {
      this.attendanceApiService.createAttendance(attendance).subscribe({
        next: (response) => {
          if (response) {
            this.closeOnSuccess();
          }
        },
      });
    } else {
      this.attendanceApiService
        .createAttendanceByEmployee(attendance)
        .subscribe({
          next: (response) => {
            if (response) {
              this.closeOnSuccess();
            }
          },
        });
    }
  }
}
