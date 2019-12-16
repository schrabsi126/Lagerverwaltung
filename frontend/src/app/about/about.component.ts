import {Component, NgZone, OnInit} from '@angular/core';
import {Users} from '../models/users';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private  userService:UserService,
              private ngZone: NgZone ) { }
  currentUser:Users= new  Users();
  ngOnInit() {
    this.userService.getMe().subscribe(x=> {
        // @ts-ignore
      this.currentUser=x.data;
    });
  }

}
