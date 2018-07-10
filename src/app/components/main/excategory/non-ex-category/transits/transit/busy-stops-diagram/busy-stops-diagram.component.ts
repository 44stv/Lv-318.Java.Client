import {Component, Input, OnInit} from '@angular/core';

import {Stop} from '../../../../../../../models/stop.model';
import {DiagramService} from '../../../../../../../services/diagram.service';

@Component({
  selector: 'app-busy-stops-diagram',
  templateUrl: './busy-stops-diagram.component.html',
  styleUrls: ['./busy-stops-diagram.component.css']
})
export class BusyStopsDiagramComponent implements OnInit {
  @Input() id: number;
  @Input() stopList: Stop[];

  data;
  public visible = false;

  constructor(private diagramService: DiagramService) {
  }

  ngOnInit(): void {
    this.diagramService.getHeatMapData(this.id)
      .subscribe(res => this.data = res);
    this.visible = true;
  }
}
