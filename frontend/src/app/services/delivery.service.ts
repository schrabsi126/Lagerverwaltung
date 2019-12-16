import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService} from './environment.service';
import {Delivery} from '../models/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http:HttpClient, private  environmentService:EnvironmentService) { }
  addDelivery(delivery: Delivery){
    return new Promise((resolve, reject) => {
      this.http.post<Delivery>(this.environmentService.setApiService('delivery'), delivery)
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
