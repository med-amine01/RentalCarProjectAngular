import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {FormService} from "../../service/form.service";
import {CarService} from "../../service/car.service";
import {Car} from "../../common/car";

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit{

  //main form
  carFormGroup!:FormGroup;

  //inject form services
  constructor(private formBuilder: FormBuilder,
              private formService : FormService,
              private carService : CarService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.carFormGroup = this.formBuilder.group({
      carInfo : this.formBuilder.group({
        brand : new FormControl('',[Validators.required]),
        model : new FormControl('',[Validators.required]),
        serie : new FormControl('',[Validators.required]),
        fuelType : new FormControl('',[Validators.required]),
        gearType : new FormControl('',[Validators.required]),
        dayPrice : new FormControl('',[Validators.required]),
      })
    });
  }

  get brand(){return this.carFormGroup.get('carInfo.brand')?.value;}
  get model(){return this.carFormGroup.get('carInfo.model')?.value;}
  get serie(){return this.carFormGroup.get('carInfo.serie')?.value;}
  get fuelType(){return this.carFormGroup.get('carInfo.fuelType')?.value;}
  get gearType(){return this.carFormGroup.get('carInfo.gearType')?.value;}
  get dayPrice(){return this.carFormGroup.get('carInfo.dayPrice')?.value;}


  onSubmit(){
    let car = new Car();
    car.brand = this.brand;
    car.model = this.model;
    car.serie = this.serie;
    car.fuelType = this.fuelType;
    car.gearType = this.gearType;
    car.dayPrice = this.dayPrice;

    this.carService.addNewCar(car).subscribe({
      next: response =>{
        //our response from the api has the tracking number => return as JSON (response.orderTrackingNumber)
        alert("the car has been added the id is  : "+response.id);
        //reset the cart

      },
      error: err => {
        alert("There was an error: "+err.message());
      }
    });
  }

}
