import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard/employees',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((mod) => mod.LoginComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (mod) => mod.DashboardComponent,
      ),
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('./users/users.component').then((mod) => mod.UsersComponent),
      },
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
    ],
  },
];
