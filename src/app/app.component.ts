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
        console.log(place);
        console.log(this.originRef.nativeElement.value);
        if (mode === 'ORG') {
          this.vc.origin = this.originRef.nativeElement.value;

        } else {
          this.vc.destination = this.destRef.nativeElement.value; // its a example aleatory position

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
