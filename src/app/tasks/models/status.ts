export const enum status {
  New = 1,
  WaitingOnSomeone,
  Completed,
  NotApplication
}

export const statusList : Array<{ status: string, id: number}> = [
  { status: 'New', id: status.New},
  { status: 'Waiting on someone', id: status.WaitingOnSomeone},
  { status: 'Completed', id: status.Completed},
  { status: 'Not Application', id: status.NotApplication}
];


