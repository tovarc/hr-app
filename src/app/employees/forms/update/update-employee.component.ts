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

@Component({
  selector: 'update-employee-modal',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    UIFormLabelComponent,
    UIModalClassicComponent,
  ],
  templateUrl: './update-employee.component.html',
})
export class UpdateEmployeeModalComponent implements OnInit {
  private employeesApiService = inject(EmployeesApiService);

  @Input() employee: any;
  @Output() close = new EventEmitter();
  @Output() success = new EventEmitter();

  public closeModal(): void {
    this.close.emit();
  }

  public closeOnSuccess(): void {
    this.success.emit();
  }

  ngOnInit(): void {
    this.updateEmployeeForm.patchValue({ ...this.employee });
  }

  public updateEmployeeForm = new FormGroup({
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
    position_id: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(1)],
    }),
    department_id: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(1)],
    }),
    hire_date: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public updateEmployee(): void {
    const employee = { id: this.employee.id, ...this.updateEmployeeForm.value };

    this.employeesApiService.updateEmployee(employee).subscribe({
      next: (response: any) => {
        if (response) {
          this.closeOnSuccess();
        }
      },
    });
  }
}
