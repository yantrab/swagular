import { Component, OnInit } from '@angular/core';
import {TableOptions} from 'swagular/components/src/table/table.component';

interface User{
  id: string;
  name: string;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  tableOptions: TableOptions<User> = {
    columns: [
      { key: 'id', title: '', isSortable: false },
      { key: 'name', title: '', isSortable: false }]
  };
  list: User[] = [{id: '1a', name: 'sab'}];
  constructor() { }

  ngOnInit(): void {
  }

}
