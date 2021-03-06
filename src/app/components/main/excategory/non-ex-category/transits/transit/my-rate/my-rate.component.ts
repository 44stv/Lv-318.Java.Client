import { Component, Input, OnInit } from '@angular/core';
import { DiagramService } from '../../../../../../../services/diagram.service';
import { environment } from '../../../../../../../../environments/environment';
import { CustomAuthService } from '../../../../../../../services/auth/custom-auth.service';

@Component({
  selector: 'app-my-rate',
  templateUrl: './my-rate.component.html',
  styleUrls: ['./my-rate.component.scss']
})
export class MyRateComponent implements OnInit {

  @Input() id: number;
  @Input() userId: number;

  myRate;
  showError = false;

  constructor(private diagramService: DiagramService,
    private authService: CustomAuthService) {
  }

  ngOnInit() {
    this.diagramService.getResults(environment.serverURL + '/feedback/rating/' + this.id + '/user/' + this.authService.getUserId())
      .subscribe(res => {
        this.myRate = (<number>res).toPrecision(3);
        if (this.myRate === 0.00) {
          this.showError = true;
        }
      });
  }

}
