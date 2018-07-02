import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transit } from '../models/transit.model';
import { environment } from '../../environments/environment';
import { Paginator } from '../models/paginator.model';

@Injectable({
  providedIn: 'root'
})
export class TransitService {

  private serviceUrl = `${environment.serverURL}/transit/`;

  constructor(private http: HttpClient) {
  }

  getTransits(): Observable<Transit[]> {
    return this.http.get<Transit[]>(this.serviceUrl);
  }

  addTransit(transit: Transit): Observable<Transit> {
    return this.http.post<Transit>(this.serviceUrl, transit);
  }

  getTransitById(id: number): Observable<Transit> {
    return this.http.get<Transit>(`${this.serviceUrl}/${id}`);
  }

  getTransitsByCategoryId(id: number, page: number, size: number): Observable<Paginator> {
    return this.http.get<Paginator>(`${this.serviceUrl}?categoryId=${id}&page=${page}&size=${size}`);
  }

  getTransitsByNextLevelCategoryName(categoryName: string, page: number, size: number): Observable<Paginator> {
    return this.http.get<Paginator>(`${this.serviceUrl}?nextLevelCategoryName=${categoryName}&page=${page}&size=${size}`);
  }
}
