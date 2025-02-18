import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { TaskDTO } from '../models/TaskDTO';
import { environment } from '../../environments/environment';
import { AddTaskRequest } from '../models/AddTaskRequest';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  private apiUrl = `${environment.apiUrl}/api/v1/task`;

  constructor(private http: HttpClient,
          private errorHandler: ErrorHandlerService
  ) {}

  getAllTasks(): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(this.apiUrl)
        .pipe(catchError((error: HttpErrorResponse) => throwError(this.errorHandler.handleError(error))));
    
}
addTask(addTaskRequest: AddTaskRequest): Observable<TaskDTO> {
  return this.http.post<TaskDTO>(`${this.apiUrl}`, addTaskRequest)        
  .pipe(catchError((error: HttpErrorResponse) => throwError(this.errorHandler.handleError(error))));
  ;
}
updateTask(id: number, addTaskRequest: AddTaskRequest): Observable<TaskDTO> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.put<TaskDTO>(url, addTaskRequest)        
  .pipe(catchError((error: HttpErrorResponse) => throwError(this.errorHandler.handleError(error))));
  ;
}

deleteTaskById(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`)
  .pipe(catchError((error: HttpErrorResponse) => throwError(this.errorHandler.handleError(error))));
  ;
}

}