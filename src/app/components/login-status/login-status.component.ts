import {Component, Inject, OnInit} from '@angular/core';
import {OKTA_AUTH, OktaAuthStateService} from '@okta/okta-angular';
import { filter, map, Observable } from 'rxjs';
import {AuthState, OktaAuth} from '@okta/okta-auth-js';
import {Router} from "@angular/router";
@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit{
  public isAuthenticated$!: Observable<boolean>;

  constructor(private _router: Router, private _oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

  public ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  public async signIn() : Promise<void> {
    await this._oktaAuth.signInWithRedirect().then(
      _ => this._router.navigate(['/cars'])
    );
  }

  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
  }}
