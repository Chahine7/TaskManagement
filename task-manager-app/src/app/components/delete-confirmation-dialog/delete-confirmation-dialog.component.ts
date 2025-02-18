import {Component, Inject, OnDestroy} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import { TaskService } from '../../services/task.service';

interface DialogData {
  actionType: string;
  id: number;
  title: string;
  onDelete?: () => void; 

}

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  standalone: true,
  imports: [
    MatButton,
    MatDialogTitle,
    MatIcon,
    NgIf
  ],
  styleUrls: ['./delete-confirmation-dialog.component.css']
})
export class DeleteConfirmationDialogComponent implements OnDestroy{
  actionType: string;
  id: number;
  private subscriptions: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private taskService: TaskService,
  ) {
    this.actionType = data.actionType;
    this.id = data.id;
    
  }

  onConfirmDelete(): void {
    let deleteSub: Subscription;
  
    switch (this.actionType) {
      case 'task':
        deleteSub = this.taskService.deleteTaskById(this.id).subscribe({
          next: () => {
            if (this.data.onDelete) {
              this.data.onDelete();
            }
            
            this.dialogRef.close(true);
            this.snackBar.open('Task deleted successfully', 'Close', { duration: 3000 });
          },
          error: (err) => {
            this.snackBar.open(err.error.message, 'Close', { duration: 3000 });
            this.dialogRef.close(false);
          }
        });
        break;
      default:
        console.error('Invalid action type');
        this.dialogRef.close(false);
        return;
    }
  
    this.subscriptions.add(deleteSub);
  }
  
  onCancel(): void {
    this.dialogRef.close(false);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

