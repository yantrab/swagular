
import Ajv from 'ajv';
import {FormBuilderTypeSafe, FormGroupTypeSafe} from 'angular-typesafe-reactive-forms-helper';
import {FormControl} from '@angular/forms';
import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {FormModel} from './components/form/formModel';
@Injectable()
export class SwagularService {
  ajvFormatToHtml: any = { time: 'time', date: 'date', dateTime: 'datetime-local', email: 'email', uri: 'url' };

  constructor( private ajv: Ajv, private fb: FormBuilderTypeSafe) { }

  private getPropertyType(prop: any): string {
    if (prop.enum) { return 'select'; }
    if (prop.type === 'array') { return 'multi-select'; }
    return this.ajvFormatToHtml[prop.format] || prop.type;
  }

  getFormModel<T>(schema: any, options?: Partial<FormModel<T>> & { displayProperties?: (keyof T & string)[] }, value?: T): FormModel<T> {
    const optionFields = _.keyBy(options?.fields, 'key');
    const properties: any[] = Object.keys(schema.properties).map(key => ({ key, ...schema.properties[key] }));
    const userFormModel: FormModel<T> = {
      formGroup: options?.formGroup || this.getFormGroup(schema, value),
      formSaveButtonTitle: options?.formSaveButtonTitle || 'Save',
      formCancelButtonTitle: options?.formCancelButtonTitle || 'Cancel',
      formTitle: options?.formTitle,
      appearance: options?.appearance,
      fields: _(properties)
        .filter((p: any) => !p.key.startsWith('_') && (!options?.displayProperties || options.displayProperties.includes(p.key)))
        .orderBy((p: { key: keyof T & string; }) => options?.displayProperties?.findIndex(prop => prop === p.key))
        .map(
            (p: { key: string; enum: any[]; }) =>
            optionFields[p.key] || {
              key: p.key,
              label: p.key.charAt(0).toUpperCase() + p.key.slice(1).replace(/([A-Z])/g, ($1: string) => ' ' + $1),
              type: this.getPropertyType(p),
              options: p.enum?.map((key: any) => ({ title: key, value: key })) // TODO array
            }
        )
        .value() as any
    };
    return userFormModel;
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
          Object.keys(formGroup.value).forEach(key => {
            // @ts-ignore
            value = formGroup.value[key];
            if (typeof value === 'string') {
              // @ts-ignore
              value = value.trim();
            }
            if (!value) { value = undefined; }
            // @ts-ignore
            formGroup.value[key] = value;
          });
          const isValid = validate(formGroup.value);
          if (isValid) { return null; }
          const result: any = {};
          const errors = validate.errors;
          errors?.forEach((error: any) => {
            const key = error.dataPath.replace('/', '') || error.params.missingProperty;
            result[key] = error.message;
            formControls[key].setErrors([error.message]);
          });
          return result;
        }
      ]
    });
  }
}
