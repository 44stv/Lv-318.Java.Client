import { Component, Input , OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


import { AddFeedbackComponent } from '../excategory/non-ex-category/transits/transit/add-feedback/add-feedback.component';
import { TransitService } from '../../../services/transit.service';
import { Transit } from '../../../models/transit.model';
import {ExcategoryModel} from '../../../models/excategory.model';
import {ExcategoryService} from '../../../services/excategory.service';
import {NonExCategoryService} from '../../../services/non-ex-category.service';
import {GlobalSearchService} from '../../../services/global-search.service';


@Component({
    selector: 'app-choose-transit',
    templateUrl: './choose.transit.component.html',
    styleUrls: ['./choose.transit.component.css']
  })
  export class ChooseTransitComponent implements OnInit {
    private cities: Observable<ExcategoryModel[]>;
    private typeOfTransportlist: Observable<ExcategoryModel[]>;
    private transitlist: Transit[] = [];
    @Input() transit: Transit = new Transit();
    private topCategory ='Public Transport';

    dataSource: MatTableDataSource<Transit> = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private dialogRef: MatDialogRef<ChooseTransitComponent>,
      public dialog: MatDialog,
      public transitService: TransitService,
      public service: ExcategoryService,
      private nonExCategoryservice: NonExCategoryService){}

      ngOnInit() {
        this.cities = this.service.getCategoriesByNextLevel(this.topCategory);
        
      }

      getTypeOfTransport(cityName : String) {
      this.typeOfTransportlist = this.nonExCategoryservice.getByNames(cityName, this.topCategory);
      }

      getAllTransitsByCategoryId(typeOfTransportId: number) {
        this.transitService.getTransitsByCategoryId(typeOfTransportId,0, 115)
          .subscribe(transits => {
            this.dataSource.data = transits.content;
            this.transitlist = transits.content;
            // this.paginator.length = transits.totalElements;
          });
      }

    openAddFeedbackModal(){
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
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }