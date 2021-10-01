import { Task } from "./task";

export class Person_Task {
  person_id: number;
  taskList: Task[];

  constructor(){
      this.person_id = 0;
      this.taskList = [];
  }
}
