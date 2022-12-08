import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../service/client.service";
import {ActivatedRoute} from "@angular/router";
import {Client} from "../../common/client";

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {

  clientFormGroup!: FormGroup;
  clienAddBool: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService,
              private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.formGroupInit();
  }


  formGroupInit() {
    this.clientFormGroup = this.formBuilder.group({
      clientInfo: this.formBuilder.group({
        cin: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}')]),
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [Validators.required]),
        licenceDrive: new FormControl('', [Validators.required])
      })
    });
  }


  get cin() {
    return this.clientFormGroup.get('clientInfo.cin');
  }

  get firstName() {
    return this.clientFormGroup.get('clientInfo.firstName');
  }

  get lastName() {
    return this.clientFormGroup.get('clientInfo.lastName');
  }

  get email() {
    return this.clientFormGroup.get('clientInfo.email');
  }

  get password() {
    return this.clientFormGroup.get('clientInfo.password');
  }

  get phoneNumber() {
    return this.clientFormGroup.get('clientInfo.phoneNumber');
  }

  get licenceDrive() {
    return this.clientFormGroup.get('clientInfo.licenceDrive');
  }


  onSubmit() {

    if(this.clientFormGroup.invalid){
      this.clientFormGroup.markAllAsTouched();
      return;
    }

    let client = new Client();
    client.cin = this.cin?.value;
    client.firstName = this.firstName?.value;
    client.lastName = this.lastName?.value;
    client.email = this.email?.value;
    client.password = this.password?.value;
    client.phoneNumber = this.phoneNumber?.value;
    client.licenceDrive = this.licenceDrive?.value; //yyyy-mm-jj

    //TODO : redirect to location : number of days to locate



    //{[azer,aezr,azer]}
    this.clientService.addNewClient(client).subscribe({
      next: response =>{
        //our response from the api has car id => return as JSON (car.id)
        // alert("the car has been added the id is  : "+response.id);
        this.clienAddBool = true;

      }, error: err => {
        alert("There was an error: "+err.message());
      }
    });
  }
}
