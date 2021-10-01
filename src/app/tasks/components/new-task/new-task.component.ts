import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TasksService } from '../../services/tasks.service';
import { assignedToList } from 'src/app/people/models/assigned-to';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  task : string;
  assigned_to : number;
  time_frame : number;

  selectedAssignedTo: number = 1;
  assignedToList : any;

  selectedTimeFrame: number = 1;
  timeFrameList : Array<number> = [];


  constructor(
    public dialogRef: MatDialogRef<NewTaskComponent>,
    public snackBar: MatSnackBar,
    private taskService: TasksService) {

    this.task = '';
    this.assigned_to = 0;
    this.time_frame = 1;

    this.assignedToList = assignedToList;

    this.timeFrameList = Array.from(Array(366).keys());
    this.timeFrameList.shift();
  }

  submitNewTask(): void {
    if(this.task.trim() !== "" && this.task.trim().length >= 10) {
      this.taskService.addTask(this.task, this.selectedAssignedTo, this.selectedTimeFrame);
      this.dialogRef.close( {
        data: {
          success: true
        }
      });
    }else {
      this.task = this.task.trim();
      this.snackBar.open('Please check your task description.', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }

  }

  ngOnInit(): void {}

}
