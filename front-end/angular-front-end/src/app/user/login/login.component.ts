import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = { username: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/dashboard']);     // check routing later
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please try again.';
      }
    });
  }
}
