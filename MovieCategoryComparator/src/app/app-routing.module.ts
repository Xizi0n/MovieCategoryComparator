import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { CompareComponent } from './components/compare/compare.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'landing', component: LandingComponent},
  {path: 'compare', component: CompareComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
