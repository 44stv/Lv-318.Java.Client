import {Component, Input, OnInit} from '@angular/core';

import {Stop} from '../../../../../../../models/stop.model';
import {DiagramService} from '../../../../../../../services/diagram.service';
import {HeatMapInputData} from '../../../../../../../models/heat-map-input-data';

@Component({
  selector: 'app-busy-stops-diagram',
  templateUrl: './busy-stops-diagram.component.html',
  styleUrls: ['./busy-stops-diagram.component.css']
})
export class BusyStopsDiagramComponent implements OnInit {
  @Input() id: number;
  @Input() stopList: Stop[] = [];

  data;
  public visible = false;

  constructor(private diagramService: DiagramService) {
  }

  ngOnInit(): void {
    const heatMapInpData: HeatMapInputData = new HeatMapInputData();
    console.log(this.diagramService.getHeatMapData(this.id, this.stopList).subscribe(res => {
      heatMapInpData.hourCapacityMap = res['hourCapacityMap'];
      heatMapInpData.stopCapacityMap = res['stopCapacityMap'];
      this.data = heatMapInpData.returnHeatMapData();
      console.log(heatMapInpData.returnHeatMapData());
    }));
    this.visible = true;
  }

  onClick(): void {
    const heatMapInpData: HeatMapInputData = new HeatMapInputData();
    this.diagramService.getHeatMapData(this.id, this.stopList).subscribe(res => {
      heatMapInpData.hourCapacityMap = res['hourCapacityMap'];
      heatMapInpData.stopCapacityMap = res['stopCapacityMap'];
      this.data = heatMapInpData.returnHeatMapData();
      console.log(heatMapInpData.returnHeatMapData());
    });
    this.visible = true;
  }
}
