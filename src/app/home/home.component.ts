import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Board } from '../board/models/board.model';
import { Column } from '../board/models/column.model';
import { ITaskDialogResult } from '../task/models/task-dialog.model';
import { TaskDialogComponent } from '../task/task-dialog/task-dialog.component';
import { get } from 'lodash';
// import * as uuid from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  board: Board = new Board('Kanban Board', [
    new Column('Backlog', 'backlog', [
      {
        title: 'Buy milk',
        description: 'Go to the store and buy milk',
      },
      {
        title: 'Create a Kanban app',
        description: 'Using Firebase and Angular create a Kanban app!',
      },
    ]),
    new Column('In Progress', 'inProgress'),
    new Column('Done', 'done'),
  ]);

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  public newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (result: ITaskDialogResult | undefined) => {
        if (!result) {
          return;
        }
        // push task into backlog;
        if (
          get(this, 'board.columns.0', undefined) &&
          Object.keys(get(result, 'task', {})).length
        ) {
          this.board.columns[0].tasks.push(result.task);
        }
      },
      error: (err) => console.log('Error While Submitting', err),
      complete: () => console.log('Finished'),
    });
  }
}
