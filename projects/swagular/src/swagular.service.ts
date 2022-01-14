import Ajv from 'ajv';
import {
  FormBuilderTypeSafe,
  FormGroupTypeSafe,
} from 'angular-typesafe-reactive-forms-helper';
import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { FormModel } from './models/form.model';
import { InputType } from './models/input.model';
import { keyBy } from 'lodash-es';

@Injectable()
export class SwagularService {
  ajvFormatToHtml: any = {
    time: 'time',
    date: 'date',
    dateTime: 'datetime-local',
    email: 'email',
    uri: 'url',
  };

  constructor(private ajv: Ajv, private fb: FormBuilderTypeSafe) {
    this.ajv.opts.strict = false;
  }

  addSchema(key: string, schema: any) {
    this.ajv.addSchema(schema, key);
  }

  getFormModel<T>(
    schema: any,
    options?: Partial<FormModel<T>> & {
      displayProperties?: (keyof T & string)[];
    },
    value?: T
  ): FormModel<T> {
    const displayProperties =
      options?.displayProperties ||
      options?.fields?.map((op) => op.key) ||
      Object.keys(schema.properties);
    const optionFields = keyBy(options?.fields, 'key');
    const result = {
      formGroup: options?.formGroup || this.getFormGroup(schema, value),
      localePath: options?.localePath,
      formSaveButtonTitle: options?.formSaveButtonTitle,
      formCancelButtonTitle: options?.formCancelButtonTitle,
      formTitle: options?.formTitle,
      appearance: options?.appearance,
      fields: displayProperties
        .filter((p) => !p.startsWith('_'))
        .map(
          (p) =>
            optionFields[p] || {
              key: p,
            }
        ),
    };
    result.fields.forEach((f) => {
      let s = schema.properties[f.key];

      if (s.$ref) {
        s = this.ajv.getSchema(s.$ref)?.schema;
      }
      f.type = f.type || this.getPropertyType(s);
      f.options =
        f.options ||
        s.enum?.map((key: any, i: number) => ({
          title: s['x-enumNames']?.[i] || key,
          value: key,
        })); // TODO array
    });
    return result;
  }

  getFormGroup<T>(schema: any, value?: T): FormGroupTypeSafe<T> {
    if (schema.$ref) {
      schema = this.ajv.getSchema(schema.ref);
    }
    const validate = this.ajv.compile(schema);
    const formControls: any = {};
    const keys = Object.keys(schema.properties);
    for (const key of keys) {
      formControls[key] = new FormControl(value && (value as any)[key]);
    }
    return this.fb.group<T>(formControls as any, {
      validators: [
        (formGroup: FormGroupTypeSafe<T>) => {
          Object.keys(formGroup.value).forEach((key) => {
            // @ts-ignore
            value = formGroup.value[key];

            // https://github.com/angular/angular/issues/13243
            if (schema.properties[key].type === 'number' && value !== undefined && value !== null) {
              try {
                // @ts-ignore
                value = +value;
              } catch {}
            }

            if (typeof value === 'string') {
              // @ts-ignore
              value = value.trim();
              if (!value) {
                value = undefined;
              }
            }

            // angular set null when no value, so we replace it to undefined
            if (value == null) {
              value = undefined;
            }

            // @ts-ignore
            formGroup.value[key] = value;
          });
          const isValid = validate(formGroup.value);
          if (isValid) {
            return null;
          }
          const result: any = {};
          const errors = validate.errors;
          errors?.forEach((error: any) => {
            const key =
              error.dataPath?.replace('/', '') || error.params.missingProperty;
            result[key] = error.message;
            formControls[key].setErrors([error.message]);
          });
          return result;
        },
      ],
    });
  }

  private getPropertyType(prop: any): InputType {
    if (prop.enum) {
      return 'select';
    }
    if (prop.type === 'array') {
      return 'multi-select';
    }
    return this.ajvFormatToHtml[prop.format] || prop.type;
  }
}
