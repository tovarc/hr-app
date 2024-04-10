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
import { UIModalClassicComponent } from '../ui/modals/modal-classic.component';
import { CreateLeaveRequestModalComponent } from './forms/create/create-leave-request.component';
import { LeaveRequestsApiService } from '../api/leave-requests.service';
import { UpdateLeaveRequestModalComponent } from './forms/update/update-leave-request.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'leave-requests',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    UIModalClassicComponent,
    CreateLeaveRequestModalComponent,
    UpdateLeaveRequestModalComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './leave-requests.component.html',
})
export class LeaveRequestsComponent implements OnInit {
  private leaveRequestsApiService = inject(LeaveRequestsApiService);

  public newLeaveRequestModalIsOpen: WritableSignal<boolean> = signal(false);
  public updateLeaveRequestModalIsOpen: WritableSignal<boolean> = signal(false);

  public leaveRequests!: any[];
  public leaveRequestsCopy!: any[];

  public filterLeaveRequestsForm: FormGroup = new FormGroup({
    employee: new FormControl(''),
    status: new FormControl('null'),
    date: new FormControl(''),
  });

  ngOnInit(): void {
    this.getLeaveRequests();

    this.filterLeaveRequestsForm.valueChanges.subscribe({
      next: (values) => {
        const { employee, status, date } = values;

        this.leaveRequests = this.leaveRequestsCopy.filter((request: any) => {
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

          if (date && request.start_date.split('T')[0] !== date) {
            return false;
          }

          return true;
        });
      },
    });
  }

  public getLeaveRequests() {
    this.leaveRequestsApiService.getAllLeaveRequests().subscribe({
      next: (leaveRequests: any) =>
        (this.leaveRequests = this.leaveRequestsCopy = leaveRequests),
    });
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
