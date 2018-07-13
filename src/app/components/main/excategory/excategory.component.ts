import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

import {ExcategoryModel} from '../../../models/excategory.model';
import {ExcategoryService} from '../../../services/excategory.service';

@Component({
  selector: 'app-excategory',
  templateUrl: './excategory.component.html',
  styleUrls: ['./excategory.component.css']
})
export class ExcategoryComponent implements OnInit {
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
