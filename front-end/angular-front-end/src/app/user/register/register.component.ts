import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  user = { name: '', password: '', email: '', imageUrl: '' };

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {

    // remove previously cached token
    localStorage.removeItem('authToken');
    localStorage.removeItem('email');
    
    this.authService.register(this.user).subscribe(
      response => {
        console.log('Registration successful', response);
        this.router.navigate(['/home']);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
}
