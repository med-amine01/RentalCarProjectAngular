import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {ActivatedRoute} from "@angular/router";
import {CarService} from "../../service/car.service";
import {Car} from "../../common/car";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit{

  //main form
  carFormGroup!:FormGroup;
  carToUpdate : Car = new Car();
  carAddBool = false;
  carUpdateBool = false;
  id!:number;
  btnValue = 'Add Car';
  file!: any ;

  //inject form services

  constructor(private formBuilder: FormBuilder,
              private carService : CarService,
              private route: ActivatedRoute,
              private http : HttpClient) {
  }
  ngOnInit(): void {

    this.initCarToUpdate();

    this.formGroupInit();

  }
  get brand(){return this.carFormGroup.get('carInfo.brand');}
  get model(){return this.carFormGroup.get('carInfo.model');}
  get serie(){return this.carFormGroup.get('carInfo.serie');}
  get fuelType(){return this.carFormGroup.get('carInfo.fuelType');}
  get gearType(){return this.carFormGroup.get('carInfo.gearType');}
  get dayPrice(){return this.carFormGroup.get('carInfo.dayPrice');}

  onChange(event: Event) {
    let result = (event.target as HTMLInputElement).files;
    this.file = result!.item(0);
  }


  formGroupInit(){
    this.carFormGroup = this.formBuilder.group({
      carInfo : this.formBuilder.group({
        brand : new FormControl('', [
          Validators.required,
          Validators.minLength(2)]),
        model : new FormControl('',[
          Validators.required,
          Validators.minLength(2)]),
        serie : new FormControl('',[
          Validators.required,
          Validators.pattern("[0-9]{2,5} tun [0-9]{2,5}"),
          Validators.minLength(2)]),
        fuelType : new FormControl('',[
          Validators.required,
          Validators.minLength(2)]),
        gearType : new FormControl('',[
          Validators.required,
          Validators.minLength(2)]),
        dayPrice : new FormControl('',[
          Validators.required,
          Validators.pattern("^[0-9]+(?:\\.[0-9]+)?$")])
      })
    });
  }

  initCarToUpdate(){
    //if were in update the fields will be initilized
    if(this.route.snapshot.paramMap.has('id')) {
      this.id = +this.route.snapshot.paramMap.get('id')!;
      this.carService.getOneCar(this.id).subscribe(
        data=>{
          this.carToUpdate = data;
        });
      this.btnValue = 'Update Car';
    }
  }

  insertCar(){
    let car = new Car();

    //upload image on server
    // let formData = new FormData();
    // formData.set("img",this.file)
    // this.http.post('http://localhost:4200/src/assets/images/cars',formData).subscribe(
    //   (response)=>{
    //     alert(response);
    //   }
    // )


    car.brand = this.brand?.value;
    car.model = this.model?.value;
    car.serie = this.serie?.value;
    car.fuelType = this.fuelType?.value;
    car.gearType = this.gearType?.value;
    car.imageUrl = "assets/images/cars/"+this.file!.name;
    car.dayPrice = this.dayPrice?.value;

    this.carService.addNewCar(car).subscribe({
      next: response =>{
        //our response from the api has car id => return as JSON (car.id)
        // alert("the car has been added the id is  : "+response.id);
        this.carAddBool = true;

      }, error: err => {
        alert("There was an error: "+err.message());
      }
    });
  }

  updateCar(){
    this.carService.updateCar(this.carToUpdate).subscribe(
      data=>{
        this.carUpdateBool = true;

      },error => {
      alert("There was an error: "+error.message());
    });
  }

  onSubmit(){
    if(this.carFormGroup.invalid){
      this.carFormGroup.markAllAsTouched();
      return;
    }

    if(this.btnValue == 'Add Car'){
      this.insertCar();
    }

    if(this.btnValue == 'Update Car'){
      this.updateCar();
    }

    this.carFormGroup.reset();

  }



}
