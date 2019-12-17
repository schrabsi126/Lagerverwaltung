import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { EnvironmentService } from "./environment.service";
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RegisterService {

  constructor(private _http: HttpClient, private environmentService: EnvironmentService) { }

  register(registerData){
    let url = this.environmentService.setApiService('register')
    return this._http.post(url, registerData)
        .map(res=> res)
        .catch(this.handleError)
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    const body = error.json() || '';
    errMsg = error.message ? error.message : error.toString();
    console.error(errMsg);
    return Observable.throw(body);
  }
}
