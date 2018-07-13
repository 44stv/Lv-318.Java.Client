import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StopService} from '../../../../../../services/stop.service';
import {TransitService} from '../../../../../../services/transit.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {AddFeedbackComponent} from './add-feedback/add-feedback.component';
import {AuthService} from '../../../../../../services/auth/auth.service';
import {Stop} from '../../../../../../models/stop.model';
import {BreadcrumbService} from 'ng5-breadcrumb';
import {Transit} from '../../../../../../models/transit.model';

@Component({
  selector: 'app-stops-grid',
  templateUrl: './stops-grid.component.html',
  styleUrls: ['./stops-grid.component.css']
})
export class StopsGridComponent implements OnInit {

  checkedItems: boolean[];
  private sub: any;
  private transit: Transit = new Transit();
  @Input() idTransit: number;
  @Input() transitName: string;
  stopsList: Observable<Stop[]>;
  stopArray: Stop[] = [];
  forwardStops: Stop[] = [];
  backwardStops: Stop[] = [];
  public selectedStops: Stop[] = [];
  categoryId: number;

  constructor(private stopService: StopService,
              private authService: AuthService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private breadcrumbService: BreadcrumbService,
              private transitService: TransitService) {
    this.breadcrumbService.hideRouteRegex('/main/.+/[A-Za-z]+/[0-9]+/[0-9]+/[0-9]+');
    this.breadcrumbService.hideRoute('/show-transit-scheme');
    this.breadcrumbService.addFriendlyNameForRoute('/show-transit-scheme/main', 'Home');
  }


  ngOnInit() {

    this.sub = this.route.params.forEach(params => {
      this.idTransit = params['id-transit'];
      this.categoryId = params['id'];
      this.transitName = params['name'];
    });
    this.stopsList = this.stopService.getStopsByTransitId(this.idTransit);
    this.stopsList.subscribe(stopArray => {
      this.stopArray = stopArray;
      this.checkedItems = new Array(this.stopArray.length);
      this.forwardStops = this.stopArray.filter(stop => stop.direction === 'FORWARD');
      this.backwardStops = this.stopArray.filter(stop => stop.direction === 'BACKWARD');
    });
    console.log(this.authService.decodedToken.auth);
    this.transit = this.buildTransit(this.idTransit);
    console.log(this.transit);

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

  public buildTransit(id: number): Transit {
    let transit: Transit = new Transit();
    this.transitService.getTransitById(id).subscribe(data => {
      transit = data;
    });
    return transit;
  }

}

