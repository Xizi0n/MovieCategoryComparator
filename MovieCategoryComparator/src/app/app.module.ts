import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'  ;
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header/header.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from './services/movie.service';
import { SearchbarComponent } from './components/header/searchbar/searchbar.component';
import { LandingComponent } from './components/landing/landing.component';
import { CompareComponent } from './components/compare/compare.component';
import { DoughnutChartComponent } from './components/compare/doughnut-chart/doughnut-chart.component';
import { DetailComponent } from './components/details/detail/detail.component';
import { DetailItemComponent } from './components/details/detail-item/detail-item.component';
import { LOCALE_ID } from '@angular/core';
import { NgCircleProgressModule } from '../../node_modules/ng-circle-progress';

const settings = {
  radius: 100,
  outerStrokeWidth: 16,
  innerStrokeWidth: 8,
  outerStrokeColor: '#78C000',
  innerStrokeColor: '#C7E596',
  animationDuration: 300,
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchbarComponent,
    LandingComponent,
    CompareComponent,
    DoughnutChartComponent,
    DetailComponent,
    DetailItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgCircleProgressModule.forRoot(settings)
  ],
  providers: [
    MovieService,
    {provide: LOCALE_ID, useValue: 'en-US' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
