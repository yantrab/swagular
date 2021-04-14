import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[appCellDef]'
})
export class CellDefDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('column') key = '';

  constructor(public template: TemplateRef<any>) {}
}
