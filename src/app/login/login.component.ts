import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../api/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private authApiService = inject(AuthApiService);
  private router = inject(Router);

  public loginErrorMessage: WritableSignal<string | null> = signal(null);

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public login(): void {
    const user = this.loginForm.value;

    this.authApiService.login(user).subscribe({
      next: (user: any) => {
        sessionStorage.setItem('token', user.token);
        if (user.role == 'admin') {
          this.router.navigateByUrl('/dashboard/employees');
        } else {
          this.router.navigateByUrl('/dashboard/attendance');
        }
      },
      error: () => this.loginErrorMessage.set('Invalid email or password.'),
    });
  }
}
