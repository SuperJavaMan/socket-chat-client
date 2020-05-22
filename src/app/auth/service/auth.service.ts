import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginForm} from '../model/login-form';
import {RegForm} from '../model/reg-form';
import {JwtInfo} from '../model/jwt-info';
import {Observable} from 'rxjs';

const URL = 'http://localhost:8080/auth/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginForm: LoginForm): Observable<JwtInfo> {
    return this.http.post<JwtInfo>(URL + 'login', loginForm, httpOptions);
  }

  reg(regForm: RegForm): Observable<any> {
    console.log(regForm.username + ' ' + regForm.password);
    return this.http.post(URL + 'reg', regForm, httpOptions);
  }
}
