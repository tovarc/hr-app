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
import { UpdateLeaveRequestModalComponent } from './forms/update/update-leave-request.component';
import { AttendancesApiService } from '../api/attendance.service';
import { CreateAttendanceModalComponent } from './forms/create/create-attendance.component';

@Component({
  selector: 'leave-requests',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    UIModalClassicComponent,
    CreateAttendanceModalComponent,
    UpdateLeaveRequestModalComponent,
  ],
  templateUrl: './attendance.component.html',
})
export class AttendanceComponent implements OnInit {
  private attendancesApiService = inject(AttendancesApiService);

  public newLeaveRequestModalIsOpen: WritableSignal<boolean> = signal(false);
  public updateLeaveRequestModalIsOpen: WritableSignal<boolean> = signal(false);

  public attendances$!: Observable<any[]>;

  ngOnInit(): void {
    this.getAttendances();
  }

  public getAttendances() {
    this.attendances$ = this.attendancesApiService.getAllAttendances();
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
