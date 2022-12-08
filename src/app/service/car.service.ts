import {Injectable} from '@angular/core';
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

  deleteCar(carid: number){
    return this.httpClient.delete<Car>(this.carApiUrl+'/deletecar/'+carid);
  }

  updateCar(car: Car){
    return this.httpClient.patch<Car>(this.carApiUrl+'/updatecar',car);
  }

  addNewCar(car: Car){
      return this.httpClient.post<Car>(this.carApiUrl+'/addcar',car);
  }

  getAllCars():Observable<Car[]>{
    return this.getCars(this.carApiUrl);
  }

  getOneCar(carId:number):Observable<Car>{
    const searchCarUrl = this.carApiUrl+'/'+carId;
    //we will return a single Car no need unwarp and wrap
    //cuz the json file maps directly the Car class
    return this.httpClient.get<Car>(searchCarUrl);
  }

  getCarByBrand(carBrand:string):Observable<Car[]>{
    const carBrandUrl = this.carApiUrl+'/search/findByBrandContaining?brand='+carBrand;
    return this.getCars(carBrandUrl);
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
