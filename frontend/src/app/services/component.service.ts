import { Injectable } from '@angular/core';
import {Category} from '../models/category';
import {ComponentModel} from '../models/component';
import {EnvironmentService} from './environment.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Storage} from '../models/storage';
import {Users} from '../models/users';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor(private  environmentService:EnvironmentService, private http:HttpClient) {
    this.dataStore={components:[]};
    this._components=new BehaviorSubject<ComponentModel[]>([]);

  }

  getComponents() {
    let url = this.environmentService.setApiService('components');
    return this.http.get<ComponentModel[]>(url)
      .map(res => res)
      .catch(this.handleError)
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    const body = error.json() || '';
    errMsg = error.message ? error.message : error.toString();
    return Observable.throw(body);
  }

  addComponent(component: ComponentModel){
    return new Promise((resolve, reject) => {
      this.http.post<ComponentModel>(this.environmentService.setApiService('component'), component)
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

  private dataStore: { components: ComponentModel[] };
  private _components: BehaviorSubject<ComponentModel[]>;

  loadComponents() {
    let url = this.environmentService.setApiService('components');
    return this.http.get<ComponentModel[]>(url)
      .map(res => res)
      .catch(this.handleError)
      .subscribe(
        data => {
          this.dataStore.components = data;
          this._components.next(Object.assign({}, this.dataStore).components);
        },
        error => {
          console.log("Failed to fetch students")
        }
      )
  }
  get components():Observable<ComponentModel[]>{
    return this._components.asObservable();
  }

}
