import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';
import { GlobalSearchService } from '../../../../services/global-search.service';
import { StopService } from '../../../../services/stop.service';
import { Transit } from '../../../../models/transit.model';
import { Stop } from '../../../../models/stop.model';
import { Router } from '@angular/router';
import { NonExCategoryService } from '../../../../services/non-ex-category.service';
import { Category } from '../../../../models/category.model';
import { TransitService } from '../../../../services/transit.service';
import { environment } from '../../../../../environments/environment';
import { ExcategoryService } from '../../../../services/excategory.service';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit, OnChanges {

  delayMs = 5000;
  delayMsNumber = 100;
  myControl = new FormControl();
  filteredOptions: Observable<Transit[]>;
  transits: Transit[] = [];
  stops: Stop[] = [];
  streets: string[] = [];
  uniqueStreet: string[] = [];
  filteredStreets: Observable<String[]>;
  categoryIconURL = `${environment.serverURL}/category/img?link=`;
  choosenTransit: Transit;
  choosenCategory: Category[];


  constructor(private globalSearchService: GlobalSearchService,
              private stopService: StopService,
              private router: Router,
              private transitService: TransitService,
              private nonExService: NonExCategoryService
              ) {
  }

  ngOnInit() {
    this.useFilter(null);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.useFilter(changes);

  }

  private useFilter(value: any) {
    if (!(value === null)) {
      this.filteredOptions = this.myControl.valueChanges
        .pipe(startWith(this.myControl.value),
          map(valueLocal => this._filter(value))
        );
      this.filteredStreets = this.myControl.valueChanges.pipe(delay(this.delayMs),
        startWith(delay(this.delayMsNumber),
          this.myControl.value),
        map(valueLocal => this.filterStreet(value)));

    }
  }

  private _filter(value: number): Transit[] {
    const filterValue = value.toString().toLowerCase();
    this.getData(filterValue);
    return this.transits.filter(transit =>
      transit.name.toLowerCase().includes(filterValue)
    )
      ;
  }

  private filterStreet(value: string): string [] {
    const filterValue = value.toString().toLowerCase();
    return this.uniqueStreet.filter(street => street.toLowerCase().includes(filterValue));
  }

  getData(searchTerm: string) {
    if (this.globalSearchService.isLocationChange === true) {
      this.filteredOptions = new Observable<Transit[]>();
      this.globalSearchService.setIsLocationChange(false);
    }
    this.globalSearchService.getResults(searchTerm).subscribe((transits: Transit[]) => {
      this.transits = transits;
      console.log(this.transits);
      transits.map(stops =>
        stops.stops.map(value => {
          console.log(this.streets);
          if (!(value.street === null)) {
            this.streets.push(value.street
            );
          }

        }));
      this.uniqueStreet = Array.from(new Set(this.streets));
    });
  }



  myEvent(choosenValue: Transit) {
    this.transitService.getTransitById(choosenValue.id).subscribe(
      tmp => {
        this.choosenTransit = tmp;
        this.nonExService.getNameByCategoryId(this.choosenTransit.categoryId).subscribe(
          category => {
            this.choosenCategory = category;
            this.router.navigate(['show-transit-scheme/main/Public Transport/' + '/' +
            this.choosenCategory[0].nextLevelCategory.name + '/' + this.choosenCategory[0].id + '/' +
            this.choosenTransit.id + '/' + this.choosenTransit.name + '/' + this.choosenTransit.categoryIconURL.replace('/', '%2F')]);
          });
      }
    );
  }

}

