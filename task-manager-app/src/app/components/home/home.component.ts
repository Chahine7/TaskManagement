import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import { TaskAddDialogComponent } from '../task-add-dialog/task-add-dialog.component';
import { AddTaskRequest } from '../../models/AddTaskRequest';
import { TaskDTO } from '../../models/TaskDTO';
import { TaskTableComponent } from "../task-table/task-table.component";
import { TaskService } from '../../services/task.service';
import { MatButtonModule } from '@angular/material/button';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { TaskCommunicationService } from '../../services/task-communication.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
    imports: [
    FormsModule,
    TaskTableComponent,
    NgIf,
    MatButtonModule
]
})
export class HomeComponent implements OnInit, OnDestroy {


  tasks: TaskDTO[] = [];
  searchQuery: any;
  errorMessage: string = '';

  private subscriptions: Subscription = new Subscription();

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
              private taskCommunicationService: TaskCommunicationService,

              private taskService: TaskService) {
  }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.errorMessage = '';  
  
    const subscription = this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks; 
      },
      error: (err) => {
        this.errorMessage = err.message; 
      }
    });
  
    this.subscriptions.add(subscription);
  }

  openDialog(task?: AddTaskRequest): void {
    const dialogRef = this.dialog.open(TaskAddDialogComponent, {
      width: '380px',
      data: task || null,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllTasks();
    });
  }


  onDeleteTask(task: TaskDTO) {
  
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: { actionType: 'task', id: task.id, title: task.title, onDelete: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      } },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskCommunicationService.emitTaskDeleted();
        this.getAllTasks();
      } else {
      }
    });
  }
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
  
}