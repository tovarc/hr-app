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
import { LeaveRequestsStatusApiService } from '../../../api/leave-requests-status.service';
import { LeaveRequestsApiService } from '../../../api/leave-requests.service';
import { UserService } from '../../../shared/services/user.service';
import { RoleDirective } from '../../../shared/directives/role.directive';

@Component({
  selector: 'create-leave-request-modal',
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
  templateUrl: './create-leave-request.component.html',
})
export class CreateLeaveRequestModalComponent implements OnInit {
  private userService = inject(UserService);
  private employeesApiService = inject(EmployeesApiService);
  private leaveRequestsStatusApiService = inject(LeaveRequestsStatusApiService);
  private leaveRequestsApiService = inject(LeaveRequestsApiService);

  public leaveRequestsStatus$!: Observable<any>;
  public employees$!: Observable<any>;

  @Output() close = new EventEmitter();
  @Output() success = new EventEmitter();

  ngOnInit(): void {
    this.leaveRequestsStatus$ =
      this.leaveRequestsStatusApiService.getAllLeaveRequestsStatus();

    if (this.userService.loggedUserRole() == 'admin') {
      this.employees$ = this.employeesApiService.getAllEmployees();
    }

    if (this.userService.loggedUserRole() != 'admin') {
      this.newLeaveRequest.patchValue({
        employee_id: this.userService.loggedUser().employee.id,
        status_id: 1,
      });
    }
  }

  public closeModal(): void {
    this.close.emit();
  }

  public closeOnSuccess(): void {
    this.success.emit();
  }

  public newLeaveRequest = new FormGroup({
    employee_id: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(1)],
    }),

    start_date: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    end_date: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    reason: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    status_id: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(1)],
    }),
  });

  public createLeaveRequest(): void {
    const leaveRequest = {
      ...this.newLeaveRequest.value,
    };

    if (this.userService.loggedUserRole() == 'admin') {
      this.leaveRequestsApiService.createLeaveRequest(leaveRequest).subscribe({
        next: (response) => {
          if (response) {
            this.closeOnSuccess();
          }
        },
      });
    } else {
      this.leaveRequestsApiService
        .createLeaveRequestByEmployee(leaveRequest)
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
