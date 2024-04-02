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
import { EmployeesApiService } from '../api/employees.service';
import { UIModalClassicComponent } from '../ui/modals/modal-classic.component';
import { CreateEmployeeModalComponent } from './forms/create/create-employee.component';
import { IEmployee } from '../interfaces/employee.interface';
import { UpdateEmployeeModalComponent } from './forms/update/update-employee.component';

@Component({
  selector: 'employees',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    UIModalClassicComponent,
    CreateEmployeeModalComponent,
    UpdateEmployeeModalComponent,
  ],
  templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnInit {
  private employeesApiService = inject(EmployeesApiService);

  public newEmployeeModalIsOpen: WritableSignal<boolean> = signal(false);
  public updateEmployeeModalIsOpen: WritableSignal<boolean> = signal(false);

  public employees$!: Observable<IEmployee[]>;

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees() {
    this.employees$ = this.employeesApiService.getAllEmployees();
  }

  public openNewEmployeeModal(): void {
    this.newEmployeeModalIsOpen.set(true);
  }

  public closeNewEmployeeModal(): void {
    this.newEmployeeModalIsOpen.set(false);
  }

  public selectedEmployee: any;

  public openUpdateEmployeeModal(employee: any): void {
    this.selectedEmployee = employee;
    this.updateEmployeeModalIsOpen.set(true);
  }

  public closeUpdateEmployeeModal(): void {
    this.updateEmployeeModalIsOpen.set(false);
  }

  public deleteEmployee(employee: IEmployee) {
    this.employeesApiService.deleteEmployee(employee).subscribe({
      complete: () => this.getEmployees(),
    });
  }
}
