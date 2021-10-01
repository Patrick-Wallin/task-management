import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent } from './components/people/people.component';
import { NewHireComponent } from './components/new-hire/new-hire.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ViewTaskListComponent } from './components/view-task-list/view-task-list.component';

@NgModule({
  declarations: [
    PeopleComponent,
    NewHireComponent,
    ViewTaskListComponent
  ],
  exports: [
    PeopleComponent,
    NewHireComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ]
})
export class PeopleModule { }
