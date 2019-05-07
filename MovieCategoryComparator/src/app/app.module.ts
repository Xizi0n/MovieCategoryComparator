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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchbarComponent,
    LandingComponent,
    CompareComponent,
    DoughnutChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
