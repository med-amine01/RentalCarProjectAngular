import {Component, OnInit} from '@angular/core';
import {Car} from "../../common/car";
import {CarService} from "../../service/car.service";
import {ActivatedRoute} from "@angular/router";
import {filter, map, Observable} from "rxjs";


@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars : Car[] = [];
  searchModeId!: boolean;
  searchModeBrand!: boolean;
  displayStyle = "none";
  carIdToDelete : number = 0;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;


  constructor(private carService:CarService,
              private route: ActivatedRoute) {
  }
  ngOnInit(): void {

    this.route.paramMap.subscribe(
      ()=>{
        this.listCars();
      }
    );
  }


  openPopup(id: number) {
    this.carIdToDelete = id;
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  deleteCar(){
    this.carService.deleteCar(this.carIdToDelete).subscribe(
      data=>{
        this.closePopup();
        this.listCars();
      }
    );
  }

  listCars(){
    //we set up the router in app.module with :keyword
    this.searchModeId = this.route.snapshot.paramMap.has("id");
    this.searchModeBrand = this.route.snapshot.paramMap.has("brand");


    if(this.searchModeId) {
      console.log(this.searchModeId);
      this.getCarById();
    }
    else if(this.searchModeBrand) {
      this.getCarByBrand();
    }
    else{
      this.getAllCars();
    }

  }

  getAllCars(){
    //it will return json file in that data and we will asign that to our prouducts
    //data is the return value of json file
    this.carService.getAllCars().subscribe(
      data =>{
        this.cars = data;
      }
    );
  }

  getCarById(){
    const carId = +this.route.snapshot.paramMap.get('id')!;
    this.carService.getOneCar(carId).subscribe(
      data=>{
        this.cars[0] = data;
      }
    );
  }


  private getCarByBrand() {
    const brandSearch = this.route.snapshot.paramMap.get('brand')!;

    this.carService.getCarByBrand(brandSearch).subscribe(
      data=>{
        this.cars = data;
      }
    );
  }


  retrivedImage(imageUrl: string) {

    return(imageUrl.split("/src/")[1])

  }

}
