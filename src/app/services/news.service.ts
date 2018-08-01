import { Injectable } from '@angular/core';
import { Observable } from "rxjs/index";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { NewsPaginator } from "../components/main/news/news.component";
import { NewsModel } from "../models/news.model";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private serviceUrl = `${environment.serverURL}/news`;

  constructor(private http: HttpClient) {
  }

  getNews(page: number, size: number): Observable<NewsPaginator> {
    return this.http.get<NewsPaginator>(`${this.serviceUrl}?&page=${page}&size=${size}`);
  }
}
