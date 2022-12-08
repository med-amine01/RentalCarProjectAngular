import {Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { CarListComponent } from './components/car-list/car-list.component';
import {Router, RouterModule, Routes} from "@angular/router";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CarSearchComponent } from './components/car-search/car-search.component';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import {OKTA_CONFIG,OktaAuthModule} from "@okta/okta-angular";
import { OktaAuth } from '@okta/okta-auth-js';
import myAppConfig from "./components/login/my-app-config";
import { OktaCallbackComponent } from '@okta/okta-angular';

//when you define your routes you GO from most SPECIFIC to the most GENERIC
//in imports we will call the array of routes : RouterModule.forRoot(routes)
const routes: Routes = [
  {path: 'login/callback',component:OktaCallbackComponent},
  {path:'login',component:LoginComponent},
  {path: 'cardetails/car/:id', component: CarDetailsComponent},
  {path: 'update/car/:id', component: CarAddComponent},
  {path: 'add/car', component: CarAddComponent},
  {path: 'search/:brand', component: CarListComponent},
  {path: 'cars/:id', component: CarListComponent},
  {path: 'cars', component: CarListComponent},
  {path: '', redirectTo: 'cars', pathMatch: 'full'},
  {path: '**', redirectTo: 'cars', pathMatch: 'full'} //** else of all routes (we can add 404 not found component


]

const oktaAuth = new OktaAuth({
  issuer: myAppConfig.oidc.issuer,
  clientId: myAppConfig.oidc.clientId,
  redirectUri: window.location.origin + '/login/callback'
});

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    DashboardComponent,
    CarSearchComponent,
    SideNavBarComponent,
    CarAddComponent,
    CarDetailsComponent,
    LoginComponent,
    LoginStatusComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [{provide:OKTA_CONFIG,useValue:{oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
