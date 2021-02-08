import {Component, EventEmitter, Inject, Input, Optional, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormModel} from './form.model';

@Component({
  selector: 'swagular-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() model?: FormModel;
  @Output() emitter = new EventEmitter();
  constructor(
    @Optional() public dialogRef: MatDialogRef<FormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: FormModel
  ) {
    if (data) {
      this.model = data;
    }
  }

  getControl(key: string) {
    return this.model?.formGroup.controls[key] as FormControl;
  }
  save() {
    if (this.dialogRef) {
      if (this.model?.formGroup.valid) { this.dialogRef.close(this.model?.formGroup.value); }
    } else {
      this.emitter.emit(this.model?.formGroup.value);
    }
  }
  cancel() {
    this.dialogRef.close();
  }
}
