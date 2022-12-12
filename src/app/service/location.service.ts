import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Car} from "../common/car";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locationApiUrl = 'http://localhost:8080/api/locations';
  constructor(private httpClient: HttpClient) { }

  addNewLocation(location : Location){
    return this.httpClient.post<Location>(this.locationApiUrl,location);
  }

  getAllLocations():Observable<Location[]>{
    return this.getLocation(this.locationApiUrl);
  }

  getLocation(searchUrl:string){
    return this.httpClient.get<GetLocations>(searchUrl).pipe(
      map(response => response._embedded.locations)
    );
  }
}

interface GetLocations
{
  _embedded:{
    locations: Location[];
  }
}
