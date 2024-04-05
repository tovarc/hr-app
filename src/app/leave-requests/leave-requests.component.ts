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
import { Observable } from 'rxjs';
import { UIModalClassicComponent } from '../ui/modals/modal-classic.component';
import { CreateLeaveRequestModalComponent } from './forms/create/create-leave-request.component';
import { LeaveRequestsApiService } from '../api/leave-requests.service';
import { UpdateLeaveRequestModalComponent } from './forms/update/update-leave-request.component';

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
  ],
  templateUrl: './leave-requests.component.html',
})
export class LeaveRequestsComponent implements OnInit {
  private leaveRequestsApiService = inject(LeaveRequestsApiService);

  public newLeaveRequestModalIsOpen: WritableSignal<boolean> = signal(false);
  public updateLeaveRequestModalIsOpen: WritableSignal<boolean> = signal(false);

  public leaveRequests$!: Observable<any[]>;

  ngOnInit(): void {
    this.getLeaveRequests();
  }

  public getLeaveRequests() {
    this.leaveRequests$ = this.leaveRequestsApiService.getAllLeaveRequests();
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
