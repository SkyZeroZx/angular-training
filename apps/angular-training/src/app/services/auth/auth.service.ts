import { AuthLogin, UserAuthenticated } from '@/core/interface/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _authUser = signal<UserAuthenticated | null>(null);

  constructor(private readonly http: HttpClient , private readonly router : Router) {
    this.tokenExpired();
    this.isLogged();
  }

  get authUser() {
    return this._authUser.asReadonly();
  }

  logIn(authLogin: AuthLogin) {
    return this.http
      .post<UserAuthenticated>(`${environment.API_URL}/auth/login`, authLogin)
      .pipe(tap((res) => this.saveUserAuthenticated(res)));
  }

  private saveUserAuthenticated(authUser: UserAuthenticated) {
    this._authUser.set(authUser);
    localStorage.setItem('user', JSON.stringify(authUser));
    localStorage.setItem('token', authUser.token);
  }

  getTokenStore() {
    return localStorage.getItem('token');
  }

  private decodeToken(token: string) {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  private tokenExpired() {
    const token = this.getTokenStore();

    if (!token) {
      return null;
    }
    const decodeToken = this.decodeToken(token);

    const isExpired =
      Math.floor(new Date().getTime() / 1000) >= decodeToken.exp;

    if (isExpired) {
      this.logOut();
    }
  }

  isLogged() {
    const token = this.getTokenStore();
    const userAuthenticated = this.decodeToken(token) as UserAuthenticated;
    if (token) {
      this._authUser.set({
        ...userAuthenticated,
        token: token,
      });
    }
  }

  logOut() {
    this._authUser.set(null);
    localStorage.clear();
    this.router.navigate(['/auth/login'])
  }
}
