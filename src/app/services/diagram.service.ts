import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {HeatMapInputData} from '../models/heat-map-input-data';

@Injectable()
export class DiagramService {
  constructor(private http: HttpClient) {
  }

  getResults(url: string) {
    return this.http.get(url);
  }

  getHeatMapData(transitId, stopList) {
    stopList.map(data => JSON.stringify(data));
    return this.http.get(environment.serverURL + '/feedback/heat-map/' + transitId + '?stop-list=' + stopList);
  }
}
