import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../../../../../environments/environment';
import {MapsService} from '../../../../../../../services/maps.service';
import {Location, WaypointModel} from '../../../../../../../models/waypoint.model';
import {AddFeedbackComponent} from '../add-feedback/add-feedback.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  firstFormGroup: FormGroup;
  public styles = [
    {
      'stylers': [
        {
          'saturation': -100
        },
        {
          'gamma': 1
        }
      ]
    },
    {
      'elementType': 'labels.text.stroke',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi.business',
      'elementType': 'labels.text',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi.business',
      'elementType': 'labels.icon',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi.place_of_worship',
      'elementType': 'labels.text',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi.place_of_worship',
      'elementType': 'labels.icon',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'road',
      'elementType': 'geometry',
      'stylers': [
        {
          'visibility': 'simplified'
        }
      ]
    },
    {
      'featureType': 'water',
      'stylers': [
        {
          'visibility': 'on'
        },
        {
          'saturation': 50
        },
        {
          'gamma': 0
        },
        {
          'hue': '#50a5d1'
        }
      ]
    },
    {
      'featureType': 'administrative.neighborhood',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#333333'
        }
      ]
    },
    {
      'featureType': 'road.local',
      'elementType': 'labels.text',
      'stylers': [
        {
          'weight': 0.5
        },
        {
          'color': '#333333'
        }
      ]
    },
    {
      'featureType': 'transit.station',
      'elementType': 'labels.icon',
      'stylers': [
        {
          'gamma': 1
        },
        {
          'saturation': 50
        }
      ]
    }
  ];
  public transitId: string;
  public transitName: string;
  public categoryId: number;
  public routeDirection = 'forward';
  public latStatic: Number = 49.84012222290039;
  public lngStatic: Number = 24.028803095222;
  public firstStopMarker: MarkerModel = new MarkerModel();
  public secondStopMarker: MarkerModel = new MarkerModel();
  public icon = '../../../../../../../../assets/img/stop.png';
  public iconSelectedA = '../../../../../../../../assets/img/a.png';
  public iconSelectedB = '../../../../../../../../assets/img/b.png';
  public direction = undefined;
  public directionSecond = undefined;
  public travelMode = 'DRIVING';
  private serviceUrl = environment.serverURL + '/stop';
  public points: any = undefined;
  public markers: MarkerModel[];
  public stopList: MarkerModel[];
  public zoom = 13;
  public renderOptions = {
    draggable: false,
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: '#1c7bdb'
    }
  };
  public renderOptions2 = {
    draggable: false,
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: '#6aab2d'
    }
  };
  public waypoints;
  public waypointsSecond;
  public myLocation = new MarkerModel();
  public geolocationPosition;

  public markerOptions = {
    origin: {
      icon: null,
      opacity: 0,
      scaledSize: 0.1,
    },
    destination: {
      icon: null,
      opacity: 0,
      scaledSize: 0.1,
    },
  };

  @Output()
  toggleDirection = new EventEmitter<string>();

  constructor(private route: ActivatedRoute,
              private service: MapsService,
              private _formBuilder: FormBuilder,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.route.params.forEach(param => {
      this.transitId = param['id-transit'];
      this.categoryId = param['id'];
      this.transitName = param['name'];
    });
    this.initPoints();
    this.getMyPosition();
  }

  getMyPosition() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position,
            console.log(position);
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    }
  }

  setDirectionAndRefresh(routeDirection) {
    this.routeDirection = routeDirection;
    this.initPoints();
    this.clearStopFirst();
    this.clearStopSecond();
    this.toggleDirection.emit(routeDirection);
  }

  initMarkers() {
    this.markers = new Array(this.points.length);
    for (let i = 0; i < this.points.length; i++) {
      const marker: MarkerModel = new MarkerModel();
      marker.id = this.points[i].id;
      marker.name = this.points[i].street;
      marker.lat = this.points[i].lat;
      marker.lng = this.points[i].lng;
      marker.draggable = false;
      marker.order = i;
      marker.icon = this.icon;
      marker.animation = 'DROP';
      this.markers[i] = marker;
    }
  }

  initSingleDirection() {
    this.direction = {
      origin: {lat: this.points[0].lat, lng: this.points[0].lng},
      destination: {lat: this.points[this.points.length - 1].lat, lng: this.points[this.points.length - 1].lng}
    };
  }

  initMultipleDirection() {
    this.direction = {
      origin: {lat: this.points[0].lat, lng: this.points[0].lng},
      destination: {lat: this.points[24].lat, lng: this.points[24].lng}
    };
    this.directionSecond = {
      origin: {lat: this.points[24].lat, lng: this.points[24].lng},
      destination: {lat: this.points[this.points.length - 1].lat, lng: this.points[this.points.length - 1].lng}
    };
  }

  initSingleWaypoints() {
    this.waypoints = new Array(this.points.length - 2);
    for (let i = 1; i < this.points.length - 1; i++) {
      const waypoint: WaypointModel = new WaypointModel();
      const location: Location = new Location();
      location.lat = this.points[i].lat;
      location.lng = this.points[i].lng;
      waypoint.location = location;
      waypoint.stopover = true;
      this.waypoints[i - 1] = waypoint;
    }
  }

  initMultipleWaypoints() {
    this.waypoints = new Array(23);
    for (let i = 1; i < 24; i++) {
      const waypoint: WaypointModel = new WaypointModel();
      const location: Location = new Location();
      location.lat = this.points[i].lat;
      location.lng = this.points[i].lng;
      waypoint.location = location;
      waypoint.stopover = true;
      this.waypoints[i - 1] = waypoint;
    }
    console.log('FIRST' + this.waypoints.length);
    if (this.points.length === 26) {
      return;
    }
    this.waypointsSecond = new Array(this.points.length - 26);
    for (let i = 25; i < this.points.length - 1; i++) {
      const waypoint: WaypointModel = new WaypointModel();
      const location: Location = new Location();
      location.lat = this.points[i].lat;
      location.lng = this.points[i].lng;
      waypoint.location = location;
      waypoint.stopover = true;
      this.waypointsSecond[i - 25] = waypoint;
    }
    console.log('SECOND' + this.waypointsSecond.length);
  }

  initPoints() {
    this.service.getForwardDirection(this.transitId, this.routeDirection).subscribe(points => {
        this.points = points;
        console.log(points);
        this.initMarkers();
        if (this.points.length < 25) {
          this.initSingleWaypoints();
          this.initSingleDirection();
        } else {
          this.initMultipleWaypoints();
          this.initMultipleDirection();
        }
      }
    )
    ;
  }

  clickedMarker(index, marker) {
    if (this.firstStopMarker.order === undefined) {
      this.firstStopMarker = marker;
      this.markers[index].icon = this.iconSelectedA;
      this.markers[index].animation = 'BOUNCE';
    } else if (this.firstStopMarker.order === index) {
      this.markers[index].icon = this.icon;
      this.markers[index].animation = null;
      this.firstStopMarker = new MarkerModel();
    } else if (this.secondStopMarker.order === index) {
      this.markers[index].icon = this.icon;
      this.markers[index].animation = null;
      this.secondStopMarker = new MarkerModel();
    } else if (marker.order > this.firstStopMarker.order) {
      this.secondStopMarker = marker;
      this.markers[index].icon = this.iconSelectedB;
      this.markers[index].animation = 'BOUNCE';
      this.stopList = new Array(this.secondStopMarker.order - this.firstStopMarker.order - 1);
      for (let i = this.firstStopMarker.order + 1, j = 0; i < this.secondStopMarker.order; i++, j++) {
        this.stopList[j] = this.markers[i];
      }
    } else {
      alert('Wrong stop order.');
    }
    if (this.firstStopMarker.order === undefined || this.secondStopMarker.order === undefined) {
      this.stopList = new Array();
    }
  }

  clearStopFirst() {
    this.firstStopMarker = new MarkerModel();
  }

  clearStopSecond() {
    this.secondStopMarker = new MarkerModel();
  }

  public openModal() {
    this.dialog.open(AddFeedbackComponent, {
      width: '60%',
      data: {
        number: this.transitId, categoryId: this.categoryId,
        transitName: this.transitName,
        fromStopId: this.firstStopMarker.id,
        toStopId: this.secondStopMarker.id,
        direction: this.routeDirection,
        fromMaps: true
      }
    });
  }

}

export class MarkerModel {
  id: number;
  name: string;
  lat: number;
  lng: number;
  draggable: boolean;
  order: number;
  icon: string;
  animation: string;
}
