import { Component, OnInit, Output } from '@angular/core';
import { LocationService } from '../../../../../services/location.service';
import { Geotag } from '../../../../../models/geotag.model';
import { GlobalSearchService } from '../../../../../services/global-search.service';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.css']
})
export class LocationPickerComponent implements OnInit {
  currentlocation: string;
  availableLocations: Geotag[];

  constructor(private locationService: LocationService, private globalSearchService: GlobalSearchService) {
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.locationService
        .getCurrentLocation(position.coords.latitude, position.coords.longitude)
        .subscribe(data => {
          this.currentlocation = data.name;
          this.globalSearchService.setCurentLocation(this.currentlocation);
          console.log('Current location OnInit: ' + this.currentlocation);
        });
    });
    this.locationService.getAvailableLocations()
      .subscribe(data => this.availableLocations = data);
  }

  onSelectionChange(event: { index: any, value: any }) {
    this.currentlocation = event.value;
    this.globalSearchService.setCurentLocation(this.currentlocation);
    this.globalSearchService.setIsLocationChange(true);
  }
}
