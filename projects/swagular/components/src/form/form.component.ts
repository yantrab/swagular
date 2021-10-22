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
import { LocaleService } from '../locale.service';
import { identity, pickBy } from 'lodash-es';

@Component({
  selector: 'swagular-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  @Input() model?: FormModel & { locale?: any };
  @Output() save = new EventEmitter();
  @Input() showSaveButton = true;
  constructor(
    @Optional() public dialogRef: MatDialogRef<FormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: FormModel,
    @Optional() private localeService?: LocaleService
  ) {
    if (data) {
      this.model = data;
    }
  }

  ngOnInit() {
    if (this.localeService) {
      this.localeService.locale.subscribe((locale) => {
        if (locale) {
          this.init();
        }
      });
    }
  }
  async init() {
    if (!this.model) {
      return;
    }
    if (this.model.localePath && this.localeService) {
      const locale = await this.localeService.getLocaleItem(
        this.model?.localePath
      );
      this.model = Object.assign(locale, pickBy(this.model, identity), {});
      if (!this.model) {
        return;
      }

      this.model.fields.forEach((f, i) => {
        if (!this.model) {
          return;
        }
        this.model.fields[i] = Object.assign(
          locale[f.key] || {},
          pickBy(f, identity),
          {}
        );
      });
    }

    this.model.formSaveButtonTitle = this.model.formSaveButtonTitle || 'Save';
    this.model.formCancelButtonTitle =
      this.model.formCancelButtonTitle || 'Cancel';
    this.model.fields.forEach((f) => {
      f.label =
        f.label ||
        f.key.charAt(0).toUpperCase() +
          f.key.slice(1).replace(/([A-Z])/g, ($1: string) => ' ' + $1);
    });
  }

  getControl(key: string) {
    return this.model?.formGroup.controls[key] as FormControl;
  }

  onSave() {
    if (this.dialogRef) {
      if (this.model?.formGroup.valid) {
        this.dialogRef.close(this.model?.formGroup.value);
      }
    } else {
      this.save.emit(this.model?.formGroup.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
