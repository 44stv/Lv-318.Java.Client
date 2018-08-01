import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MyComment } from '../models/comment.model';
import { CommentRating } from '../models/comment-rating.model';
import { UserInfo } from '../models/userInfo.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private serviceUrl = `${environment.serverURL}/comment`;
  private imageUrl = `${environment.imageServerURL}/image`;

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

  addComment(params: HttpParams, newComment: MyComment): Observable<MyComment> {
    return this.http.post<MyComment>(this.serviceUrl, newComment, {params: params});
  }

  addImagesToComment(id: number, imageURLs: string): Observable<MyComment> {
    return this.http.put<MyComment>(`${this.serviceUrl}?commentId=${id}`, imageURLs);
  }

  likeComment(commentId: number, userId: number): Observable<CommentRating> {
    return this.http.post<CommentRating>(`${this.serviceUrl}/${commentId}/like/${userId}`, null);
  }

  dislikeComment(commentId: number, userId: number): Observable<CommentRating> {
    return this.http.post<CommentRating>(`${this.serviceUrl}/${commentId}/dislike/${userId}`, null);
  }

  getVotedUsers(commentId: number): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${this.serviceUrl}/${commentId}/voted`);
  }

  uploadFile(file: File, subDir: string) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const fullURL = `${this.imageUrl}?${subDir}`;

    return this.http.post(fullURL, formData, {responseType: 'text'});
  }

}
