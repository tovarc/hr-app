import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AttendancesApiService } from '../api/attendance.service';
import { CreateAttendanceModalComponent } from './forms/create/create-attendance.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UIModalClassicComponent } from '../ui/modals/modal-classic.component';
import { RoleDirective } from '../shared/directives/role.directive';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'attendance',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    UIModalClassicComponent,
    CreateAttendanceModalComponent,
    ReactiveFormsModule,
    RoleDirective,
  ],
  templateUrl: './attendance.component.html',
})
export class AttendanceComponent implements OnInit {
  private userService = inject(UserService);
  private attendancesApiService = inject(AttendancesApiService);

  public newLeaveRequestModalIsOpen: WritableSignal<boolean> = signal(false);
  public updateLeaveRequestModalIsOpen: WritableSignal<boolean> = signal(false);

  public attendances!: any[];
  public attendancesCopy!: any[];

  public filterAttendancesForm: FormGroup = new FormGroup({
    employee: new FormControl(''),
    status: new FormControl('null'),
    date: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAttendances();

    this.filterAttendancesForm.valueChanges.subscribe({
      next: (values) => {
        const { employee, status, date } = values;

        this.attendances = this.attendancesCopy.filter((request: any) => {
          if (
            employee &&
            !request.employee.first_name
              .toLowerCase()
              .includes(employee.toLowerCase())
          ) {
            return false;
          }

          if (+status && request.status.id !== +status) {
            return false;
          }

          if (date && request.date.split('T')[0] !== date) {
            return false;
          }

          return true;
        });
      },
    });
  }

  public getAttendances() {
    if (this.userService.loggedUserRole() !== 'admin') {
      this.attendancesApiService.getAllCurrentEmployeeAttendances().subscribe({
        next: (attendances: any) =>
          (this.attendances = this.attendancesCopy = attendances),
      });
    } else {
      this.attendancesApiService.getAllAttendances().subscribe({
        next: (attendances: any) =>
          (this.attendances = this.attendancesCopy = attendances),
      });
    }
  }

  public openNewLeaveRequestModal(): void {
    this.newLeaveRequestModalIsOpen.set(true);
  }

  public closeNewLeaveRequestModal(): void {
    this.newLeaveRequestModalIsOpen.set(false);
  }

  public selectedLeaveRequest: any;

  public openUpdateLeaveRequestModal(leaveRequest: any): void {
    this.selectedLeaveRequest = leaveRequest;
    this.updateLeaveRequestModalIsOpen.set(true);
  }

  public closeUpdateLeaveRequestModal(): void {
    this.updateLeaveRequestModalIsOpen.set(false);
  }
}
