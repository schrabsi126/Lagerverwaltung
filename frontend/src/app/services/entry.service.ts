import { Injectable } from '@angular/core';
import {Category} from '../models/category';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService} from './environment.service';
import {Entry} from '../models/entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http:HttpClient, private  environmentService:EnvironmentService) { }
  addEntry(entry: Entry){
    return new Promise((resolve, reject) => {
      this.http.post<Entry>(this.environmentService.setApiService('entry'), entry)
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
