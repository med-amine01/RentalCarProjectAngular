import {Component, Inject, OnInit} from '@angular/core';
import {OKTA_AUTH, OktaAuthStateService} from '@okta/okta-angular';
import { filter, map, Observable } from 'rxjs';
import {AuthState, OktaAuth} from '@okta/okta-auth-js';
import {Router} from "@angular/router";
import OktaSignIn from "@okta/okta-signin-widget";
import myAppConfig from "../login/my-app-config";
import {Client} from "../../common/client";
@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit{

  // public isAuthenticated$!: Observable<boolean>;

   isAuthenticated : undefined | boolean ;
   userFullName !: string ;
   client? : Client;

  constructor(
              private _oktaStateService: OktaAuthStateService,
              @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) {



  }

  public ngOnInit(): void {
    // this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
    //   filter((s: AuthState) => !!s),
    //   map((s: AuthState) => s.isAuthenticated ?? false)
    // );

    this._oktaStateService.authState$.subscribe(
      (result) => {
        console.log("result = " + result.isAuthenticated)
        this.isAuthenticated = result.isAuthenticated;
        this.getUserDetails();
      }
    );
  }


  getUserDetails() {
    if (this.isAuthenticated) {


      // Fetch the logged in user details (user's claims)
      //
      // user full name is exposed as a property name
      this._oktaAuth.getUser().then(
        (res) => {



          this.userFullName =""+res.family_name;

        }
      );
    }
  }

  logout() {
    // Terminates the session with Okta and removes current tokens.
    this._oktaAuth.signOut();
  }


  // public async signIn() : Promise<void> {
  //
  //   await this._oktaAuth.signInWithRedirect().then(
  //     _ => this._router.navigate(['/cars'])
  //   );
  // }
  //
  // public async signOut(): Promise<void> {
  //   await this._oktaAuth.signOut();
  //
  //   await this._router.navigate(['/cars']);
  //
  // }
}



