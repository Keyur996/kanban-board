import { ITask } from '../../task/task.model';

export class Column {
  id: string;
  name: string;
  tasks: ITask[];
  constructor(name: string, id: string, tasks: ITask[] = []) {
    this.name = name;
    this.id = id;
    this.tasks = tasks;
  }
}
