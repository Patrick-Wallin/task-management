import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateTasksComponent } from './components/template-tasks/template-tasks.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { NewTaskComponent } from './components/new-task/new-task.component';

@NgModule({
  declarations: [
    TemplateTasksComponent,
    TaskListComponent,
    NewTaskComponent
  ],
  exports: [
    TemplateTasksComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ]
})
export class TasksModule { }
