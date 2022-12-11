import {Component, Inject, OnInit} from '@angular/core';
import {AuthState, OktaAuth} from "@okta/okta-auth-js";
import {OKTA_AUTH, OktaAuthStateService} from "@okta/okta-angular";
import {filter, map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {UserAuthService} from "../../service/user-auth.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
  constructor(
    public userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
  ) {}

  ngOnInit(): void {}

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();

  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }

}
