import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExcategoryModel} from '../models/excategory.model';
import {environment} from '../../environments/environment';
import {Category} from '../models/category';


@Injectable({
  providedIn: 'root'
})
export class NonExCategoryService {

  private serviceUrl = environment.serverURL + '/category';

  constructor(private http: HttpClient) {
  }

  public getByNames(name: String, nextlevel: String): Observable<ExcategoryModel[]> {
    return this.http.get<ExcategoryModel[]>(this.serviceUrl + '/count' + '?firstNestedCategoryName=' + name
      + '&secondNestedCategoryName=' + nextlevel);
  }

  public getNameByCategoryId(id: number) {
    return this.http.get<Category[]>(this.serviceUrl + '?id=' + id);
  }
}

