import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationRequest } from '../models/authentication-request';
import { UserRegistrationRequest } from '../models/user-registration-request';
import { environment } from '../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { AuthenticationResponse } from '../models/authentication-response';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = `${environment.apiUrl}/api/v1/auth`;
  private userKey = 'user'; 
  private authState = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  authState$ = this.authState.asObservable();

  login(userAddRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.apiUrl}/login`, userAddRequest)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          throwError(this.errorHandler.handleError(error))
        )
      );
  }

  registerUser(user: UserRegistrationRequest): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/register`, user)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          throwError(this.errorHandler.handleError(error))
        )
      );
  }

  // Ensure localStorage exists and is used only in the browser
  storeAuthResponse(authResponse: AuthenticationResponse): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.userKey, JSON.stringify(authResponse));
      this.authState.next(true); 
    }
  }

  // Check if localStorage is available and parse it
  isLoggedIn(): boolean {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    const userData = localStorage.getItem(this.userKey);
    if (userData) {
      const authResponse: AuthenticationResponse = JSON.parse(userData);
      return !!authResponse.token; 
    }
    return false;
  }

  // Get token from localStorage if it exists
  getToken(): string | null {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }
    const userData = localStorage.getItem(this.userKey);
    if (userData) {
      const authResponse: AuthenticationResponse = JSON.parse(userData);
      return authResponse.token ?? null;
    }
    return null;
  }

  // Get the email from stored user data
  getUserEmail(): string | undefined {
    if (typeof window === 'undefined' || !window.localStorage) {
      return undefined;
    }
    const userData = localStorage.getItem(this.userKey);
    if (userData) {
      const authResponse: AuthenticationResponse = JSON.parse(userData);
      return authResponse.user?.email;
    }
    return undefined;
  }

  // Remove the user data from localStorage
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.userKey);
      this.authState.next(false); 
    }
  }
}
