import {Entry} from './entry';
import {StorageShift} from './storage-shift';

export class ComponentModel {
  id:number;
  name:string;
  price:number;
  part_number:string;
  state:boolean;
  VP_unit:number;
  description:string;
  category_id:number;
  number:number;
  numberForDelivery:number;
  category:string;
  entries:Entry[];
  shifts:StorageShift[];
  storages:{count:number; storage:string, storage_id:number}[];

}
