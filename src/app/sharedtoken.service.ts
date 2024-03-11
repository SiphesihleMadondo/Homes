import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SharedtokenService {
 
  private issuer = {
    login: 'http://localhost:5176/Checkuser',
  };
  constructor() {}
  handleData(token: any) {
    if(typeof window !== 'undefined')
    {
      return window.localStorage.setItem('auth_token', token);
    }
  }
  getToken() {
    return window.localStorage.getItem('auth_token');
  }
  // Verify the token
  isValidToken(): any {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload) > -1
          ? true
          : false;
      }
    } else {
      return false;
    }
  }
  payload(token: any) {
    const jwtPayload = token.split('.')[1];
    return window.btoa(jwtPayload);
  }
  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }
  // Remove token
  removeToken() {
    if(typeof window !== 'undefined')
    { 
      return window.localStorage.removeItem('auth_token');  
    }
  }
}
