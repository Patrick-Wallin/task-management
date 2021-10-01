import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Person_Task } from '../models/task-list';
import { assignedToList } from 'src/app/people/models/assigned-to';
import * as moment from 'moment';
import { Person } from 'src/app/people/models/person';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksStorage = window.localStorage;
  peopleTasksStorage = window.localStorage;

  constructor() { }

  addTask(task_description: string, assigned_to: number, time_frame: number): void {
    let listOfTasks = this.getListOfTasks();
    let task: Task = new Task();

    task.task = task_description;
    task.assigned_to = assigned_to;
    task.time_frame = time_frame;

    const name: string | undefined = assignedToList.find(x => x.id === assigned_to)?.name;
    task.assigned_name = (name === undefined ? '' : name);

    listOfTasks.push(task);

    this.tasksStorage.setItem('tasks', JSON.stringify(listOfTasks));
  }

  getListOfTasks() : Task[] {
    const listOfTasks = this.tasksStorage.getItem('tasks');

    if(listOfTasks) {
      return JSON.parse(listOfTasks);
    }

    return [];
  }

  addAllTasksToNewPerson(person: Person): number {
    const listOfTasks = this.getListOfTasks();
    let numberOfTasks: number = 0;

    if(person !== null) {
      let personTask: Person_Task = new Person_Task();
      personTask.person_id = person.id;
      personTask.taskList = listOfTasks;
      for(let index: number = 0; index < personTask.taskList.length; index++) {
        personTask.taskList[index].due_date = moment(person.start_date).add(personTask.taskList[index].time_frame,'d').format('MM/DD/YYYY');
      }

      let listOfPeopleTasks = this.getListOfPeopleTasks();
      listOfPeopleTasks.push(personTask);

      this.peopleTasksStorage.setItem('people-tasks', JSON.stringify(listOfPeopleTasks));

      numberOfTasks = listOfTasks.length;
    }

    return numberOfTasks;
  }

  getListOfPeopleTasks(): Person_Task[] {
    const listOfPeopleTasks = this.peopleTasksStorage.getItem('people-tasks');

    if(listOfPeopleTasks) {
      return JSON.parse(listOfPeopleTasks);
    }

    return [];
  }

  getPersonTasks(person_id: number): Task[] {
    let listOfPeopleTasks = this.getListOfPeopleTasks();
    let personTask: Task[] = [];

    const index = listOfPeopleTasks.findIndex((person) => person.person_id === person_id);
    if(index >= 0) {
      personTask = listOfPeopleTasks[index].taskList;
    }

    return personTask;
  }

  updatePersonTask(index: number, task: Task, person_id: number):  void {
    let listOfPeopleTasks = this.getListOfPeopleTasks();

    const indexOfPerson = listOfPeopleTasks.findIndex((person) => person.person_id === person_id);
    if(indexOfPerson >= 0) {
      listOfPeopleTasks[indexOfPerson].taskList[index] = task;
      this.peopleTasksStorage.setItem('people-tasks', JSON.stringify(listOfPeopleTasks));
    }

  }
}
