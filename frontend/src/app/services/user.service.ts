import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EnvironmentService } from "./environment.service";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Users} from '../models/users';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {stringify} from '@angular/compiler/src/util';

@Injectable()
export class UserService {

  constructor(
    private _http: HttpClient,
    private environmentService: EnvironmentService
  ) {
    this.dataStore={users:[]};
    this._users=new BehaviorSubject<Users[]>([]);
  }

  login(loginData) {
    let url = this.environmentService.setAuthService('oauth/token');
    return this._http.post(url, loginData)
      .map(res => res)
      .catch(this.handleError)
  }

  getMe() {
    let url = this.environmentService.setApiService('me');
    return this._http.get<Users>(url)
      .map(res => res)
      .catch(this.handleError)
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    const body = error.json() || '';
    errMsg = error.message ? error.message : error.toString();
    return Observable.throw(body);
  }

  private dataStore: { users: Users[] };
  private _users: BehaviorSubject<Users[]>;

  loadUsers() {
    let url = this.environmentService.setApiService('users');
    return this._http.get<Users[]>(url)
      .map(res => res)
      .catch(this.handleError)
      .subscribe(
        data => {
          this.dataStore.users = data;
          this._users.next(Object.assign({}, this.dataStore).users);
        },
        error => {
          console.log("Failed to fetch students")
        }
      )
  }
  get users():Observable<Users[]>{
    return this._users.asObservable();
  }
}
