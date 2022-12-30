import { Component, OnInit } from '@angular/core';
import { TableOptions } from 'swagular/components/src/table/table.component';

interface User {
  id: string;
  name: string;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  tableOptions: TableOptions<User> = {
    columns: [
      { key: 'id', title: '', isSortable: false },
      { key: 'name', title: '' },
    ],
    actions: {
      rowClick: (row) => {
        console.log(row);
      },
    },
    rowActions:[{action:() =>{}, icon:'manage_accounts', title:"Some title"}, {action:() =>{}, icon:'manage_accounts'}]
  };
  list: User[] = [
    { id: '1a', name: 'sab' },
    { id: 'dad', name: 'ad' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
