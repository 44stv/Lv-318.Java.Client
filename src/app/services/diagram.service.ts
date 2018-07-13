import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Stop} from '../models/stop.model';

const httpOptions = {
  headers: new HttpHeaders(({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })),
};

@Injectable()
export class DiagramService {
  constructor(private http: HttpClient) {
  }

  getResults(url: string) {
    return this.http.get(url);
  }

  getHeatMapData(transitId, stopList) {
    stopList.map(data => JSON.stringify(data));
    return this.http.post(environment.serverURL + '/feedback/heat-map/' + transitId, stopList);
  }
}
