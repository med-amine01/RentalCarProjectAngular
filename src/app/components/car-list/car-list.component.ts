import {Component, OnInit} from '@angular/core';
import {Car} from "../../common/car";
import {CarService} from "../../service/car.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars : Car[] = [];
  searchMode!: boolean;
  currentCarId!: number;

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

  listCars(){
    //we set up the router in app.module with :keyword
    this.searchMode = this.route.snapshot.paramMap.has("id");

    if(this.searchMode) {
        this.getCarById();
    }
    else {
      this.getAllCars();
    }

  }

  getAllCars(){
    //it will return json file in that data and we will asign that to our prouducts
    //data is the return value of json file
    this.carService.getAllCars().subscribe(
      data =>{
        this.cars = data;
        console.log(this.cars)
      }
    );
  }

  getCarById(){
    const hasCarId: boolean = this.route.snapshot.paramMap.has('id');
    if(hasCarId) {
      // get the id param and convert that to a number using + (the ! at the end is to manage the null Object)
      this.currentCarId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      //default it will take the category 1
      //idea: we can return 0 and define that in the route and redirect the page to component: 404 not found
      this.currentCarId = 1;
    }

    this.carService.getOneCar(this.currentCarId).subscribe(
      data=>{
        this.cars[0] = data;
      }
    );
  }
}
