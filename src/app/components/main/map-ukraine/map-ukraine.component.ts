import { Component, OnInit, ViewChild } from '@angular/core';
import { NguiMapModule } from '@ngui/map';

@Component({
    selector: 'app-map-ukraine',
    templateUrl: './map-ukraine.component.html',
    styleUrls: ['./map-ukraine.component.css']
})

export class MapUkraineComponent {

    onMapReady(map) {
        console.log('map', map);
        console.log('markers', map.markers);
    }
    onIdle(event) {
        console.log('map', event.target);
    }
    onMarkerInit(marker) {
        console.log('marker', marker);
    }
    onMapClick(event) {
    }
    loadMapShapes(map) {

    }
}
