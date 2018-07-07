import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalSearchService } from '../../services/global-search.service';
import { Transit } from '../../models/transit.model';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private globalSearchService: GlobalSearchService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.getResults();

  }

  getResults(): void {
    this.searchValue = this.route.snapshot.paramMap.get('value');
    this.globalSearchService.getResults(this.searchValue).subscribe(transits => {
      this.dataSource.data = transits;
      this.dataSource.paginator = this.paginator;
      if (transits.length == 1) {
        this.transitOne = transits;
        this.transitOne.map(tmp => {
          this.router.navigate(['show-transit-scheme/' + tmp.categoryId + '/' + tmp.id + '/' + tmp.name]);
        });
      }
    });

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
