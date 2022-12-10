import {Component, Inject, OnInit} from '@angular/core';
import {AuthState, OktaAuth} from "@okta/okta-auth-js";
import {OKTA_AUTH, OktaAuthStateService} from "@okta/okta-angular";
import {filter, map, Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
  public isAuthenticated$!: Observable<boolean>;
  private userFullName: any;

  isHeAuth : boolean | undefined = false;

  constructor(private _router: Router, private _oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

  public async ngOnInit() {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    // Subscribe to authentication state changes
    this._oktaStateService.authState$.subscribe(
      (result) => {
        this.isHeAuth = result.isAuthenticated;
        console.log(result)
      }
    );

    this._oktaAuth.getUser().then(
      (res) => {
        console.log(res);
        this.userFullName = res.name;
      }
    );
  }

  public async signIn() : Promise<void> {
    await this._oktaAuth.signInWithRedirect().then(
      _ => this._router.navigate(['cars'])
    );
  }

  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
  }
}
