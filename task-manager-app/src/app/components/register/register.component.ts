import {Component, Inject, OnDestroy} from '@angular/core';
import { MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {UserRegistrationRequest} from "../../models/user-registration-request";
import {AuthenticationService} from "../../services/authentication.service";
import {Subscription} from "rxjs";
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
   imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, NgIf, MatCardModule,  FormsModule],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy{

  userRegistrationRequest: UserRegistrationRequest = {}
  private subscriptions: Subscription = new Subscription();
  errorMessage: string = '';
  hide = true;
  constructor(private router: Router,
    @Inject(AuthenticationService) private authService: AuthenticationService) {

  }


  login() {
    this.router.navigate(['/login'])
  }

  register() {
   const registerSub = this.authService.registerUser(this.userRegistrationRequest)
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
   this.subscriptions.add(registerSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
