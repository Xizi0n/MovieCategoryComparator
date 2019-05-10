import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
  ],
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  providers: []
})
export class MaterialModule { }
