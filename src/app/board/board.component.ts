import { ITaskDialogResult } from './../task/models/task-dialog.model';
import { TaskDialogComponent } from './../task/task-dialog/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Board } from './models/board.model';
import { Column } from './models/column.model';
import { ITask } from './../task/task.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { result } from 'lodash';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  @Input() board: Board | null = null;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  public drop(event: CdkDragDrop<ITask[] | undefined>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data ?? [],
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data ?? [],
        event.container.data ?? [],
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  public getConnectedColumns(column: Column) {
    return (this.board?.columns ?? [])
      .filter((_col) => _col.id !== column.id)
      .map((_col) => _col.id);
  }

  public editTask(id: string, event: ITask) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: event,
        enableDelete: true,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (result: ITaskDialogResult | undefined) => {
        if (!result) {
          return;
        }
        const dataColumn = this.board?.columns.find((_col) => _col.id === id);
        const taskIndex = dataColumn?.tasks.indexOf(result.task);

        if (!dataColumn && !taskIndex && !Object.keys(result.task).length) {
          return;
        }

        if (result.delete) {
          dataColumn?.tasks.splice(taskIndex!, 1);
        } else {
          dataColumn!.tasks[taskIndex!] = result.task;
        }
      },
      error: (err) => console.log('Error in Dialog', err),
    });
  }

  public dropGrid(event: CdkDragDrop<Column>) {
    moveItemInArray(
      this.board?.columns ?? [],
      event.previousIndex,
      event.currentIndex
    );
  }
}
