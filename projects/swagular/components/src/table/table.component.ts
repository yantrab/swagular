import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Dictionary, keyBy } from 'lodash';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { CellDefDirective } from './cell-def.directive';
import { MatSort } from '@angular/material/sort';

export interface ColumnDef<T = any> {
  key: keyof T & string;
  title?: string;
  isSortable?: boolean;
  isFilterable?: boolean;
  width?: string;
}

export declare type TableOptions<T> = {
  columns: ColumnDef<T>[];
  filter?: { placeholder: string };
  filterable?: boolean;
  rowActions?: {
    icon: string;
    action: ($event: MouseEvent, row: T) => any;
  }[];
  actions?: { rowClick: (row: T) => void };
};

@Component({
  selector: 'swagular-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements AfterViewInit {
  @Input() options?: TableOptions<any>;
  @ViewChild('filter', { static: false }) filter?: ElementRef;
  public columns?: string[];

  @ViewChild(MatSort, { static: false }) set sort(value: MatSort) {
    if (this._dataSource) this._dataSource.sort = value;
  }

  _dataSource?: MatTableDataSource<any>;

  @Input() set dataSource(data: any[]) {
    this._dataSource = new TableVirtualScrollDataSource(data);
  }

  public _matCellDefs: Dictionary<any> = {};

  @ContentChildren(CellDefDirective) set matCellDefs(
    cells: QueryList<CellDefDirective>
  ) {
    this._matCellDefs = keyBy(cells.toArray() || {}, 'key');
  }

  applyFilter($event: KeyboardEvent): void {
    if (this._dataSource) {
      this._dataSource.filter = ($event.target as any).value
        .trim()
        .toLowerCase();
    }
  }

  ngAfterViewInit(): void {
    if (!this._dataSource) {
      return;
    }
    if (!this.options) {
      this.options = {
        columns: Object.keys(this._dataSource.data[0] || {}).map((key) => ({
          key,
        })),
      };
    }
    this.columns = this.options.rowActions ? ['actions'] : [];
    this.columns?.push(...this.options?.columns.map((c) => c.key));
  }

  rowClick($event: MouseEvent) {
    const selection = window.getSelection();
    if (selection?.toString().length === 0) {
      this.options?.actions?.rowClick($event);
    }
  }

  raiseAction(
    action: ($event: MouseEvent, row: any) => any,
    $event: MouseEvent,
    row: any
  ) {
    $event.stopPropagation();
    $event.preventDefault();
    action($event, row);
  }
}
