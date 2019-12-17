import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Storage} from '../models/storage';
import {MatTableDataSource} from '@angular/material/table';
import {ComponentModel} from '../models/component';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ComponentService} from '../services/component.service';
import {StorageService} from '../services/storage.service';
import {Delivery} from '../models/delivery';
import {DeliveryService} from '../services/delivery.service';
import {StorageShift} from '../models/storage-shift';
import {StorageShiftService} from '../services/storage-shift.service';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent implements OnInit {

  pipe = new DatePipe('en-US');
  delivery:Delivery;
  storageShifts:StorageShift[]=[];
  storages:Storage[];
  displayedColumns: string[] = ['select','id', 'name', 'part_number'];
  dataSource: MatTableDataSource<ComponentModel>;
  deliveryForm:FormGroup;

  components:ComponentModel[];
  constructor(private componentService:ComponentService, private storageService:StorageService, private deliveryService:DeliveryService,
              private storageShiftService:StorageShiftService) {
  }

  ngOnInit() {
    this.delivery= new Delivery();
    this.delivery.date=(new Date()).toISOString();
    this.storageService.getStorages().subscribe(storages => {
      this.storages=storages;
    });
    this.componentService.getComponents().subscribe(components => {
      this.components=components;
      this.dataSource = new MatTableDataSource(this.components);
    });

    this.deliveryForm = new FormGroup({
      'date': new FormControl(this.delivery.date,[Validators.required]),
      'from': new FormControl(this.delivery.from_id,[Validators.required]),
      'to': new FormControl(this.delivery.to_id,[Validators.required]),
    });
  }
  checkShifts:boolean=false;
  selection = new SelectionModel<ComponentModel>(true, []);

  updateCheckShifts() {
    if(!this.selection.selected)
    {
      this.checkShifts=false;
      return;
    }
    for (let i=0;i<this.selection.selected.length;i++)
    {
      if(!this.selection.selected[i].numberForDelivery) {
        this.checkShifts=false;
        return;
      }
        if(this.selection.selected[i].numberForDelivery<1)
        {
          this.checkShifts=false;
          return;
        }
    }

    this.checkShifts=true;
  }

  addDelivery()
  {
    this.delivery.from_id=this.deliveryForm.get('from').value;
    this.delivery.to_id=this.deliveryForm.get('to').value;
    this.delivery.date=this.pipe.transform(this.deliveryForm.get('date').value, 'yyyy-MM-dd');
    this.delivery.user_id=JSON.parse(localStorage.getItem('userInfo')).data.id;
    this.deliveryService.addDelivery(this.delivery).then(x=>{
      let storageShifts:StorageShift[]=[];
      this.selection.selected.forEach(function (item) {
        let storageShift= new StorageShift();
        storageShift.component_id=item.id;
        // @ts-ignore
        storageShift.delivery_id=x.data.id;
        storageShift.number=item.numberForDelivery;
        storageShifts.push(storageShift)
      });
        this.storageShiftService.addStorageShifts(storageShifts).then(y=>
        {console.log(y);}
        );
    });
  }

}
