import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {TokenStorageService} from '../../service/token-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginForm} from '../../model/login-form';
import {JwtInfo} from '../../model/jwt-info';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  infoMessage;
  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
    if (this.tokenStorage.getToken()) { this.router.navigate(['chat']); }
  }

  login(data) {
    const loginForm: LoginForm = new LoginForm(data.username, data.password);
    this.authService.login(loginForm).subscribe((response: JwtInfo) => {
      this.tokenStorage.saveToken(response.accessToken);
      this.tokenStorage.saveUserName(response.username);
      this.tokenStorage.saveAutorities(response.authorities);
      console.log('Login get token -> ' + response.accessToken);
      window.location.reload();
      },
      error => this.infoMessage = error.error.message);
  }
}
