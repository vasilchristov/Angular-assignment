import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { tap } from 'rxjs/operators';

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

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.loggedInStatus.next(true);
      })
    );;
  }

  get isLoggedIn() {
    return this.loggedInStatus.asObservable();
  }

  logout(): void {
    this.loggedInStatus.next(false);
  }

  register(user: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/register`, user);
  }
}
