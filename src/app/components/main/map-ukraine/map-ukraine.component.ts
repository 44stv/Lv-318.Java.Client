import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationService } from '../../../services/location.service';
import { NonExCategoryService } from '../../../services/non-ex-category.service';
import { of } from 'rxjs';
import { Geotag } from '../../../models/geotag.model';
import { ValueTransformer } from '@angular/compiler/src/util';
import { ExcategoryModel } from '../../../models/excategory.model';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-map-ukraine',
    templateUrl: './map-ukraine.component.html',
    styleUrls: ['./map-ukraine.component.css']
})
export class MapUkraineComponent implements OnInit {
    zoom = 5;
    positions: Geotag[] = [];
    markers: CustomMarker[] = [];
    private _map: any;
    transits: ExcategoryModel[] = [];
    iconUrl = '../../../../../assets/img/places-api.png';
    serverURL = environment.serverURL + '/category/img?link=';

    constructor(private locationService: LocationService,
        private nonExService: NonExCategoryService,
        private router: Router) {
    }

    ngOnInit() {
        this.getMarkers();
    }

    getMarkers() {
        this.locationService.getAvailableLocations().subscribe(positions => {
            this.positions = positions;
            this.positions.map(value => {
                const marker: CustomMarker = new CustomMarker();
                marker.lat = value.latitude;
                marker.long = value.longtitude;
                marker.city = value.name;
                this.nonExService.getByNames(value.name, 'Public Transport').subscribe(
                    transits => {
                    marker.transits = transits;
                    }
                );
                this.markers.push(marker);
            });
        });
    }
}

export class CustomMarker {
    city: string;
    lat: number;
    long: number;
    transits: ExcategoryModel[];
}

