import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../../../services/location.service';
import {Geotag} from '../../../../models/geotag.model';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.css']
})
export class LocationPickerComponent implements OnInit {
  currentlocation: string;
  availableLocations: Geotag[];

  constructor(private locationService: LocationService) {
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.locationService
        .getCurrentLocation(position.coords.latitude, position.coords.longitude)
        .subscribe(data => {
          this.currentlocation = data.name.substring(1);
          console.log('Current location OnInit: ' + this.currentlocation);
        });
    });
    this.locationService.getAvailableLocations()
      .subscribe(data => this.availableLocations = data);
  }

  onSelectionChange(event: { index: any, value: any }) {
    this.currentlocation = event.value;
  }
}
