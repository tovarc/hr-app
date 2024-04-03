import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'employees',
    loadComponent: () =>
      import('./employees/employees.component').then(
        (mod) => mod.EmployeesComponent,
      ),
  },
  {
    path: 'positions',
    loadComponent: () =>
      import('./positions/positions.component').then(
        (mod) => mod.PositionsComponent,
      ),
  },
  {
    path: 'departments',
    loadComponent: () =>
      import('./deparments/departments.component').then(
        (mod) => mod.DepartmentsComponent,
      ),
  },
];
