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
import { IEmployee } from '../interfaces/employee.interface';
import { UsersApiService } from '../api/users.service';
import { UpdateUserModalComponent } from './forms/update/update-user.component';
import { CreateUserModalComponent } from './forms/create/create-user.component';

@Component({
  selector: 'users',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    UIModalClassicComponent,
    CreateUserModalComponent,
    UpdateUserModalComponent,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  private usersApiService = inject(UsersApiService);

  public newUserModalIsOpen: WritableSignal<boolean> = signal(false);
  public updateEmployeeModalIsOpen: WritableSignal<boolean> = signal(false);

  public users!: any[];
  public usersCopy!: any[];

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    this.usersApiService.getAllUsers().subscribe({
      next: (users: any) => (this.users = this.usersCopy = users),
    });
  }

  public openNewEmployeeModal(): void {
    this.newUserModalIsOpen.set(true);
  }

  public closeNewUserModal(): void {
    this.newUserModalIsOpen.set(false);
  }

  public selectedUser: any;

  public openUpdateEmployeeModal(employee: any): void {
    this.selectedUser = employee;
    this.updateEmployeeModalIsOpen.set(true);
  }

  public closeUpdateUserModal(): void {
    this.updateEmployeeModalIsOpen.set(false);
  }

  public deleteEmployee(employee: IEmployee) {
    // this.employeesApiService.deleteEmployee(employee).subscribe({
    //   complete: () => this.getUsers(),
    // });
    //
  }

  public searchUser(criteria: string): void {
    this.users = this.usersCopy.filter(
      (user: any) =>
        user.first_name.toLowerCase().includes(criteria.toLowerCase()) ||
        user.last_name.toLowerCase().includes(criteria.toLowerCase()) ||
        user.email.toLowerCase().includes(criteria.toLowerCase()),
    );
  }
}
