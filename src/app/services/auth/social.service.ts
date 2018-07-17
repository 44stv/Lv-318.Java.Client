import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../../models/user.model';
import {environment} from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class SocialService {

  private socialUrl = environment.serverURL + '/user';

  constructor(private http: HttpClient) {
  }

  signInWithSocialGoogle(user: User): Observable<any> {
    console.log('service');
    console.log('servie' + user.email);
    const googleUrl = `${this.socialUrl}/social`;
    return this.http.post<User>(googleUrl, user);
  }

  signInWithSocialFacebook(user: User): Observable<any> {
    console.log('service');
    console.log('servie' + user.email);
    const FacebookUrl = `${this.socialUrl}/socialFacebook`;
    return this.http.post<User>(FacebookUrl, user);
  }

}
