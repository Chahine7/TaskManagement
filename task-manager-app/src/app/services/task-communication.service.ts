import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskCommunicationService {

  private taskDeletedSource = new Subject<void>();
  taskDeletedSource$ = this.taskDeletedSource.asObservable();


  
  emitTaskDeleted(){
    this.taskDeletedSource.next();
  }
}