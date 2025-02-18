import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthenticationResponse} from "../../models/authentication-response";

@Injectable({
  providedIn: 'root'
})
export class AccessGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (typeof window === 'undefined') {
      // We're in a server-side environment, deny access.
      return false;
    }
    const storedUser = localStorage.getItem("user");
    if (storedUser){
      const authResponse: AuthenticationResponse = JSON.parse(storedUser);
      const token = authResponse.token;
      if(token){
        const jwtHelper = new JwtHelperService();
        const isTokenNonExpired =  !jwtHelper.isTokenExpired(token);
        if(isTokenNonExpired){
          return true;
        }
      }
    }
    this.router.navigate(['login']).then(
      r => {
        console.log("Redirected to login page");
      }
    );
    return false;
  }
}
