import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {StopService} from '../../../../../../services/stop.service';
import {TransitService} from '../../../../../../services/transit.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {AddFeedbackComponent} from './add-feedback/add-feedback.component';
import {AuthService} from '../../../../../../services/auth/auth.service';
import {Stop} from '../../../../../../models/stop.model';
import {BreadcrumbService} from 'ng5-breadcrumb';
import {Transit} from '../../../../../../models/transit.model';
import {environment} from '../../../../../../../environments/environment';
import {NonExCategoryService} from '../../../../../../services/non-ex-category.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-stops-grid',
  templateUrl: './stops-grid.component.html',
  styleUrls: ['./stops-grid.component.css']
})
export class StopsGridComponent implements OnInit {

  checkedItems: boolean[];
  private sub: any;
  @Input() idTransit: number;
  @Input() transitName: string;
  stopsList: Observable<Stop[]>;
  stopArray: Stop[] = [];
  forwardStops: Stop[] = [];
  backwardStops: Stop[] = [];
  public selectedStops: Stop[] = [];
  categoryId: number;
  categoryIconURL = `${environment.serverURL}/category/img?link=`;
  iconURL: string;


  constructor(private stopService: StopService,
              private authService: CustomAuthService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private breadcrumbService: BreadcrumbService,
              private nonExCatServ: NonExCategoryService,
              private transitService: TransitService,
              private location: Location) {
    this.route.params.subscribe(params => {
      const paramTransitName = encodeURI(params['name']);
      const paramIdTransit = params['id-transit'];
      const paramTopCategoryName = encodeURI(params['top']);
      const paramID = params['id'];
      const paramCity = encodeURI(params['city']);
      const paramIconURL = (<string>params['iconUrl']).replace('/', '%2F');

      // Hide Public%20Transport
      this.breadcrumbService.hideRoute('/main/' + paramTopCategoryName);

      // Hide transit
      this.breadcrumbService.hideRoute('/main/' + paramTopCategoryName + '/' + paramCity + '/' + paramID + '/transit');

      // Add friendly name for category id
      this.nonExCatServ
        .getNameByCategoryId(paramID)
        .subscribe(data => {
          this.breadcrumbService
            .addFriendlyNameForRoute('/main/' + paramTopCategoryName + '/' + paramCity + '/' + paramID, data[0].name);
        });

      // Hide transit id
      this.breadcrumbService.hideRoute('/main/' + paramTopCategoryName +
        '/' + paramCity + '/' + paramID + '/transit/' + paramIdTransit);

      // Hide IconURL
      this.breadcrumbService.hideRoute('/main/' + paramTopCategoryName +
        '/' + paramCity + '/' + paramID + '/transit/' + paramIdTransit + '/' + paramTransitName +
        '/' + paramIconURL);

      // Add friendly name for transit name
      this.breadcrumbService.addFriendlyNameForRoute('/main/' + paramTopCategoryName + '/' + paramCity +
        '/' + paramID + '/transit/' + paramIdTransit + '/' + paramTransitName, params['name']);
    });
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      const transitName = encodeURI(params['name']);
      const idTransit = params['id-transit'];
      const topCategoryName = encodeURI(params['top']);
      const id = params['id'];
      const city = encodeURI(params['city']);
      const iconURL = (<string>params['iconUrl']).replace('/', '%2F');

      let newUrl = '';

      if (id === 'undefined') {
        this.transitService.getTransitById(idTransit)
          .subscribe(data => {

            const id1 = data.categoryId;

            // Add friendly name for category id
            this.nonExCatServ
              .getNameByCategoryId(id1)
              .subscribe(item => {
                this.breadcrumbService
                  .addFriendlyNameForRoute('/main/' + topCategoryName + '/' + city + '/' + id, item[0].name);
              });

            newUrl = '/main/' + topCategoryName +
              '/' + city + '/' + id1 + '/transit/' + idTransit + '/' + transitName +
              '/' + iconURL;

            this.location.go(newUrl);
          });
      }
    });
    this.sub = this.route.params.forEach(params => {
      this.idTransit = params['id-transit'];
      this.categoryId = params['id'];
      this.transitName = params['name'];
      this.iconURL = params['iconUrl'];
    });
    this.stopsList = this.stopService.getStopsByTransitId(this.idTransit);
    this.stopsList.subscribe(stopArray => {
      this.stopArray = stopArray;
      this.checkedItems = new Array(this.stopArray.length);
      this.forwardStops = this.stopArray.filter(stop => stop.direction === 'FORWARD');
      this.backwardStops = this.stopArray.filter(stop => stop.direction === 'BACKWARD');
    });

  }

  public selectStops() {
    for (let i = 0; i < this.checkedItems.length; i++) {
      if (this.checkedItems[i] === true && !this.selectedStops.includes(this.stopArray[i], 0)) {
        this.selectedStops.push(this.stopArray[i]);
      }
      if (this.checkedItems[i] === false && this.selectedStops.includes(this.stopArray[i], 0)) {
        this.selectedStops.splice(this.selectedStops.indexOf(this.stopArray[i]), 1);
      }
    }
    console.log(this.selectedStops);

  }

  public openModal() {
    this.dialog.open(AddFeedbackComponent, {
      width: '60%',
      data: {
        number: this.idTransit, categoryId: this.categoryId,
        transitName: this.transitName
      }
    });
  }
}

