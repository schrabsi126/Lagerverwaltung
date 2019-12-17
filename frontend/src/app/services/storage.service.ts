import { Injectable } from '@angular/core';
import {Category} from '../models/category';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService} from './environment.service';
import {Storage} from '../models/storage';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http:HttpClient, private environmentService:EnvironmentService) { }

  getStorages() {
    let url = this.environmentService.setApiService('storages');
    return this.http.get<Storage[]>(url)
      .map(res => res)
      .catch(this.handleError)
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    const body = error.json() || '';
    errMsg = error.message ? error.message : error.toString();
    return Observable.throw(body);
  }

  addStorage(storage: Storage){
    return new Promise((resolve, reject) => {
      this.http.post<Storage>(this.environmentService.setApiService('storage'), storage)
        .map(res=>res)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
  }
}
