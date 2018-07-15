import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserInfoModel} from '../../../models/user-info.model';
import {DiagramService} from '../../../services/diagram.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-users-conf',
  templateUrl: './users-conf.component.html',
  styleUrls: ['./users-conf.component.css']
})
export class UsersConfComponent implements OnInit {

  displayedColumns = ['firstname', 'lastname', 'email', 'role'];
  dataSource: MatTableDataSource<UserInfoModel> = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private useService: UserService,
              private route: ActivatedRoute,
              private diagramService: DiagramService
  ) {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getUsers();
  }

  getUsers(): void {

    this.useService.getAllUsersInfo(this.paginator.pageIndex, this.paginator.pageSize).subscribe(
      users => {
        this.dataSource.data = users.content;
        console.log(users);
      }
    );

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
