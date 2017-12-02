import { DirectionsMapDirective } from './direction.directive';
import { apiKey } from './constants';
import { Component, ViewChild, ElementRef, NgZone, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  originLatLng: any=[];
  destLatLng: any=[];
  routes: any;

  @ViewChild("originFeild")
  public originRef: ElementRef;
  @ViewChild("destFeild")
  public destRef: ElementRef;
  mode='DRIVING';
  @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;
  title: string = 'My first AGM project';
  constructor(private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, private gmapsApi: GoogleMapsAPIWrapper) {

  }

  ngOnInit() {
    
    this.mapsAPILoader.load().then(() => {
      let autocompleteInput = new google.maps.places.Autocomplete(this.originRef.nativeElement, {
        types: ["geocode"]
      });
      let autocompleteOutput = new google.maps.places.Autocomplete(this.destRef.nativeElement, {
        types: ["geocode"]
      });

      this.setupPlaceChangedListener(autocompleteInput, 'ORG');
      this.setupPlaceChangedListener(autocompleteOutput, 'DES');



    });
  }

  private setupPlaceChangedListener(autocomplete: any, mode: any) {
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        //verify result
        if (place.geometry === undefined) {
          return;
        }
        if (mode === 'ORG') {
          this.vc.origin = this.originRef.nativeElement.value;
          this.originLatLng[0]=place.geometry.location.lat();
          this.originLatLng[1]=place.geometry.location.lng();

        } else {
          this.vc.destination = this.destRef.nativeElement.value; // its a example aleatory position
          this.destLatLng[0]=place.geometry.location.lat();
          this.destLatLng[1]=place.geometry.location.lng();

        }


        //   if(this.vc.directionsDisplay === undefined){ this.mapsAPILoader.load().then(() => { 
        //         this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
        //       }); 
        // }
      });
    });
  }

  getRoute(locationIndex) {
    this.vc.getSearchedLocation(locationIndex);
  }

  getAllRoutes($event){
   this.routes=$event;
   console.log(this.routes);
  }

}
