export enum TaskStatus {
    ToDo = 'ToDo',
    InProgress = 'InProgress',
    Done = 'Done',

  }
  
  export interface TaskDTO {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
  }
  