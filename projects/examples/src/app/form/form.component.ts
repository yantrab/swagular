import { Component, OnInit } from '@angular/core';
import { FormModel } from 'swagular/components/src/models/form.model';
import { SwagularService } from 'swagular/src/swagular.service';

export declare type SetPasswordFormGroupType = {
  rePassword: string;
  password: string;
  email: string;
};
export const setPasswordFormGroupSchema = {
  properties: {
    rePassword: {
      type: 'string',
      minLength: 6,
      const: { $data: '1/password' },
    },
    password: { type: 'string', minLength: 6 },
    email: { format: 'email', type: 'string' },
  },
  type: 'object',
  required: ['rePassword', 'password', 'email'],
};

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  model?: FormModel<SetPasswordFormGroupType>;

  constructor(private swagularService: SwagularService) {}

  setPasswordFormGroup(value?: SetPasswordFormGroupType) {
    return this.swagularService.getFormGroup<SetPasswordFormGroupType>(
      setPasswordFormGroupSchema,
      value
    );
  }

  ngOnInit(): void {
    this.model = {
      localePath: 'setPasswordForm',
      formGroup: this.setPasswordFormGroup(),
      formSaveButtonTitle: 'Save',
      fields: [
        { key: 'email' },
        { key: 'password', type: 'password', label: 'Password' },
        { key: 'rePassword', type: 'password', label: 'Insert Password Again' },
      ],
    };
  }
}
