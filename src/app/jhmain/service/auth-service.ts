// auth.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  token = signal<string | null>(null);

  setToken(token: string) {
    this.token.set(token);
    localStorage.setItem('jwt', token);
  }

  getToken() {
    var jwtToken = this.token();
    if(jwtToken == undefined || jwtToken == null) {
      jwtToken = localStorage.getItem('jwt');  
    }

    return jwtToken;
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
    localStorage.setItem('user', JSON.stringify(user));
  }

  loadUser(): any {
    var user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  cleanUser() {
    localStorage.removeItem('user');
  }
}
