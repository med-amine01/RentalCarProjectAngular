import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { CarListComponent } from './components/car-list/car-list.component';
import {RouterModule, Routes} from "@angular/router";
import { DashboardComponent } from './components/dashboard/dashboard.component';

//when you define your routes you GO from most SPECIFIC to the most GENERIC
//in imports we will call the array of routes : RouterModule.forRoot(routes)
const routes: Routes = [
  {path: 'cars/:id', component: CarListComponent},
  {path: 'cars', component: CarListComponent},
  {path: '', redirectTo: 'cars', pathMatch: 'full'},
  {path: '**', redirectTo: 'cars', pathMatch: 'full'} //** else of all routes (we can add 404 not found component
]



@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    DashboardComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
