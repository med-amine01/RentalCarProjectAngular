import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CarListComponent} from './components/car-list/car-list.component';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CarSearchComponent} from './components/car-search/car-search.component';
import {SideNavBarComponent} from './components/side-nav-bar/side-nav-bar.component';
import {CarAddComponent} from './components/car-add/car-add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CarDetailsComponent} from './components/car-details/car-details.component';
import {LoginComponent} from './components/login/login.component';
import {LoginStatusComponent} from './components/login-status/login-status.component';


import {UserService} from "./service/user.service";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {AuthGuard} from "./auth/auth.guard";
import {ForbiddenComponent} from "./components/forbidden/forbidden.component";
import {HomeComponent} from "./components/home/home.component";
import {LocationAddComponent} from "./components/location-add/location-add.component";


// const oktaAuth = new OktaAuth(myAppConfig.oidc);




//when you define your routes you GO from most SPECIFIC to the most GENERIC
//in imports we will call the array of routes : RouterModule.forRoot(routes)
const routes: Routes = [

  {path:'login',component:LoginComponent},
  {path:'forbidden',component:ForbiddenComponent},
  {path:'add',component:ForbiddenComponent},
  {path:'location/add/:id',component:LocationAddComponent},
  {path: 'cardetails/car/:id', component: CarDetailsComponent,canActivate:[AuthGuard], data:{roles:['Admin','User']}},
  {path: 'update/car/:id', component: CarAddComponent,canActivate:[AuthGuard], data:{roles:['Admin']}},
  {path: 'add/car', component: CarAddComponent,canActivate:[AuthGuard], data:{roles:['Admin']} },
  {path: 'search/:brand', component: CarListComponent,canActivate:[AuthGuard], data:{roles:['Admin','User']} },
  {path: 'cars/:id', component: CarListComponent,canActivate:[AuthGuard], data:{roles:['Admin','User']} },
  {path: 'cars', component: CarListComponent,canActivate:[AuthGuard], data:{roles:['User','Admin']} },
  {path: '', redirectTo: 'cars', pathMatch: 'full'},
  {path: '**', redirectTo: 'cars', pathMatch: 'full'} //** else of all routes (we can add 404 not found component


]



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
    LoginStatusComponent,
    ForbiddenComponent,
    HomeComponent,
    LocationAddComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [  AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
