import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Transit } from '../../../../models/transit.model';
import { GlobalSearchService } from '../../../../services/global-search.service';
import { ExcategoryService } from '../../../../services/excategory.service';
import { NonExCategoryService } from '../../../../services/non-ex-category.service';
import { Category } from '../../../../models/category.model';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css']
})
export class GlobalSearchComponent implements OnInit {
  transitOne: Transit[];
  searchValue: string;
  displayedColumns = ['categoryId', 'name', 'routeName'];
  dataSource = new MatTableDataSource();
  categoryIconURL = `${environment.serverURL}/category/img?link=`;
  choosenCategory: Category[];
  tmpTransit: Transit;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private globalSearchService: GlobalSearchService,
              private location: Location,
              private route: ActivatedRoute,
              private router: Router,
              private nonExService: NonExCategoryService,
  ) {
  }

  ngOnInit() {
    this.getResults();

  }

  getResults(): void {
    this.searchValue = this.route.snapshot.paramMap.get('value');
    this.globalSearchService.getResults(this.searchValue).subscribe(transits => {
      this.dataSource.data = transits;
      this.dataSource.paginator = this.paginator;
      if (transits.length === 1) {
        this.transitOne = transits;
        this.transitOne.map(tmp => {
          this.tmpTransit = tmp;
          this.nonExService.getNameByCategoryId(this.tmpTransit.categoryId).subscribe(
            category => {
              this.choosenCategory = category;
              this.router.navigate(['show-transit-scheme/main/Public Transport/' + '/' +
              this.choosenCategory[0].nextLevelCategory.name + '/' + this.choosenCategory[0].id + '/' +
              this.tmpTransit.id + '/' + this.tmpTransit.name + '/' + this.tmpTransit.categoryIconURL.replace('/', '%2F')]);
            });
        });
      }
    });

  }

  seeOne(choosenTransit: Transit) {
    console.log(choosenTransit);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    this.dataSource.filter = filterValue;
    this.dataSource.filterPredicate = (data, filter) =>
      JSON.stringify(data).includes(filter);
  }

  gotBack(): void {
    this.location.back();
  }
}
