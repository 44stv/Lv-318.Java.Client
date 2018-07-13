import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StopService} from '../../../../../../services/stop.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {AddFeedbackComponent} from './add-feedback/add-feedback.component';
import {AuthService} from '../../../../../../services/auth/auth.service';
import {Stop} from '../../../../../../models/stop.model';
import {BreadcrumbService} from 'ng5-breadcrumb';
import {environment} from '../../../../../../../environments/environment';
import {Transit} from '../../../../../../models/transit.model';
import {NonExCategoryService} from '../../../../../../services/non-ex-category.service';
import {DomSanitizer, SafeStyle, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-stops-grid',
  templateUrl: './stops-grid.component.html',
  styleUrls: ['./stops-grid.component.css']
})
export class StopsGridComponent implements OnInit {

  checkedItems: boolean[];
  private sub: any;
  transit: Transit;
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
  trustedUrl: SafeStyle;


  constructor(private stopService: StopService,
              private authService: AuthService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private breadcrumbService: BreadcrumbService,
              private nonExCatServ: NonExCategoryService,
              private sanitizer: DomSanitizer) {
    this.route.params.subscribe(params => {
      this.nonExCatServ.getNameByCategoryId(params['id']).subscribe(data => {
        this.breadcrumbService.addFriendlyNameForRoute('/main/' + (<string>params['top']).replace(' ', '%20') +
          '/' + params['city'] + '/' + params['id'], data[0].name);
      });

      this.breadcrumbService.hideRoute('/main/' + (<string>params['top']).replace(' ', '%20'));

      this.breadcrumbService.hideRoute('/main/' + (<string>params['top']).replace(' ', '%20') +
        '/' + params['city'] + '/' + params['id'] + '/' + params['id-transit'] + '/' + params['name'] +
        '/' + (<string>params['iconUrl']).replace('/', '%2F'));

      this.breadcrumbService.hideRoute('/main/' + (<string>params['top']).replace(' ', '%20') +
        '/' + params['city'] + '/' + params['id'] + '/' + params['id-transit']);

      if (params['id'] === 'undefined') {
        this.breadcrumbService.hideRoute('/main/' + (<string>params['top']).replace(' ', '%20') +
          '/' + params['city'] + '/' + params['id']);
      }
    });

  }


  ngOnInit() {
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
    this.trustedUrl = this.sanitizer.bypassSecurityTrustStyle('url(' + this.categoryIconURL + this.iconURL + ')');
  }

  public selectStop(stop) {
    const toSave = Object.assign({}, stop);
    console.log(this.selectedStops.indexOf(toSave));
    if (!this.selectedStops.includes(toSave, 0)) {

      this.selectedStops.push(toSave);
      // this.selectedStops.concat(stop);
    } else {
      this.selectedStops.splice(this.selectedStops.indexOf(toSave), 1);
    }

    console.log(this.selectedStops);

  }

  public isSelected(): boolean{
    return true;
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

