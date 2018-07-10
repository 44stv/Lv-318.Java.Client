import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Geotag} from '../models/geotag.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private serviceUrl = environment.serverURL + '/location';

  constructor(private http: HttpClient) {
  }

  getAvailableLocations() {
    return this.http.get<Geotag[]>(this.serviceUrl + '/all');
  }

  getCurrentLocation(latitude: number, longtitude: number) {
    return this.http.get<Geotag>(this.serviceUrl + '?latitude=' + latitude + '&longtitude=' + longtitude);
  }
}
