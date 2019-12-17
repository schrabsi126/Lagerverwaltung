import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddCategoryComponent} from '../add-category/add-category.component';
import {Category} from '../models/category';
import {AddComponentDialogComponent} from '../add-component-dialog/add-component-dialog.component';
import {AddStorageDialogComponent} from '../add-storage-dialog/add-storage-dialog.component';
import {ComponentService} from '../services/component.service';
import {MatTableDataSource} from '@angular/material/table';
import {ComponentModel} from '../models/component';
import {SelectionModel} from '@angular/cdk/collections';
import {FormGroup} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-show-components',
  templateUrl: './show-components.component.html',
  styleUrls: ['./show-components.component.css']
})
export class ShowComponentsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'part_number', 'number'];
  dataSource: MatTableDataSource<ComponentModel>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  components:ComponentModel[];

  constructor(private dialog: MatDialog, private componentService:ComponentService) {
    this.componentService.components.subscribe(components => {
      if (components.length == 0) {
        this.componentService.loadComponents();
      }
      this.components=components;
      this.dataSource = new MatTableDataSource(this.components);
    });
  }

  ngOnInit() {

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '250px'});

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        console.log(result);
      }
    });
  }
  openCompDialog(): void {
    let dialogRef2 = this.dialog.open(AddComponentDialogComponent, {
      width: '400px'});

    dialogRef2.afterClosed().subscribe(result => {
      if(result)
      {
        console.log(result);
      }
    });
  }
  openStorageDialog(): void {
    let dialogRef2 = this.dialog.open(AddStorageDialogComponent, {
      width: '250px'});

    dialogRef2.afterClosed().subscribe(result => {
      if(result)
      {
        console.log(result);
      }
    });
  }
}
