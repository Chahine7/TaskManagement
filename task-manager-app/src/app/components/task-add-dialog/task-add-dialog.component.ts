import { Component, Inject, inject } from '@angular/core';
import { AddTaskRequest } from '../../models/AddTaskRequest';
import { TaskDTO, TaskStatus } from '../../models/TaskDTO';
import { TaskService } from '../../services/task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import { MatOption, MatOptionModule, provideNativeDateAdapter} from "@angular/material/core";
import {Subscription} from "rxjs";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
@Component({
  selector: 'app-task-add-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatOption,
    MatSelect,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './task-add-dialog.component.html',
  styleUrl: './task-add-dialog.component.css'
})
export class TaskAddDialogComponent {
  private _snackBar = inject(MatSnackBar);
  statuses = Object.values(TaskStatus).filter(value => typeof value === 'string');
  addTaskRequest: AddTaskRequest = {};
  private subscriptions: Subscription = new Subscription();

  constructor(
    private taskService: TaskService,
    private router: Router,
    public dialogRef: MatDialogRef<TaskAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDTO | null 
  ) {
    if (data) {
      this.addTaskRequest = { ...data };
    }
  }

  onSubmit() {
    if (this.data) {
     const updateSub = this.taskService.updateTask(this.data.id, this.addTaskRequest)
        .subscribe({
          next: () => this.dialogRef.close(),
          error: err => console.error(err.message, "close")
        });
    this.subscriptions.add(updateSub);
    } else {
      const addSub = this.taskService.addTask(this.addTaskRequest)
        .subscribe({
          next: () => {
            this.router.navigate(['/home']).then(() => {
              this.dialogRef.close()
            });
          },
          error: err =>
          {
            this.openSnackBar(err.messgae, "close")
          }
        });
    this.subscriptions.add(addSub);
    
      }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  checkFormValidity(): boolean {
    return !!(
      this.addTaskRequest.title &&
      this.addTaskRequest.description &&
      this.addTaskRequest.dueDate
    );
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}
