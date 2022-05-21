import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from './task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() task: ITask | null = null;
  @Output() edit: EventEmitter<ITask> = new EventEmitter<ITask>();

  constructor() {}

  ngOnInit(): void {}
}
