import { Component } from '@angular/core';
import {Car} from "../../common/car";
import {User} from "../../common/User";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CarService} from "../../service/car.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../service/user.service";
import {LoginStatusComponent} from "../login-status/login-status.component";
import {UserAuthService} from "../../service/user-auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userAddBool=false
  btnValue = 'Add user';
  userFormGroup!:FormGroup;


  constructor(private formBuilder: FormBuilder,
              private userService : UserService,
              private route: ActivatedRoute,
              private http : HttpClient,
              private router: Router,
              public userAuthService:UserAuthService) {
    if (this.userAuthService.isLoggedIn()){
      this.router.navigate(["/cars"]);
    }
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=> {

      this.formGroupInit();
    });

  }
  onSubmit(){
    if(this.userFormGroup.invalid){
      this.userFormGroup.markAllAsTouched();
      return;
    }

   this.insertCar();



    this.userFormGroup.reset();

  }

  get username(){return this.userFormGroup.get('userInfo.username');}
  get userFirstName(){return this.userFormGroup.get('userInfo.userFirstName');}
  get userLastName(){return this.userFormGroup.get('userInfo.userLastName');}
  get userPassword(){return this.userFormGroup.get('userInfo.userPassword');}
  get userConfirmPassword(){return this.userFormGroup.get('userInfo.userConfirmPassword');}
  formGroupInit(){
    this.userFormGroup = this.formBuilder.group({
      userInfo : this.formBuilder.group({
        userFirstName : new FormControl('', [
          Validators.required,
          Validators.minLength(2)]),
        userLastName : new FormControl('',[
          Validators.required,
          Validators.minLength(2)]),
        username : new FormControl('',[
          Validators.required,
          Validators.minLength(2)]),
        userPassword : new FormControl('',[
          Validators.required,
          Validators.minLength(2)]),
        userConfirmPassword : new FormControl('',[
          Validators.required,
          Validators.minLength(2)]),


      })
    });
  }
  insertCar(){
    let user = new User();




    user.username = this.username?.value;
    user.userFirstName = this.userFirstName?.value;
    user.userLastName = this.userLastName?.value;
    user.userPassword = this.userPassword?.value;
    this.userService.addNewUser(user);
    this.userService.addNewUser(user).subscribe( data=>{
       this.userAddBool = true;


     },error => {
       alert("There was an error: "+error.message());
     });


  }

}
