import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'employees',
    loadComponent: () =>
      import('./employees/employees.component').then(
        (mod) => mod.EmployeesComponent,
      ),
  },
];
