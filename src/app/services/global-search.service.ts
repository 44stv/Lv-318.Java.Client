import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Transit } from '../models/transit.model';
import { Stop } from '../models/stop.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GlobalSearchService {
  private globalSearchUrl = environment.serverURL + '/search';
  private curentLocation: string;

  constructor(private http: HttpClient) {
  }

  getResults(searchValue: string): Observable<Transit[]> {
    const globalSearchUrl = `${this.globalSearchUrl}/?search=${searchValue}`;
    return this.http.get<Transit[]>(globalSearchUrl);
  }
  getStopsResult(searchValue: string): Observable<Stop[]> {
    const stopSearchUlr = `${this.globalSearchUrl}/?searchStop=${searchValue}`;
    return this.http.get<Stop[]>(stopSearchUlr);
  }

  setCurentLocation(value: string) {
    this.curentLocation = value;
  }

  getCurentLocation(): string {
    return this.curentLocation;
  }
}
