import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Car} from "../common/car";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  //api url
  private carApiUrl = 'http://localhost:8080/api/cars';

  //we inject the httpClient to use http methodes
  constructor(private httpClient: HttpClient) { }

  getAllCars():Observable<Car[]>{
    return this.getCars(this.carApiUrl);
  }

  getOneCar(carId:number):Observable<Car>{
    const oneCarUrl = this.carApiUrl+'/'+carId;
    //we will return a single Car no need unwarp and wrap
    //cuz the json file maps directly the Car class
    return this.httpClient.get<Car>(oneCarUrl);
  }

  getCarByModel(carModel:string):Observable<Car[]>{
    const carModelUrl = this.carApiUrl+'search/findByModelContaining?model='+carModel;
    return this.getCars(carModelUrl);
  }

  //return an observable : map the JSON data from spring data rest to product array
  private getCars(searchUrl:string){
    return this.httpClient.get<GetCarResponse>(searchUrl).pipe(
      map(response => response._embedded.cars)
    );
  }

}

//unwrap the JSON from spring data rest _embedded entry
/**
 * "_embedded" :{
 *   "car" : [
 *     {
 *       attribut
 *       .
 *       .
 *     }
 *   ]
 * }
 */
//and associate that to Car array
interface GetCarResponse
{
  _embedded:{
    cars: Car[];
  }
}
