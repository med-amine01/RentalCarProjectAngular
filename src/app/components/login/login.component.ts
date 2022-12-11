import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {NgForm} from "@angular/forms";
import {UserAuthService} from "../../service/user-auth.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        this.router.navigate(['/cars']);

      },
      (error) => {
        console.log(error);
      }
    );
  }
}
