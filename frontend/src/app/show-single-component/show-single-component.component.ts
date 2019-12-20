import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ComponentService} from '../services/component.service';
import {ComponentModel} from '../models/component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Entry} from '../models/entry';
import {StorageShift} from '../models/storage-shift';

@Component({
  selector: 'app-show-single-component',
  templateUrl: './show-single-component.component.html',
  styleUrls: ['./show-single-component.component.css']
})
export class ShowSingleComponentComponent implements OnInit {

  constructor(private route:ActivatedRoute, private componentService:ComponentService) { }
  component:ComponentModel=new ComponentModel();
  displayedColumnsEntries: string[] = ['id', 'date','user', 'storage', 'number'];
  dataSourceEntry: MatTableDataSource<Entry>;
  @ViewChild('pagerEntry', {static: true}) paginatorEntry: MatPaginator;
  @ViewChild('sortEntry', {static: true}) sortEntry: MatSort;
  displayedColumnsStorage: string[] = ['id', 'storage','count'];
  dataSourceStorage: MatTableDataSource<{storage:string; storage_id:number; count:number}>;
  @ViewChild('pagerStorage', {static: true}) pagerStorage: MatPaginator;
  @ViewChild('sortStorage', {static: true}) sortStorage: MatSort;
  displayedColumnsShift: string[] = ['id', 'date', 'to', 'from','user','number'];
  dataSourceShift: MatTableDataSource<StorageShift>;
  @ViewChild('pagerShift', {static: true}) pagerShift: MatPaginator;
  @ViewChild('sortShift', {static: true}) sortShift: MatSort;
  ngOnInit() {
    this.route.params.subscribe(params=>{
        this.componentService.getComponent(params['id']).subscribe(component=>
        {
          this.component=component;
          this.dataSourceEntry = new MatTableDataSource(this.component.entries);
          this.dataSourceStorage = new MatTableDataSource(this.component.storages);
          this.dataSourceShift = new MatTableDataSource(this.component.shifts);
          this.dataSourceEntry.paginator = this.paginatorEntry;
          this.dataSourceEntry.sort = this.sortEntry;
          this.dataSourceStorage.paginator = this.pagerStorage;
          this.dataSourceStorage.sort = this.sortStorage;
          this.dataSourceShift.paginator = this.pagerShift;
          this.dataSourceShift.sort = this.sortShift;
        }
        );
    }
    );
  }

  applyFilterEntry(filterValue: string) {
    this.dataSourceEntry.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceEntry.paginator) {
      this.dataSourceEntry.paginator.firstPage();
    }
  }

  applyFilterStorage(filterValue: string) {
    this.dataSourceStorage.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceStorage.paginator) {
      this.dataSourceStorage.paginator.firstPage();
    }
  }

  applyFilterShift(filterValue: string) {
    this.dataSourceShift.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceShift.paginator) {
      this.dataSourceShift.paginator.firstPage();
    }
  }
}
