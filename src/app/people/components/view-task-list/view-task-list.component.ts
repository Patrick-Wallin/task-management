import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TasksService } from 'src/app/tasks/services/tasks.service';
import { PeopleService } from '../../services/people.service';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/tasks/models/task';
import { statusList } from 'src/app/tasks/models/status';

export interface DialogData {
  person_name: string;
  person_id: number;
}

@Component({
  selector: 'app-view-task-list',
  templateUrl: './view-task-list.component.html',
  styleUrls: ['./view-task-list.component.css']
})
export class ViewTaskListComponent implements OnInit {
  displayedColumns = ['task', 'assigned_to', 'due_date', 'status'];
  dataPersonTask: MatTableDataSource<Task>;
  personTask: Task[] = [];
  statusList : any;

  constructor(
    public dialogRef: MatDialogRef<ViewTaskListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public snackBar: MatSnackBar,
    private tasksService: TasksService,
    private peopleService: PeopleService) {

      this.statusList = statusList;
      this.personTask = [];
      this.dataPersonTask = new MatTableDataSource(this.personTask);

    }

  ngOnInit(): void {
    this.refreshPersonTasks();
  }

  refreshPersonTasks(): void {
    this.personTask = this.tasksService.getPersonTasks(this.data.person_id);
    this.dataPersonTask = new MatTableDataSource(this.personTask);
  }

  statusChange(row_number: number, row: Task) : void {
    this.tasksService.updatePersonTask(row_number, row, this.data.person_id);
    this.peopleService.updateTasksLeft(this.data.person_id);
  }

}
