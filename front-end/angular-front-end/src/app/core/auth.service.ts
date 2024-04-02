import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse } from './login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/auth';
  private loggedInStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  login(credentials: { email: string, password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('authToken', response.jwt);
        localStorage.setItem('name', response.name);
        localStorage.setItem('email', response.email);
        this.loggedInStatus.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    this.loggedInStatus.next(false);
  }

  get isLoggedIn() {
    return this.loggedInStatus.asObservable();
  }

  register(user: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/register`, user);
  }

  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  
}
