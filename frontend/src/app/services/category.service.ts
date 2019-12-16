import { Injectable } from '@angular/core';
import {Category} from '../models/category';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService} from './environment.service';
import {Users} from '../models/users';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private  http:HttpClient,
              private environmentService:EnvironmentService) { }


  getCategories() {
    let url = this.environmentService.setApiService('categories');
    return this.http.get<Category[]>(url)
      .map(res => res)
      .catch(this.handleError)
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    const body = error.json() || '';
    errMsg = error.message ? error.message : error.toString();
    return Observable.throw(body);
  }

  addCategory(category: Category){
    return new Promise((resolve, reject) => {
      this.http.post<Category>(this.environmentService.setApiService('category'), category)
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
