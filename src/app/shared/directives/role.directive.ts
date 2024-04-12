import { NgIf } from '@angular/common';
import { Directive, Input, inject } from '@angular/core';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[roles]',
  standalone: true,
  hostDirectives: [NgIf],
})
export class RoleDirective {
  private ngIf = inject(NgIf, { host: true });
  private userService = inject(UserService);

  @Input('roles') set roles(roles: string[]) {
    this.ngIf.ngIf = roles.includes(this.userService.loggedUserRole());
  }
}
