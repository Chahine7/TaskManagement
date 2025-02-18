// src/app/services/error-handler.service.ts
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      return {
        message: 'An error occurred. Please check your network connection.',
        statusCode: 0,
        path: window.location.pathname,
        timestamp: new Date().toISOString(),
      };
    } else {
      // Backend returned an error response
      return {
        message: error.error.message || 'An error occurred on the server.',
        statusCode: error.status,
        path: error.error.path || window.location.pathname,
        timestamp: error.error.timestamp || new Date().toISOString(),
      };
    }
  }
}