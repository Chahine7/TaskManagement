import { TaskStatus } from "./TaskDTO";

export interface AddTaskRequest {
    title?: string;
    description?: string;
    dueDate?: Date;
    status?: TaskStatus
  }