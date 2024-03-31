import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean;
  private authSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {
    const email = localStorage.getItem('email');
    this.isLoggedIn = !!email;
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn.subscribe(
      status => this.isLoggedIn = status
    );
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  checkLoginStatus(): void {
    const authToken = localStorage.getItem('authToken');
    this.isLoggedIn = !!authToken;
  }

  logout(): void {
    this.authService.logout();
    localStorage.removeItem('authToken');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
}
