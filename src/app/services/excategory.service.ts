import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExcategoryModel} from '../models/excategory.model';
import {environment} from '../../environments/environment';
import {Category} from '../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class ExcategoryService {

  private serviceUrl = environment.serverURL + '/category';

  constructor(private http: HttpClient) {
  }

  getTopCategories(): Observable<ExcategoryModel[]> {
    return this.http.get<ExcategoryModel[]>(this.serviceUrl + '/top');
  }

  getCategoriesByNextLevel(nextLevel: String): Observable<ExcategoryModel[]> {
    return this.http.get<ExcategoryModel[]>(this.serviceUrl + '?firstNestedCategoryName=' + nextLevel);
  }

  save(category: Category): Observable<Category> {
    return this.http.post<Category>(this.serviceUrl, category);
  }

  public getCategoryByName(cityName: String) {
    return this.http.get<Category[]>(this.serviceUrl + '?name=' + cityName);
  }
}
