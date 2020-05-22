import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private roles: string[] = [];

  constructor() {}

  saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  signOut() {
    window.sessionStorage.clear();
  }
  getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  saveUserName(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }
  getUserName() {
    return sessionStorage.getItem(USERNAME_KEY);
  }
  saveAutorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }
  getAutorities() {
    if (window.sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(window.sessionStorage.getItem(AUTHORITIES_KEY))
        .forEach(authority => this.roles.push(authority));
    }
    return this.roles;
  }
}
