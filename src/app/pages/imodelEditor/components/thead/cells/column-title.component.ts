import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Column } from '../../../lib/data-set/column';
import { DataSource } from '../../../lib/data-source/data-source';

@Component({
  selector: 'gc-st-column-title',
  template: `
    <div class="ng2-smart-title">
      <gc-smart-table-title [source]="source" [column]="column" (sort)="sort.emit($event)"></gc-smart-table-title>
    </div>
  `,
})
export class ColumnTitleComponent {

  @Input() column: Column;
  @Input() source: DataSource;

  @Output() sort = new EventEmitter<any>();

}
