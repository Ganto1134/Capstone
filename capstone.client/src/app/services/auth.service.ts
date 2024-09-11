import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7231/api/Auth';

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  // Aggiungi una BehaviorSubject per memorizzare il nome dell'utente
  private userNameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.getUserName());
  public userName$: Observable<string | null> = this.userNameSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      tap((response: any) => {
        if (response.token && response.userName) {
          this.setToken(response.token);
          this.setUserName(response.userName);
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.isLoggedInSubject.next(false);
    this.userNameSubject.next(null);
    this.router.navigate(['/login']);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  setUserName(userName: string) {
    localStorage.setItem('userName', userName);
    this.userNameSubject.next(userName);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
