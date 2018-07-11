import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({ providedIn: 'root' })
export class SocialService {

  private socialUrl = environment.serverURL + '/user'+'/social';

  constructor(private http: HttpClient) {
  }
  signInWithSocial(user: User): Observable<any> {
    console.log('service');
    console.log('servie'+ user);
    return this.http.post<User>(this.socialUrl, user);
  }

}
