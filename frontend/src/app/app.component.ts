import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import {Users} from './models/users';
import {UserService} from './services/user.service';
import {TokenStorage} from './services/token-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  style = 'material';
  constructor() {

  }



  ngOnInit() {

  }

}
