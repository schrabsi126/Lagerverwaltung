import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ComponentModel} from '../models/component';
import {ComponentService} from '../services/component.service';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Entry} from '../models/entry';
import {StorageService} from '../services/storage.service';
import {Storage} from '../models/storage';
import {EntryService} from '../services/entry.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit {

  pipe = new DatePipe('en-US');
  entry:Entry;
  storages:Storage[];
  displayedColumns: string[] = ['id', 'name', 'part_number'];
  dataSource: MatTableDataSource<ComponentModel>;
  selection = new SelectionModel<ComponentModel>(false, []);
  selctedComponent:ComponentModel;
  entryForm:FormGroup;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  components:ComponentModel[];
  constructor(private componentService:ComponentService, private storageService:StorageService, private entryService:EntryService) {
  }

  ngOnInit() {
    this.entry= new Entry();
    this.entry.date=(new Date()).toISOString();
    this.storageService.getStorages().subscribe(storages => {
      this.storages=storages;
    });
    this.componentService.getComponents().subscribe(components => {
      this.components=components;
      this.dataSource = new MatTableDataSource(this.components);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.entryForm = new FormGroup({
      'number': new FormControl(this.entry.number, [
        Validators.required]),
      'date': new FormControl(this.entry.date,[Validators.required]),
      'storage': new FormControl(this.entry.storage_id,[Validators.required]),
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getComp(component:ComponentModel)
  {
    if(this.selctedComponent===component)
    {
      this.selctedComponent=null;
    }
    else
    {
      this.selctedComponent=component;
    }
  }

  addEntry()
  {
   this.entry.storage_id=this.entryForm.get('storage').value;
   this.entry.date=this.pipe.transform(this.entryForm.get('date').value, 'yyyy-MM-dd');
   this.entry.number=this.entryForm.get('number').value;
   this.entry.component_id=this.selctedComponent.id;
   this.entry.user_id=JSON.parse(localStorage.getItem('userInfo')).data.id;
   this.entryService.addEntry(this.entry).then(x=>{
     this.componentService.loadComponents();
   });
  }

}
