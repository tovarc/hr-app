import { FormControl } from '@angular/forms';

export interface IEmployee {
  first_name: string;
  last_name: string;
  email: string;
  position_id: number;
  department_id: number;
  hire_date: Date;
}

export interface IEmployeeForm {
  first_name: FormControl<string>;
  last_name: FormControl<string>;
  email: FormControl<string>;
  position_id: FormControl<number>;
  department_id: FormControl<number>;
  hire_date: FormControl<string>;
}
