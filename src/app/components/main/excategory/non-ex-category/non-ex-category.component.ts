import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { environment } from '../../../../../environments/environment';

import { ExcategoryModel } from '../../../../models/excategory.model';
import { TransitsComponent } from './transits/transits.component';
import { NonExCategoryService } from '../../../../services/non-ex-category.service';
import { TransitService } from "../../../../services/transit.service";

@Component({
  selector: 'app-non-ex-category',
  templateUrl: './non-ex-category.component.html',
  styleUrls: ['./non-ex-category.component.css']
})

export class NonExCategoryComponent implements OnInit {
  public list: Observable<ExcategoryModel[]>;
  serverURL = environment.serverURL + '/category/img?link=';

  displayedColumns = ['id', 'name', 'nextLevelCategory_name'];

  top: String;
  city: String;
  private sub: any;

  @ViewChild(TransitsComponent)
  private transitChild: TransitsComponent;

  discreteInputEventValue: number;
  discreteChangeEventValue: number;

  discreteMin: number = 0;
  discreteMax: number = 100;


  constructor(private service: NonExCategoryService,
              private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.hideRoute('/main/Public%20Transport');
  }

   ngOnInit() {
    this.sub = this.route.params.forEach(params => {
      this.city = params['city'];
      this.top = params['top'];
      this.list = this.service.getByNames(this.city, this.top);
      console.log(this.city);
    });
  }
}
