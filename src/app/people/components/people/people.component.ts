import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { MatTableDataSource } from '@angular/material/table';
import { NewHireComponent } from '../new-hire/new-hire.component';
import { ViewTaskListComponent } from '../view-task-list/view-task-list.component';
import { MatDialog } from '@angular/material/dialog';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  displayedColumns = ['first_name', 'last_name', 'start_date', 'personal_email', 'tasks_left', 'view_action'];
  dataPeople: MatTableDataSource<Person>;
  person: Person[] = [];

  constructor(public dialog: MatDialog, private peopleService: PeopleService) {
    this.person = [];
    this.dataPeople = new MatTableDataSource(this.person);
  }

  openNewHireDialog() {
    const dialogRef = this.dialog.open(NewHireComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if(result.data.success == true) {
          this.refreshPeople();
        }
      }
    });
  }

  ngOnInit(): void {
    this.refreshPeople();
  }

  refreshPeople(): void {
    this.peopleService.reorganizeListOfPeople();
    this.person = this.peopleService.getListOfPeople();
    this.dataPeople = new MatTableDataSource(this.person);
  }

  openTaskList(id: number, first_name: string) {
    const dialogRef = this.dialog.open(ViewTaskListComponent,  {
      data: { person_name: first_name, person_id: id},
      width: '75%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshPeople();
    });
  }
}
