import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {RegForm} from '../../model/reg-form';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {
  form: FormGroup;
  infoMessage;
  asAdmin = false;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  reg(data) {
    const regForm: RegForm = new RegForm(data.username, data.password, this.asAdmin);
    console.log('AsAdmin ' + this.asAdmin);
    this.authService.reg(regForm).subscribe(response => {
      console.log('Response received');
      this.router.navigate(['login']);
      this.infoMessage = response;
      },
      error => this.infoMessage = error.error.message);
  }
}
