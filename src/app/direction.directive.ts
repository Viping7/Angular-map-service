
import { Directive, Input,EventEmitter,Output } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core'
declare var google: any;
declare var MarkerClusterer;
@Directive({
  selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective {
  @Input() origin = '';
  @Input() destination = '';
  @Input() selectedMode='';
  @Input() originLatLng=[];
  @Input() destinationLatLng=[];
  @Output() routes = new EventEmitter<any>();
  @Output() places = new EventEmitter<any>();
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
      directionsDisplay.setMap(null);
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
           
          
        } else {
          window.alert('Directions request failed due to ' + status);
        }

        var service = new google.maps.places.PlacesService(map);
        rootSelector.setNearByPlaces(service,rootSelector.originLatLng,rootSelector,map);
        rootSelector.setNearByPlaces(service,rootSelector.destinationLatLng,rootSelector,map);

      });

    });
  }

  setNearByPlaces(service,latLng,rootSelector,map){
    console.log(latLng);
      service.nearbySearch({
      location: {lat: latLng[0], lng: latLng[1]},
     // rankBy:google.maps.places.RankBy.DISTANCE,
      type: ['Software Company'],
      radius:500,
     keyword:['Software Company']
    }, (response,status)=>{
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        let markers=[]
        rootSelector.places.emit(response)
        for (var i = 0; i < response.length; i++) {
            markers.push(rootSelector.createMarker(response[i],map,rootSelector));
        }
        var markerCluster = new MarkerClusterer(map, markers, 
          {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      }
    });
  }

  createMarker(place,map,rootSelector){
    var infowindow = new google.maps.InfoWindow();
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
      google.maps.event.addListener(marker, 'click', function() {
      rootSelector.places.emit(place)
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });

    return marker;
  }
}