import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../../../../environments/environment';

import {DiagramService} from '../../../../../../../services/diagram.service';

@Component({
  selector: 'app-average-rate',
  templateUrl: './average-rate.component.html',
  styleUrls: ['./average-rate.component.css']
})
export class AverageRateComponent implements OnInit {

  @Input() id: number;

  averageRate;
  showError = false;

  constructor(private diagramService: DiagramService) {
  }

  ngOnInit() {
    this.diagramService.getResults(environment.serverURL + '/feedback/rate/' + this.id)
      .subscribe(res => {
        this.averageRate = (<number>res).toPrecision(3);
        if (this.averageRate === 0.00) {
          this.showError = true;
        }
      });
  }

}
