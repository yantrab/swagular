import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatFormFieldAppearance} from '@angular/material/form-field';
export type ValuesOf<T extends readonly any[]> = T[number];
// https://material.angular.io/components/input/overview
const materialInputTypes = [
  'color',
  'date',
  'datetime-local',
  'email',
  'month',
  'password',
  'search',
  'tel',
  'text',
  'time',
  'url',
  'week'
] as const;
export declare type InputType = ValuesOf<typeof materialInputTypes> | 'textarea' | 'select' | 'multi-select';
export declare type InputModel<T = any> = {
  key: keyof T & string;
  label?: string;
  appearance?: 'legacy' | 'standard' | 'fill' | 'outline';
  hint?: string;
  type?: InputType;
  options?: { value: any; title: string }[];
};

@Component({
  selector: 'swagular-input',
  templateUrl: `./input.component.html`,
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() model?: InputModel;
  @Input() control?: FormControl;
  hidePassword = true;

  constructor() {}
  ngOnInit(): void {}

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
}
