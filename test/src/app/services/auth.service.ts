import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usernameKey = 'username';

  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  setUsername(name: string): void {
    localStorage.setItem(this.usernameKey, name);
  }

  logout(): void {
    localStorage.removeItem(this.usernameKey);
  }
}
