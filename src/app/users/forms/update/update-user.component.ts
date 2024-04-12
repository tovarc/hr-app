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
import { EmployeesApiService } from '../../../api/employees.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { RolesApiService } from '../../../api/roles.service';
import { UsersApiService } from '../../../api/users.service';

@Component({
  selector: 'update-user-modal',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    UIFormLabelComponent,
    UIModalClassicComponent,
  ],
  templateUrl: './update-user.component.html',
})
export class UpdateUserModalComponent implements OnInit {
  private usersApiService = inject(UsersApiService);
  private employeesApiService = inject(EmployeesApiService);
  private rolesApiService = inject(RolesApiService);

  public employees$!: Observable<any>;
  public roles$!: Observable<any>;

  @Input() user: any;
  @Output() close = new EventEmitter();
  @Output() success = new EventEmitter();

  public closeModal(): void {
    this.close.emit();
  }

  public closeOnSuccess(): void {
    this.success.emit();
  }

  ngOnInit(): void {
    this.employees$ = this.employeesApiService.getAllEmployees();
    this.roles$ = this.rolesApiService.getAllRoles();

    this.updateUserForm.patchValue({
      ...this.user,
    });
  }

  public updateUserForm = new FormGroup({
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
      validators: [Validators.required],
    }),
    role_id: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(1)],
    }),
    employee_id: new FormControl(0, {}),
  });

  public updateUser(): void {
    const user = { id: this.user.id, ...this.updateUserForm.value };

    this.usersApiService.updateUser(user).subscribe({
      next: (response: any) => {
        if (response) {
          this.closeOnSuccess();
        }
      },
    });
  }
}
