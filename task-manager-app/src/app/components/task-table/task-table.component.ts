import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TaskDTO } from '../../models/TaskDTO';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule,MatPaginatorModule],
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent {
  @Input() tasks: TaskDTO[] = [];
  @Output() edit = new EventEmitter<TaskDTO>();
  @Output() delete = new EventEmitter<TaskDTO>();

  displayedColumns: string[] = ['id', 'title', 'description', 'status', 'dueDate', 'actions'];
  dataSource = new MatTableDataSource<TaskDTO>(this.tasks);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnChanges() {
    this.dataSource.data = this.tasks;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
  }


  editTask(task: TaskDTO) {
    this.edit.emit(task);
  }

  deleteTask(task: TaskDTO) {
    this.delete.emit(task);
  }
}
