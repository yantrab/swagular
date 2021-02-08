import {FormGroupTypeSafe} from 'angular-typesafe-reactive-forms-helper';
import {InputModel} from '../input/input.model';

export interface FormModel<T = any> {
    formGroup: FormGroupTypeSafe<T>;
    fields: Array<InputModel<T>>;
    appearance?: 'legacy' | 'standard' | 'fill' | 'outline';
    formTitle?: string;
    formSaveButtonTitle?: string;
    formCancelButtonTitle?: string;
}
