// auth.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  token = signal<string | null>(null);

  setToken(token: string) {
    this.token.set(token);
    localStorage.setItem('jwt', token);
  }

  loadToken() {
    const saved = localStorage.getItem('jwt');
    if (saved) this.token.set(saved);
  }

  clearToken() {
    this.token.set(null);
    this.cleanUser();
    localStorage.removeItem('jwt');
  }

  setUser(user: any) {
    this.token.set(user);
    localStorage.setItem('user', user);
  }

  loadUser(): any {
    return localStorage.getItem('user');
  }

  cleanUser() {
    localStorage.removeItem('user');
  }
}
