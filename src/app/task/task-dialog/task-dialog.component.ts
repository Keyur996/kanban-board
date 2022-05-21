import { ITask } from './../task.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITaskDialogData } from '../models/task-dialog.model';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
})
export class TaskDialogComponent implements OnInit {
  private backupTask: Partial<ITask> = { ...this.data.task };

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITaskDialogData
  ) {}

  ngOnInit(): void {}

  public cancel(): void {
    this.data.task = { ...this.backupTask };
    this.dialogRef.close(this.data);
  }
}
