import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService} from './environment.service';
import {Delivery} from '../models/delivery';
import {StorageShift} from '../models/storage-shift';

@Injectable({
  providedIn: 'root'
})
export class StorageShiftService {

  constructor(private http:HttpClient, private  environmentService:EnvironmentService) { }
  addStorageShift(storageShift: StorageShift){
    return new Promise((resolve, reject) => {
      this.http.post<StorageShift>(this.environmentService.setApiService('storageShift'), storageShift)
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
  addStorageShifts(storageShifts: StorageShift[]){
    return new Promise((resolve, reject) => {
      this.http.post<StorageShift[]>(this.environmentService.setApiService('storageShifts'), storageShifts)
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
