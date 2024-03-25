import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {

    // remove previously cached token
    localStorage.removeItem('authToken');
    localStorage.removeItem('email');

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem('authToken', response.jwt);
        localStorage.setItem('email', response.name)
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please try again.';
      }
    });
  }
}
