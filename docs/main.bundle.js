webpackJsonp([2],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-3 route-wrapper\">\n      <div class=\"route-selection\">\n      <input placeholder=\"Enter Source\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #originFeild [ngModel]='origin' >\n      <input placeholder=\"Enter Destination\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #destFeild [ngModel]='destination' >\n      <select [(ngModel)]='mode' class='form-control'>\n        <option value='DRIVING'>Driving</option>\n        <option value=\"WALKING\">Walking</option>\n        <option value=\"BICYCLING\">Bicycling</option>\n        <option value=\"TRANSIT\">Transit</option>\n      </select>\n     \n      <button (click)='getRoute(0)' class=\"btn btn-custom\">Get Direction</button>\n      </div>\n      <div class=\"routes-section\">\n        <div class=\"item\" *ngFor='let route of routes; let i=index' (click)='getRoute(i)'>\n          <h3 class=\"route-name\">{{route.summary}}</h3>\n          <div class='route-attr'>\n            <h3>{{route.legs[0].distance.text}}</h3>\n            <h4>{{route.legs[0].duration.text}}</h4>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-9 map-section\">\n      <agm-map [latitude]=\"lat\" [longitude]=\"lng\">\n        <sebm-google-map-directions [origin]=\"origin\" [destination]=\"destination\" [selectedMode]='mode' (routes)='getAllRoutes($event)' [originLatLng]='originLatLng' [destinationLatLng]='destLatLng'></sebm-google-map-directions>\n      </agm-map>\n    </div>\n  </div>\n</div>\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "agm-map {\n  height: 100vh; }\n\n.container-fluid {\n  padding: 0px 15px 0px 0px; }\n\n.route-wrapper {\n  height: 100vh;\n  overflow-y: auto;\n  background: #fdfdfd;\n  padding: 0px; }\n\n.route-selection {\n  background: #009688;\n  padding: 30px 15px 15px 25px; }\n  .route-selection .form-control {\n    border-radius: 0px;\n    box-shadow: none;\n    margin-bottom: 15px;\n    border: none;\n    background: rgba(255, 255, 255, 0.9); }\n  .route-selection .btn.btn-custom {\n    border-radius: 0px;\n    background: #fff;\n    color: #009688;\n    font-weight: 500;\n    padding: 8px 20px; }\n\n.routes-section .item {\n  padding: 10px 15px 10px 25px;\n  cursor: pointer;\n  margin: 0px;\n  border-bottom: 1px solid #aaa; }\n  .routes-section .item:hover {\n    background: #f0f0f0; }\n  .routes-section .item h3 {\n    font-size: 16px;\n    margin-top: 0px; }\n  .routes-section .item .route-name, .routes-section .item .route-attr {\n    display: inline-block;\n    vertical-align: top;\n    width: 67%;\n    font-weight: 600; }\n  .routes-section .item .route-attr {\n    width: 30%;\n    text-align: right; }\n    .routes-section .item .route-attr h4 {\n      font-size: 14px; }\n\n.map-section {\n  padding-left: 0px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__direction_directive__ = __webpack_require__("../../../../../src/app/direction.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = (function () {
    function AppComponent(ngZone, mapsAPILoader, gmapsApi) {
        this.ngZone = ngZone;
        this.mapsAPILoader = mapsAPILoader;
        this.gmapsApi = gmapsApi;
        this.originLatLng = [];
        this.destLatLng = [];
        this.mode = 'DRIVING';
        this.title = 'My first AGM project';
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mapsAPILoader.load().then(function () {
            var autocompleteInput = new google.maps.places.Autocomplete(_this.originRef.nativeElement, {
                types: ["geocode"]
            });
            var autocompleteOutput = new google.maps.places.Autocomplete(_this.destRef.nativeElement, {
                types: ["geocode"]
            });
            _this.setupPlaceChangedListener(autocompleteInput, 'ORG');
            _this.setupPlaceChangedListener(autocompleteOutput, 'DES');
        });
    };
    AppComponent.prototype.setupPlaceChangedListener = function (autocomplete, mode) {
        var _this = this;
        autocomplete.addListener("place_changed", function () {
            _this.ngZone.run(function () {
                //get the place result
                var place = autocomplete.getPlace();
                //verify result
                if (place.geometry === undefined) {
                    return;
                }
                if (mode === 'ORG') {
                    _this.vc.origin = _this.originRef.nativeElement.value;
                    _this.originLatLng[0] = place.geometry.location.lat();
                    _this.originLatLng[1] = place.geometry.location.lng();
                }
                else {
                    _this.vc.destination = _this.destRef.nativeElement.value; // its a example aleatory position
                    _this.destLatLng[0] = place.geometry.location.lat();
                    _this.destLatLng[1] = place.geometry.location.lng();
                }
                //   if(this.vc.directionsDisplay === undefined){ this.mapsAPILoader.load().then(() => { 
                //         this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
                //       }); 
                // }
            });
        });
    };
    AppComponent.prototype.getRoute = function (locationIndex) {
        this.vc.getSearchedLocation(locationIndex);
    };
    AppComponent.prototype.getAllRoutes = function ($event) {
        this.routes = $event;
        console.log(this.routes);
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("originFeild"),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], AppComponent.prototype, "originRef", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("destFeild"),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* ElementRef */]) === "function" && _b || Object)
], AppComponent.prototype, "destRef", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_0__direction_directive__["a" /* DirectionsMapDirective */]),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__direction_directive__["a" /* DirectionsMapDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__direction_directive__["a" /* DirectionsMapDirective */]) === "function" && _c || Object)
], AppComponent.prototype, "vc", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["l" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["j" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["j" /* NgZone */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__agm_core__["c" /* MapsAPILoader */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__agm_core__["c" /* MapsAPILoader */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__agm_core__["b" /* GoogleMapsAPIWrapper */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__agm_core__["b" /* GoogleMapsAPIWrapper */]) === "function" && _f || Object])
], AppComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("../../../../../src/app/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__direction_directive__ = __webpack_require__("../../../../../src/app/direction.directive.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_7__direction_directive__["a" /* DirectionsMapDirective */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__agm_core__["a" /* AgmCoreModule */].forRoot({
                apiKey: __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* apiKey */],
                libraries: ["places", "geometry"]
            })
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_4__agm_core__["b" /* GoogleMapsAPIWrapper */],],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/constants.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return apiKey; });
var apiKey = 'AIzaSyB8Wk9PFb7tQzR3VNJhxmbHbpNbQFg2sdA';
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "../../../../../src/app/direction.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectionsMapDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DirectionsMapDirective = (function () {
    function DirectionsMapDirective(gmapsApi) {
        this.gmapsApi = gmapsApi;
        this.origin = '';
        this.destination = '';
        this.selectedMode = '';
        this.originLatLng = [];
        this.destinationLatLng = [];
        this.routes = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */]();
    }
    DirectionsMapDirective.prototype.ngOnInit = function () {
        console.log(this.origin);
        this.getCurrentLocation();
    };
    DirectionsMapDirective.prototype.getCurrentLocation = function () {
        this.gmapsApi.getNativeMap().then(function (map) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    map.setCenter(pos);
                });
            }
            else {
                // Browser doesn't support Geolocation
            }
        });
    };
    DirectionsMapDirective.prototype.getSearchedLocation = function (locationIndex) {
        var _this = this;
        this.gmapsApi.getNativeMap().then(function (map) {
            console.log(_this.selectedMode);
            console.log(_this);
            var rootSelector = _this;
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            directionsDisplay.setMap(null);
            directionsDisplay.setMap(map);
            directionsService.route({
                origin: _this.origin,
                destination: _this.destination,
                waypoints: [],
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode[_this.selectedMode],
                provideRouteAlternatives: true
            }, function (response, status) {
                console.log(response);
                if (status === 'OK') {
                    directionsDisplay.setDirections({ routes: [] });
                    directionsDisplay.setDirections(response);
                    directionsDisplay.setRouteIndex(locationIndex);
                    console.log(response);
                    rootSelector.routes.emit(response.routes);
                }
                else {
                    window.alert('Directions request failed due to ' + status);
                }
                var service = new google.maps.places.PlacesService(map);
                rootSelector.setNearByPlaces(service, rootSelector.originLatLng, rootSelector, map);
                rootSelector.setNearByPlaces(service, rootSelector.destinationLatLng, rootSelector, map);
            });
        });
    };
    DirectionsMapDirective.prototype.setNearByPlaces = function (service, latLng, rootSelector, map) {
        console.log(latLng);
        service.nearbySearch({
            location: { lat: latLng[0], lng: latLng[1] },
            // rankBy:google.maps.places.RankBy.DISTANCE,
            type: ['Software Company'],
            radius: 500,
            keyword: ['Software Company']
        }, function (response, status) {
            console.log(response);
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                var markers = [];
                for (var i = 0; i < response.length; i++) {
                    markers.push(rootSelector.createMarker(response[i], map));
                }
                var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
            }
        });
    };
    DirectionsMapDirective.prototype.createMarker = function (place, map) {
        console.log(place);
        var infowindow = new google.maps.InfoWindow();
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
        return marker;
    };
    return DirectionsMapDirective;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Input */])(),
    __metadata("design:type", Object)
], DirectionsMapDirective.prototype, "origin", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Input */])(),
    __metadata("design:type", Object)
], DirectionsMapDirective.prototype, "destination", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Input */])(),
    __metadata("design:type", Object)
], DirectionsMapDirective.prototype, "selectedMode", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Input */])(),
    __metadata("design:type", Object)
], DirectionsMapDirective.prototype, "originLatLng", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Input */])(),
    __metadata("design:type", Object)
], DirectionsMapDirective.prototype, "destinationLatLng", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Output */])(),
    __metadata("design:type", Object)
], DirectionsMapDirective.prototype, "routes", void 0);
DirectionsMapDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Directive */])({
        selector: 'sebm-google-map-directions'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__agm_core__["b" /* GoogleMapsAPIWrapper */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__agm_core__["b" /* GoogleMapsAPIWrapper */]) === "function" && _a || Object])
], DirectionsMapDirective);

var _a;
//# sourceMappingURL=direction.directive.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map