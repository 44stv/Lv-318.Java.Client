import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StopService} from '../../../../../../services/stop.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {AddFeedbackComponent} from './add-feedback/add-feedback.component';
import {AuthService} from '../../../../../../services/auth/auth.service';
import {Stop} from '../../../../../../models/stop.model';
import {environment} from '../../../../../../../environments/environment';
import {Transit} from '../../../../../../models/transit.model';

@Component({
  selector: 'app-stops-grid',
  templateUrl: './stops-grid.component.html',
  styleUrls: ['./stops-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class StopsGridComponent implements OnInit {

  checkedItems: boolean[];
  private sub: any;
  transit: Transit;
  @Input() idTransit: number;
  @Input() transitName: String;
  stopsList: Observable<Stop[]>;
  stopArray: Stop[] = [];
  forwardStops: Stop[] = [];
  backwardStops: Stop[] = [];
  public selectedStops: Stop[] = [];
  categoryId: number;
  categoryIconURL = `${environment.serverURL}/category/img?link=`;
  iconURL: string;


  constructor(private stopService: StopService,
              private authService: AuthService,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
  }


  ngOnInit() {
    this.sub = this.route.params.forEach(params => {
      this.idTransit = params['id-transit'];
      this.categoryId = params['categoryId'];
      this.transitName = params['name'];
      this.iconURL = params['iconUrl'];
    });
    // this.categoryId = this.transit.categoryId;
    this.stopsList = this.stopService.getStopsByTransitId(this.idTransit);
    this.stopsList.subscribe(stopArray => {
      this.stopArray = stopArray;
      this.checkedItems = new Array(this.stopArray.length);
      this.forwardStops = this.stopArray.filter(stop => stop.direction === 'FORWARD');
      this.backwardStops = this.stopArray.filter(stop => stop.direction === 'BACKWARD');
    });
    console.log(this.transit);


  }

  public selectStop(stop: Stop) {
    if (!this.selectedStops.length) {
      this.selectedStops.push(Object.assign({}, stop));

    } else {
      this.selectedStops.forEach(
        (value) => {
          if (value.id !== stop.id) {
            this.selectedStops.push(Object.assign({}, stop));
          } else {
            console.log(this.selectedStops.indexOf(value));
            this.selectedStops.splice(this.selectedStops.indexOf(value), 1);
          }
        }
      );
    }


    // if (!this.selectedStops.includes(stop, 0)) {
    //   this.selectedStops.push(Object.assign({}, stop));
    // }
    // if (this.selectedStops.includes(stop, 0)) {
    //   this.selectedStops.splice(this.selectedStops.indexOf(stop), 1);
    // }
    console.log(this.selectedStops);
    // console.log(this.selectedStops.indexOf(stop));
    // console.log(stop);
    // console.log(Object.assign({}, stop));

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

