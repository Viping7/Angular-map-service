
import { Directive, Input,EventEmitter,Output } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core'
declare var google: any;
declare var $:any;
@Directive({
  selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective {
  @Input() origin = '';
  @Input() destination = '';
  @Input() selectedMode='';
  @Output() routes = new EventEmitter<any>();
  constructor(private gmapsApi: GoogleMapsAPIWrapper) { }

  ngOnInit() {
    console.log(this.origin);
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    this.gmapsApi.getNativeMap().then(map => {
      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(pos);
        });
      } else {
        // Browser doesn't support Geolocation
      }
    });
  }


  getSearchedLocation(locationIndex) {
    this.gmapsApi.getNativeMap().then(map => {
      console.log(this.selectedMode);
      console.log(this);
      var rootSelector=this;
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      
      directionsDisplay.setMap(map);
      directionsService.route({
        origin: this.origin,
        destination: this.destination,
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode[this.selectedMode],
        provideRouteAlternatives: true
      }, function (response, status) {
      
        console.log(response);
     
        if (status === 'OK') {  
            directionsDisplay.setDirections({routes: []});
            directionsDisplay.setDirections(response);
            directionsDisplay.setRouteIndex(locationIndex);
            console.log(response);
            rootSelector.routes.emit(response.routes);
            console.log(response.routes[locationIndex].legs[0].distance)
            console.log(response.routes[locationIndex].legs[0].duration)
            $('.distance').html(response.routes[locationIndex].legs[0].distance.text)
            $('.time').html(response.routes[locationIndex].legs[0].duration.text)
            for(let i=0;i<response.routes.length;i++){
                $('')
              }
        } else {
          window.alert('Directions request failed due to ' + status);
        }

        var service = new google.maps.places.PlacesService(map);
        
        service.nearbySearch({
          location: {lat: -33.867, lng: 151.195},
          radius: 500,
          type: ['store']
        }, (response,status)=>{
          console.log(response);
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < response.length; i++) {
              rootSelector.createMarker(response[i],map);
            }
          }
        });

      });

    });
  }

  createMarker(place,map){
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
  }
}