import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MyComment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private serviceUrl = `${environment.serverURL}/comment`;

  constructor(private http: HttpClient) {
  }

  getTopComments(transitId: number): Observable<MyComment[]> {
    return this.http.get<MyComment[]>(`${this.serviceUrl}/${transitId}`);
  }

  getChildrenComments(parentId: number): Observable<MyComment[]> {
    return this.http.get<MyComment[]>(`${this.serviceUrl}?parentId=${parentId}`);
  }

  getUserComments(userId: number): Observable<MyComment[]> {
    return this.http.get<MyComment[]>(`${this.serviceUrl}?userId=${userId}`);
  }
}
