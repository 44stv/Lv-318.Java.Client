import { Component, OnInit } from '@angular/core';
import {ExcategoryService} from '../../services/excategory.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ExcategoryModel} from '../../models/excategory.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public list: Observable<ExcategoryModel[]> = this.service.getTopCategories();
  public cities: Observable<ExcategoryModel[]>;
  public serverURL = environment.serverURL + '/category/img?link=';

  constructor(public service: ExcategoryService) {
  }

  ngOnInit() {
    this.list = this.service.getTopCategories();
  }

  getCities(nextLevel: String) {
    this.cities = this.service.getCategoriesByNextLevel(nextLevel);
  }

}
