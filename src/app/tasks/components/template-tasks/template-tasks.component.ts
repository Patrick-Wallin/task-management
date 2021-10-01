import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { MatTableDataSource } from '@angular/material/table';
import { NewTaskComponent } from '../new-task/new-task.component';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-template-tasks',
  templateUrl: './template-tasks.component.html',
  styleUrls: ['./template-tasks.component.css']
})
export class TemplateTasksComponent implements OnInit {
  displayedColumns = ['task', 'assigned_name', 'time_frame'];
  dataTasks: MatTableDataSource<Task>;
  task: Task[] = [];

  constructor(public dialog: MatDialog, public tasksService: TasksService) {
    this.task = [];
    this.dataTasks = new MatTableDataSource(this.task);
  }

  openNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if(result.data.success == true) {
          this.refreshTasks();
        }
      }
    });
  }

  ngOnInit(): void {
    this.refreshTasks();
  }

  refreshTasks() {
    this.task = this.tasksService.getListOfTasks();
    this.dataTasks = new MatTableDataSource(this.task);
  }

}
