import {Component, OnInit,Inject} from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import OktaSignIn from "@okta/okta-signin-widget";
import myAppConfig from "./my-app-config";
import Util from "@okta/okta-signin-widget/types/src/util/Util";
import redirect = Util.redirect;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  // @ts-ignore
  title = 'okta-angular-quickstart';
  public isAuthenticated$!: Observable<boolean>;

  oktaSignin: any;

  constructor(private _router: Router,
              private _oktaStateService: OktaAuthStateService,
              @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) {

    this.oktaSignin = new OktaSignIn({
      logo: './assets/images/cars/test.png',
      features:{
        registration:true
      },
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }
    });
  }

  public ngOnInit(): void {
    // this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
    //   filter((s: AuthState) => !!s),
    //   map((s: AuthState) => s.isAuthenticated ?? false)
    // );


    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
        el: '#okta-sign-in-widget'}, // this name should be same as div tag id in login.component.html
      (response: any) => {


        this._oktaAuth.signInWithRedirect().then(
             _ => this._router.navigate(['/cars'])
        );

      },
      (error : any) => {
        throw error;
      }


    );


  }

  // public async signIn() : Promise<void> {
  //   await this._oktaAuth.signInWithRedirect().then(
  //     _ => this._router.navigate(['/profile'])
  //   );
  // }
  //
  // public async signOut(): Promise<void> {
  //   await this._oktaAuth.signOut();
  // }
}
