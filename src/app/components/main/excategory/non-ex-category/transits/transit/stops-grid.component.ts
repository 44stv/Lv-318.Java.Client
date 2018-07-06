import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';

import {Stop} from '../../../../../../models/stop.model';
import {StopService} from '../../../../../../services/stop.service';
import {AddFeedbackComponent} from './add-feedback/add-feedback.component';

@Component({
  selector: 'app-stops-grid',
  templateUrl: './stops-grid.component.html',
  styleUrls: ['./stops-grid.component.css']
})
export class StopsGridComponent implements OnInit {

  checkedItems: boolean[];
  private sub: any;
  @Input() public idTransit: number;
  @Input() transitName: String;
  stopsList: Observable<Stop[]>;
  stopArray: Stop[] = [];
  public selectedStops: Stop[] = [];
  categoryId: number;

  constructor(private stopService: StopService,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
  }


  ngOnInit() {
    this.sub = this.route.params.forEach(params => {
      this.idTransit = params['id'];
      this.categoryId = params['categoryId'];
      this.transitName = params['name'];
    });
    this.stopsList = this.stopService.getStopsByTransitId(this.idTransit);
    this.stopsList.subscribe(stopArray =>
      this.stopArray = stopArray);
    this.checkedItems = new Array(this.stopArray.length);

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
      width: '60%', height: '80%',
      data: {
        number: this.idTransit, categoryId: this.categoryId,
        transitName: this.transitName
      }
    });
  }

}
