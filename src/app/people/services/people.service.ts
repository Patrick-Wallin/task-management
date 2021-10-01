import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { TasksService } from 'src/app/tasks/services/tasks.service';
import { status } from 'src/app/tasks/models/status';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  peopleStorage = window.localStorage;

  constructor(private tasksService: TasksService) { }

  addPerson(first_name: string, last_name: string, start_date: string, personal_email: string): void  {
    let listOfPeople = this.getListOfPeople();

    const personInPeople = listOfPeople.filter((data) => data.personal_email == personal_email);
    if(personInPeople.length == 0) {
      const p: Person = new Person();

      p.id = this.getHighestPersonId(listOfPeople)+1;
      p.first_name = first_name;
      p.last_name = last_name;
      p.start_date = start_date;
      p.personal_email = personal_email;
      p.tasks_left = '';

      const numberOfTasks = this.tasksService.addAllTasksToNewPerson(p);
      p.tasks_left = `0/${numberOfTasks}`;

      listOfPeople.push(p);
      this.peopleStorage.setItem('people', JSON.stringify(listOfPeople));
    }
  }

  doesThisEmailExistInPeopleList(email: string): boolean {
    let exist : boolean = true;

    let listOfPeople = this.getListOfPeople();

    const personInPeople = listOfPeople.filter((data) => data.personal_email == email);
    if(personInPeople.length == 0) {
      exist = false;
    }

    return exist;
  }

  getListOfPeople() : Person[] {
    const listOfPeople = this.peopleStorage.getItem('people');

    if(listOfPeople) {
      return JSON.parse(listOfPeople);
    }

    return [];
  }

  getPersonData(id: number): Person | null {
    let listOfPeople = this.getListOfPeople();
    let person: any = null;

    const index = listOfPeople.findIndex((person) => person.id === id);
    if(index >= 0) {
      person = listOfPeople[index];
    }

    return person;
  }

  getHighestPersonId(person: Person[]): number {
    if(person.length == 0)
      return 0;
    else {
      let highestNumber : number = 0;
      for(let i: number = 0; i < person.length; i++) {
        highestNumber = (person[i].id > highestNumber ? person[i].id : highestNumber);
      }
      return highestNumber;
    }

  }

  updateTasksLeft(id: number): void {
    let listOfPeople = this.getListOfPeople();

    const index = listOfPeople.findIndex((person) => person.id === id);
    if(index >= 0) {
      let numberOfCompletedOrNotApplication: number = 0;

      const tasks = this.tasksService.getPersonTasks(id);
      for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].status === status.Completed || tasks[i].status === status.NotApplication) {
          numberOfCompletedOrNotApplication++;
        }
      }

      listOfPeople[index].tasks_left = `${numberOfCompletedOrNotApplication}/${tasks.length}`;

      this.peopleStorage.setItem('people', JSON.stringify(listOfPeople));
    }
  }

  // Per Michael's request, people who has all tasks to be completed need to be at the bottom of the table.
  reorganizeListOfPeople() : void {
    let listOfPeople = this.getListOfPeople();
    let listOfUnCompletedPeople = Array<Person>();
    let listOfCompletedPeople = Array<Person>();

    for(let i = 0; i < listOfPeople.length; i++) {
      let tasksLeft = listOfPeople[i].tasks_left.split('/');
      if(tasksLeft.length == 2) {
        if(parseInt(tasksLeft[0]) == parseInt(tasksLeft[1])) {
          listOfCompletedPeople.push(listOfPeople[i]);
        }else {
          listOfUnCompletedPeople.push(listOfPeople[i]);
        }
      }else {
        listOfUnCompletedPeople.push(listOfPeople[i]);
      }
    }

    listOfPeople = listOfUnCompletedPeople.concat(listOfCompletedPeople);

    this.peopleStorage.setItem('people', JSON.stringify(listOfPeople));
  }
}
