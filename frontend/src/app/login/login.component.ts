import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../services/user.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {AuthenticationService} from '../services/authentication.service';
import {FormValidationService} from '../services/form-validation.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {};
  message = ''
  errMsgArr = []
  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private loginService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    private formValidationService: FormValidationService) { }

  ngOnInit() {}

  public login() {
    this.spinnerService.show();
    this.authService.login(this.loginData).subscribe((value) => {
      this.loginService.getMe().subscribe((value) => {
        localStorage.setItem('userInfo', JSON.stringify(value));
        this.spinnerService.hide();
        this.router.navigateByUrl('user');
      });
    }, err => {
      this.spinnerService.hide();
      if (err.status_code == 422) {
        this.errMsgArr = this.formValidationService.getErrors(err.errors);
      } else {
        this.errMsgArr = [err.error.message]
      }
    });
  }

}
