import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormModel } from '../models/form.model';
import { LocaleService } from 'swagular/components/src/locale.service';

@Component({
  selector: 'swagular-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input() model?: FormModel & { locale?: any };
  @Output() emitter = new EventEmitter();

  constructor(
    @Optional() public dialogRef: MatDialogRef<FormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: FormModel,
    @Optional() private localeService?: LocaleService
  ) {
    if (data) {
      this.model = data;
    }
    if (this.localeService) {
      this.localeService.locale.subscribe((locale) => {
        if (locale) {
          this.init();
        }
      });
    }
  }

  init() {
    if (this.model?.localePath) {
      const locale = this.localeService?.getLocaleItem(this.model?.localePath);
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
