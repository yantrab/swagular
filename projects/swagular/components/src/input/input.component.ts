import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { InputModel } from '../models/input.model';

@Component({
  selector: 'swagular-input',
  templateUrl: `./input.component.html`,
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
  @Input() model?: InputModel;
  @Input() control?: FormControl;
  hidePassword = true;

  constructor() {}

  get label(): string | undefined {
    return this.model?.label;
  }

  get hint(): string | undefined {
    return this.model?.hint;
  }

  get type(): string {
    return this.model?.type || 'text';
  }

  get appearance(): MatFormFieldAppearance | undefined {
    return this.model?.appearance;
  }

  ngOnInit(): void {}
}
