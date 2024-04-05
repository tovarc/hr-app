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
      import('./departments/departments.component').then(
        (mod) => mod.DepartmentsComponent,
      ),
  },
  {
    path: 'leave-requests',
    loadComponent: () =>
      import('./leave-requests/leave-requests.component').then(
        (mod) => mod.LeaveRequestsComponent,
      ),
  },
  {
    path: 'attendance',
    loadComponent: () =>
      import('./attendance/attendance.component').then(
        (mod) => mod.AttendanceComponent,
      ),
  },
];
