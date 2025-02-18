import {Component, Inject, OnDestroy} from '@angular/core';

import { MatInputModule} from "@angular/material/input";
import { MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {AuthenticationRequest} from "../../models/authentication-request";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-login',
  standalone: true,
   imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, NgIf, MatCardModule,  FormsModule],
 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{
  authenticationRequest: AuthenticationRequest = {};
  private subscriptions: Subscription = new Subscription();

  errorMessage: string = '';
  hide = true;
  constructor(@Inject(AuthenticationService) private authService: AuthenticationService,
    private router: Router
  ) { }

  login() {
    this.errorMessage='';
   const subscription = this.authService.login(this.authenticationRequest)
      .subscribe({
        next: (authenticationResponse) => {
          localStorage.setItem("user", JSON.stringify(authenticationResponse));
          this.router.navigate(["home"]).then(r =>{
          });
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      })
    this.subscriptions.add(subscription);
  }

  register() {
  this.router.navigate(['/register'])
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
