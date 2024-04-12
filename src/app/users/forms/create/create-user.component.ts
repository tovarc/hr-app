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
import { DepartmentsApiService } from '../../../api/departments.service';
import { PositionsApiService } from '../../../api/positions.service';
import { UsersApiService } from '../../../api/users.service';
import { RolesApiService } from '../../../api/roles.service';
import { AuthApiService } from '../../../api/auth.service';

@Component({
  selector: 'create-user-modal',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    UIFormLabelComponent,
    UIModalClassicComponent,
  ],
  templateUrl: './create-user.component.html',
})
export class CreateUserModalComponent implements OnInit {
  private usersApiService = inject(UsersApiService);
  private authApiService = inject(AuthApiService);
  private employeesApiService = inject(EmployeesApiService);
  private rolesApiService = inject(RolesApiService);

  public employees$!: Observable<any>;
  public roles$!: Observable<any>;

  @Output() close = new EventEmitter();
  @Output() success = new EventEmitter();

  ngOnInit(): void {
    this.employees$ = this.employeesApiService.getAllEmployees();
    this.roles$ = this.rolesApiService.getAllRoles();
  }

  public closeModal(): void {
    this.close.emit();
  }

  public closeOnSuccess(): void {
    this.success.emit();
  }

  public newUserForm = new FormGroup({
    first_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    last_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    role_id: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(1)],
    }),
    employee_id: new FormControl(0, {}),
  });

  public createUser(): void {
    const user = this.newUserForm.value;

    this.authApiService.register(user).subscribe({
      next: (response) => {
        if (response) {
          this.closeOnSuccess();
        }
      },
    });
  }
}
