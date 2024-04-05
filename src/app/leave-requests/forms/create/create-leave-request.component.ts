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
import { LeaveRequestsStatusApiService } from '../../../api/leave-requests-status.service';
import { LeaveRequestsApiService } from '../../../api/leave-requests.service';

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
  ],
  templateUrl: './create-leave-request.component.html',
})
export class CreateLeaveRequestModalComponent implements OnInit {
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
    this.employees$ = this.employeesApiService.getAllEmployees();
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

    this.leaveRequestsApiService.createLeaveRequest(leaveRequest).subscribe({
      next: (response) => {
        if (response) {
          this.closeOnSuccess();
        }
      },
    });
  }
}
