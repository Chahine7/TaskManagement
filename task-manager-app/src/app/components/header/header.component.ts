import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {AuthenticationResponse} from "../../models/authentication-response";
import {JwtHelperService} from "@auth0/angular-jwt";
import {NgIf} from "@angular/common";
import { MatIcon } from '@angular/material/icon';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    RouterLink,
    NgIf,
    MatIcon
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  userEmail: string | undefined;
constructor(
  private authService: AuthenticationService,

) { }
ngOnInit() {
  this.authService.authState$.subscribe((isLoggedIn) => {
    if (isLoggedIn) {
      this.userEmail = this.authService.getUserEmail();
    } else {
      this.userEmail = undefined;
    }
  });

  this.userEmail = this.authService.getUserEmail();
}

isLoggedIn(): boolean {
  return this.authService.isLoggedIn();
}

logout() {
  this.authService.logout();
}
}
