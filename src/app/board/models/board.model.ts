import { Column } from './column.model';

export class Board {
  name: string;
  columns: Column[];
  constructor(name: string, columns: Column[]) {
    this.name = name;
    this.columns = columns;
  }
}
