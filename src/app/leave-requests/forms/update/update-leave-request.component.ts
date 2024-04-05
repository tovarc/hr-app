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
import { Observable } from 'rxjs';
import { LeaveRequestsApiService } from '../../../api/leave-requests.service';
import { EmployeesApiService } from '../../../api/employees.service';
import { LeaveRequestsStatusApiService } from '../../../api/leave-requests-status.service';

@Component({
  selector: 'update-leave-request-modal',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    UIFormLabelComponent,
    UIModalClassicComponent,
  ],
  templateUrl: './update-leave-request.component.html',
})
export class UpdateLeaveRequestModalComponent implements OnInit {
  private employeesApiService = inject(EmployeesApiService);
  private leaveRequestsStatusApiService = inject(LeaveRequestsStatusApiService);
  private leaveRequestsApiService = inject(LeaveRequestsApiService);

  public leaveRequestsStatus$!: Observable<any>;
  public employees$!: Observable<any>;

  @Input() leaveRequest: any;
  @Output() close = new EventEmitter();
  @Output() success = new EventEmitter();

  public closeModal(): void {
    this.close.emit();
  }

  public closeOnSuccess(): void {
    this.success.emit();
  }

  public updateLeaveRequestForm = new FormGroup({
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

  ngOnInit(): void {
    console.log(this.leaveRequest);
    this.updateLeaveRequestForm.patchValue({
      ...this.leaveRequest,
      status_id: this.leaveRequest.status.id,
    });
    this.leaveRequestsStatus$ =
      this.leaveRequestsStatusApiService.getAllLeaveRequestsStatus();
    this.employees$ = this.employeesApiService.getAllEmployees();
  }

  public updateLeaveRequest(): void {
    const leaveRequest = {
      id: this.leaveRequest.id,
      ...this.updateLeaveRequestForm.value,
    };

    this.leaveRequestsApiService.updateLeaveRequest(leaveRequest).subscribe({
      next: (response: any) => {
        if (response) {
          this.closeOnSuccess();
        }
      },
    });
  }
}
