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
import { CreateDepartmentModalComponent } from './forms/create/create-department.component';
import { UpdateDepartmentModalComponent } from './forms/update/update-department.component';
import { DepartmentsApiService } from '../api/departments.service';

@Component({
  selector: 'positions',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    UIModalClassicComponent,
    CreateDepartmentModalComponent,
    UpdateDepartmentModalComponent,
  ],
  templateUrl: './departments.component.html',
})
export class DepartmentsComponent implements OnInit {
  private departmentsApiService = inject(DepartmentsApiService);

  public newDepartmentModalIsOpen: WritableSignal<boolean> = signal(false);
  public updateDepartmentModalIsOpen: WritableSignal<boolean> = signal(false);

  public deparments$!: Observable<any[]>;

  ngOnInit(): void {
    this.getDepartments();
  }

  public getDepartments() {
    this.deparments$ = this.departmentsApiService.getAllDepartments();
  }

  public openNewDepartmentModal(): void {
    this.newDepartmentModalIsOpen.set(true);
  }

  public closeNewDepartmentModal(): void {
    this.newDepartmentModalIsOpen.set(false);
  }

  public selectedDepartment: any;

  public openUpdateDepartmentModal(department: any): void {
    this.selectedDepartment = department;
    this.updateDepartmentModalIsOpen.set(true);
  }

  public closeUpdateDepartmentModal(): void {
    this.updateDepartmentModalIsOpen.set(false);
  }

  public deleteDepartment(department: any) {
    this.departmentsApiService.deleteDepartment(department).subscribe({
      complete: () => this.getDepartments(),
    });
  }
}
