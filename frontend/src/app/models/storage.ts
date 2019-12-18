import {ComponentModel} from './component';

export class Storage {
  id:number;
  name:string;
  location:string;
  components:{sum:number; component_id:number, component: ComponentModel}[];
}
