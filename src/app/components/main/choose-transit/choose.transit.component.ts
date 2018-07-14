import {Component, Input, OnInit, ViewChild, OnChanges, AfterViewInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {MatDialogRef} from '@angular/material';
import {AddFeedbackComponent} from '../excategory/non-ex-category/transits/transit/add-feedback/add-feedback.component';
import {TransitService} from '../../../services/transit.service';
import {Transit} from '../../../models/transit.model';
import {ExcategoryModel} from '../../../models/excategory.model';
import {Category} from '../../../models/category.model';
import {ExcategoryService} from '../../../services/excategory.service';
import {NonExCategoryService} from '../../../services/non-ex-category.service';
import {GlobalSearchService} from '../../../services/global-search.service';
import {NumberValueAccessor} from '@angular/forms/src/directives';


@Component({
  selector: 'app-choose-transit',
  templateUrl: './choose.transit.component.html',
  styleUrls: ['./choose.transit.component.css']
})
export class ChooseTransitComponent implements OnInit {
  private cities: ExcategoryModel[] = [];
  private cityFromLocation: ExcategoryModel = new ExcategoryModel();
  private typeOfTransportlist: Observable<ExcategoryModel[]>;
  private transitlist: Transit[] = [];
  @Input() transit: Transit = new Transit();
  private topCategory = 'Public Transport';

  constructor(private dialogRef: MatDialogRef<ChooseTransitComponent>,
              public dialog: MatDialog,
              public transitService: TransitService,
              public service: ExcategoryService,
              private nonExCategoryservice: NonExCategoryService,
              private globalSearchService: GlobalSearchService) {

    this.cities = this.getCities();
    this.cityFromLocation = this.getCityByGeolocation();

  }


  ngOnInit() {
    console.log(this.cities);
    console.log(this.globalSearchService.getCurentLocation());
    console.log(this.cityFromLocation);
  }

  getTypeOfTransport() {
    this.typeOfTransportlist = this.nonExCategoryservice.getByNames(this.cityFromLocation.name, this.topCategory);
  }

  getAllTransitsByCategoryId(typeOfTransportId: number) {
    this.transitService.getTransitsByCategoryId(typeOfTransportId, 0, 115)
      .subscribe(transits => {
        this.transitlist = transits.content;
      });
  }

  openAddFeedbackModal() {
    console.log(JSON.stringify(this.transit));
    this.dialog.open(AddFeedbackComponent, {
      width: '60%',
      data: {
        number: this.transit.id, categoryId: this.transit.categoryId,
        transitName: this.transit.name
      }
    });

    this.dialogRef.close();
  }

  public getCityByGeolocation(): ExcategoryModel {
    const cityFromLocation: ExcategoryModel = new ExcategoryModel();
    this.service.getCategoryByName(this.globalSearchService.getCurentLocation()).subscribe(data => {
        cityFromLocation.id = data[0].id;
      cityFromLocation.name = data[0].name;
      cityFromLocation.nextLevelCategory = data[0].nextLevelCategory;
      }
    );
    //
    // this.cities.forEach(city => {
    //     if (city.name === this.globalSearchService.getCurentLocation()) {
    //       cityFromLocation = city;
    // }
    //   }
    // );
    return cityFromLocation;
  }

  public getCities(): ExcategoryModel[] {
    const cities: ExcategoryModel[] = [];
    this.service.getCategoriesByNextLevel(this.topCategory).subscribe(data => {
      data.forEach(city => cities.push(city));
    });
    return cities;
  }

  public compareCity(c1: ExcategoryModel, c2: ExcategoryModel): boolean {
    return (c1 && c2) ? c1.name === c2.name : c1 === c2;
  }


}
