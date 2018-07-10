import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {environment} from '../../../../../../environments/environment';

import {Transit} from '../../../../../models/transit.model';
import {TransitService} from '../../../../../services/transit.service';
import {DiagramService} from '../../../../../services/diagram.service';
import {BreadcrumbService} from 'ng5-breadcrumb';


@Component({
  selector: 'app-transits',
  templateUrl: './transits.component.html',
  styleUrls: ['./transits.component.css']
})
export class TransitsComponent implements OnInit, AfterViewInit {

  categoryId: number;
  cityName: string;
  averageRateArray: Map<number, number> = new Map<number, number>();

  categoryIconURL = `${environment.serverURL}/category/img?link=`;

  displayedColumns = ['categoryIcon', 'name', 'routeName', 'averageRate'];

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
    // this.dataSource.paginator = this.paginator;
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
        this.getAllRate(this.dataSource.data);
        this.paginator.length = transits.totalElements;
      });
  }

  getAllByNextLevelCategoryName(categoryName: string, page: number, size: number) {
    this.transitService.getTransitsByNextLevelCategoryName(categoryName, page, size)
      .subscribe(allTransits => {
        this.dataSource.data = allTransits.content;
        this.getAllRate(this.dataSource.data);
        this.paginator.length = allTransits.totalElements;
      });
  }

  getAllRate(array: Transit[]) {
    for (const transit of array) {
        this.getTransitAverageRate(transit.id);
    }
  }

  getTransitAverageRate(transitId: number): number {
    let rate;
    this.transitService.getTransitRateById(transitId).subscribe(res => {
      rate = Number((<number>res).toPrecision(3));
      this.averageRateArray.set(transitId, rate);
    });
    return rate;
  }

  // onSubmit() {
  //   this.transitService.addTransit(this.transit)
  //     .subscribe(res => console.log(res));
  //   alert('Transit added: ' + Convert.transitToJson(this.transit));
  // }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
