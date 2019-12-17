import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../services/user.service';
import {Users} from '../models/users';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource: MatTableDataSource<Users>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  users:Users[];
  constructor(private userService:UserService) {
    this.userService.users.subscribe(users => {
      if (users.length == 0) {
        this.userService.loadUsers();
      }
      // @ts-ignore
      this.users=users.data;
      this.dataSource = new MatTableDataSource(this.users);
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
}

