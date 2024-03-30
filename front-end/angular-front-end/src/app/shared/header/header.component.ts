import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean;

  constructor() {
    const email = localStorage.getItem('email');
    this.isLoggedIn = !!email;
  }
}
