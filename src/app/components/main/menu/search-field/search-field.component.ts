import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { GlobalSearchService } from '../../../../services/global-search.service';
import { StopService } from '../../../../services/stop.service';
import { Transit } from '../../../../models/transit.model';
import { Stop } from '../../../../models/stop.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit, OnChanges {

  delayMs = 5000;
  myControl = new FormControl();
  filteredOptions: Observable<Transit[]>;
  filteredOptionsStops: Observable<Stop[]>;
  transits: Transit[] = [];
  stops: Stop[] = [];
  constructor(private globalSearchService: GlobalSearchService,
    private stopService: StopService,
    private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.useFilter(changes);

  }

  private useFilter(value: any) {
    if (!(value === null)) {
      this.filteredOptionsStops = this.myControl.valueChanges
        .pipe(delay(this.delayMs),
          startWith(this.myControl.value),
          map(valueLocal => this.filterStrops(valueLocal))
        );
      this.filteredOptions = this.myControl.valueChanges
        .pipe(delay(this.delayMs),
          startWith(this.myControl.value),
          map(valueLocal => this._filter(valueLocal))
        );
    }
    if (value === null) {
      this.filteredOptions = null;
      this.filteredOptionsStops = null;
    }
  }

  private _filter(value: number): Transit[] {
    const filterValue = value.toString().toLowerCase();
    this.getData(filterValue);
    return this.transits.filter(transit => transit.name.toLowerCase().includes(filterValue)
    );
  }

  private filterStrops(value: string): Stop[] {
    const filterValue = value.toLowerCase();
    this.getStops(value);
    return this.stops.filter(stop => stop.street.toLowerCase().includes(filterValue));
  }

  getData(searchTerm: string) {
    this.globalSearchService.getResults(searchTerm).subscribe(transits => {
      this.transits = transits;
    });
  }

  getStops(searchTerm: string) {
    this.globalSearchService.getStopsResult(searchTerm).subscribe(stops => {
      this.stops = stops;
    });
  }

  onEnter(choosenSearchTerm: string) {
    this.router.navigate(['search/' + '?search=/' + choosenSearchTerm]);
  }

}
