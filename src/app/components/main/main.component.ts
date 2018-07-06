import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  latitude: string;
  longtitude: string;

  imageSources: String[] = ['../../../assets/1.png',
    '../../../assets/2.png',
    '../../../assets/3.png'
  ];

  constructor() {
  }

  ngOnInit() {
    console.log('Position receiving...');
    console.log(navigator.geolocation.getCurrentPosition(position => {
      this.latitude = position.coords.latitude.toString();
      this.longtitude = position.coords.longitude.toString();
    }));
  }

  ngAfterViewInit(): void {
    console.log('Position :');
    console.log('Latitude: ' + this.latitude);
    console.log('Longitude: ' + this.longtitude);
  }

}
