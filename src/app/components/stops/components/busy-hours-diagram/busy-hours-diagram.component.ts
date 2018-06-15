import {Component, Input, OnInit} from '@angular/core';
import {Chart} from 'chart.js';

import {DiagramService} from '../../../../services/diagram.service';
import {environment} from '../../../../../environments/environment';


@Component({
  selector: 'app-busy-hours-diagram',
  templateUrl: './busy-hours-diagram.component.html',
  styleUrls: ['./busy-hours-diagram.component.css']
})
export class BusyHoursDiagramComponent implements OnInit {

  @Input() id: number;

  constructor(private diagramService: DiagramService) {
  }

  ngOnInit() {
    this.diagramService.getResults(environment.serverURL + '/feedback/byHour/' + this.id)
      .subscribe(res => {
        const CHART = document.getElementById('lineChart');
        const lineChart = new Chart(CHART, {
          type: 'line',
          data: {
            labels: Object.keys(res),
            datasets: [{
              label: 'Busy hours diagram',
              fill: true,
              lineTension: 0.6,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJointStyle: 'miter',
              data: Object.values(res)
            }]
          }
        });
      });
  }

}
