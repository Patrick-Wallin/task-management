export class Task {
  task: string;
  assigned_to: number;
  time_frame: number;
  assigned_name: string;
  status: number;
  due_date: string;

  constructor(){
      this.task = '';
      this.assigned_to = 0;
      this.time_frame = 0;
      this.assigned_name = '';
      this.status = 1;
      this.due_date = '';
  }
}
