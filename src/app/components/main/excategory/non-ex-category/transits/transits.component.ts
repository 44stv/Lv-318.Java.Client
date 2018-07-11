import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {environment} from '../../../../../../environments/environment';

import {Transit} from '../../../../../models/transit.model';
import {TransitService} from '../../../../../services/transit.service';
import {DiagramService} from '../../../../../services/diagram.service';
import {BreadcrumbService} from 'ng5-breadcrumb';
import {NonExCategoryService} from '../../../../../services/non-ex-category.service';


@Component({
  selector: 'app-transits',
  templateUrl: './transits.component.html',
  styleUrls: ['./transits.component.css']
})
export class TransitsComponent implements OnInit, AfterViewInit {

  categoryId: number;
  cityName: string;
  averageRate;

  categoryIconURL = `${environment.serverURL}/category/img?link=`;

  displayedColumns = ['categoryIcon', 'name', 'routeName'/*, 'averageRate'*/];

  dataSource: MatTableDataSource<Transit> = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private transitService: TransitService,
              private route: ActivatedRoute,
              private diagramService: DiagramService,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.hideRoute('/main/Public%20Transport');
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.getTransits();
  }

  getTransits(): void {
    this.route.params.forEach(params => {
      if (params['id'] !== undefined) {
        this.categoryId = params['id'];
        this.getAllByCategoryId(this.categoryId, this.paginator.pageIndex, this.paginator.pageSize);
      }
      if (params['id'] === undefined) {
        this.cityName = params['city'];
        this.getAllByNextLevelCategoryName(this.cityName, this.paginator.pageIndex, this.paginator.pageSize);
      }
    });

    this.paginator.page.subscribe(() => {
      if (this.categoryId !== undefined) {
        this.getAllByCategoryId(this.categoryId, this.paginator.pageIndex, this.paginator.pageSize);
      }
      if (this.categoryId === undefined) {
        this.getAllByNextLevelCategoryName(this.cityName, this.paginator.pageIndex, this.paginator.pageSize);
      }
    });
  }

  getAllByCategoryId(categoryId: number, page: number, size: number) {
    this.transitService.getTransitsByCategoryId(categoryId, page, size)
      .subscribe(transits => {
        this.dataSource.data = transits.content;
        this.paginator.length = transits.totalElements;
      });
  }

  getAllByNextLevelCategoryName(categoryName: string, page: number, size: number) {
    this.transitService.getTransitsByNextLevelCategoryName(categoryName, page, size)
      .subscribe(allTransits => {
        this.dataSource.data = allTransits.content;
        this.paginator.length = allTransits.totalElements;
      });
  }

  getTransitAverageRate(transitId: number): number {
    this.diagramService.getResults(environment.serverURL + '/feedback/rate/' + transitId)
      .subscribe(res => {
        this.averageRate = (<number>res).toPrecision(3);
      });
    return this.averageRate;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
