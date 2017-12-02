import { apiKey } from './constants';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DirectionsMapDirective } from './direction.directive';

@NgModule({
  declarations: [
    AppComponent,
    DirectionsMapDirective,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: apiKey,
      libraries: ["places","geometry"]
    })
  ],
  providers: [GoogleMapsAPIWrapper,],
  bootstrap: [AppComponent]
})
export class AppModule { }
