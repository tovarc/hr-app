import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { RoleDirective } from '../shared/directives/role.directive';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, RoleDirective],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  public loggedUser: any;

  ngOnInit(): void {
    this.loggedUser = this.userService.loggedUser();
  }

  public logout(): void {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
