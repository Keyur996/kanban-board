import { ITask } from './../task.model';

export interface ITaskDialogData {
  task: Partial<ITask>;
  enableDelete: boolean;
}

export interface ITaskDialogResult {
  task: ITask;
  delete?: boolean;
}
