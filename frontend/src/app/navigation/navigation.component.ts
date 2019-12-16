import {Component, EventEmitter, NgZone, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDrawer, MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';


const SMALL_WIDTH_BREAKPOINT=768;
const PHONE_WIDTH_BREAKPOINT=426;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private mediaMatcher:MediaQueryList=matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  private phoneMediaMatcher:MediaQueryList=matchMedia(`(max-width: ${PHONE_WIDTH_BREAKPOINT}px)`);
  @ViewChild(MatDrawer,{static: false}) drawer:MatDrawer;

  constructor(zone:NgZone, private  userService:UserService, private authentificationService:AuthenticationService) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
    this.phoneMediaMatcher.addListener(mql =>
      zone.run(() => this.phoneMediaMatcher = matchMedia(`(max-width: ${PHONE_WIDTH_BREAKPOINT}px)`)));
  }

  logout()
  {
    this.authentificationService.logout();
  }

  ngOnInit() {

  }

  isScreenSmall():boolean {
    return this.mediaMatcher.matches;
  }
  isScreenPhone():boolean {
    return this.phoneMediaMatcher.matches;
  }

}
