import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  user = { username: '', password: '', email: '', imageUrl: '' };

  constructor(private authService: AuthService) { }

  register(): void {
    this.authService.register(this.user).subscribe(
      response => {
        console.log('Registration successful', response);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
}
