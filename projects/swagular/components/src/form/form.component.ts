import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormModel } from '../models/form.model';
import { get } from 'lodash-es';

@Component({
  selector: 'swagular-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() model?: FormModel & { locale?: any };
  @Output() emitter = new EventEmitter();

  constructor(
    @Optional() @Inject('LOCALE') public locale: any,
    @Optional() public dialogRef: MatDialogRef<FormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: FormModel
  ) {
    if (data) {
      this.model = data;
    }
  }

  ngOnInit() {
    if (this.model?.localePath) {
      const locale = get(this.locale, this.model.localePath) || {};
      this.model = Object.assign(locale, this.model, {});
      if (!this.model) {
        return;
      }

      this.model.fields.forEach((f, i) => {
        if (!this.model) {
          return;
        }
        this.model.fields[i] = Object.assign(locale[f.key] || {}, f, {});
      });
    }
  }

  getControl(key: string) {
    return this.model?.formGroup.controls[key] as FormControl;
  }

  save() {
    if (this.dialogRef) {
      if (this.model?.formGroup.valid) {
        this.dialogRef.close(this.model?.formGroup.value);
      }
    } else {
      this.emitter.emit(this.model?.formGroup.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
