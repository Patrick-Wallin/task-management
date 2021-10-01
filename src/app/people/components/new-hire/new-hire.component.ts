import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-new-hire',
  templateUrl: './new-hire.component.html',
  styleUrls: ['./new-hire.component.css']
})
export class NewHireComponent implements OnInit {
  first_name: string = '';
  last_name: string = '';
  start_date: string = '';
  personal_email: string = '';
  init_start_date = new FormControl(new Date());

  constructor(
    public dialogRef: MatDialogRef<NewHireComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data:any,
    public snackBar: MatSnackBar,
    private peopleService: PeopleService) {

    this.first_name = '';
    this.last_name = '';
    this.start_date = this.init_start_date.value;
    this.personal_email = '';
  }

  submitNewHire(): void {
    if(this.first_name.trim() !== "" && this.first_name.trim().length >= 3 && this.last_name.trim() !== "" && this.last_name.trim().length >= 3) {
      const exist = this.peopleService.doesThisEmailExistInPeopleList(this.personal_email);

      if(exist == true) {
        this.snackBar.open('Personal email already exists.  Please enter different email.', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }else {
        this.start_date = moment(this.start_date).format('MM/DD/YYYY');
        this.peopleService.addPerson(this.first_name, this.last_name, this.start_date, this.personal_email);
        this.dialogRef.close();this.dialogRef.close( {
          data: {
            success: true
          }
        });
      }
    }else {
      this.first_name = this.first_name.trim();
      this.last_name = this.last_name.trim();
      this.snackBar.open('Please check your first or last name.', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  ngOnInit(): void {}

}
