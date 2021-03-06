import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { environment } from '../../../../../environments/environment';

import { ExcategoryModel } from '../../../../models/excategory.model';
import { TransitsComponent } from './transits/transits.component';
import { NonExCategoryService } from '../../../../services/non-ex-category.service';

@Component({
  selector: 'app-non-ex-category',
  templateUrl: './non-ex-category.component.html',
  styleUrls: ['./non-ex-category.component.css']
})

export class NonExCategoryComponent implements OnInit {
  public list: Observable<ExcategoryModel[]>;
  serverURL = environment.serverURL + '/category/img?link=';

  top: String;
  city: String;
  private sub: any;

  @ViewChild(TransitsComponent)
  private transitChild: TransitsComponent;

  constructor(private service: NonExCategoryService,
              private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) {
    this.route.params.subscribe(params => {
      this.breadcrumbService.hideRoute('/main/' + encodeURI(params['top']));
    });
  }

  ngOnInit() {
    this.sub = this.route.params.forEach(params => {
      this.city = params['city'];
      this.top = params['top'];
      this.list = this.service.getByNames(this.city, this.top);
    });
  }
}
