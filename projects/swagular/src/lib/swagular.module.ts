import { NgModule } from '@angular/core';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import {FormBuilderTypeSafe} from 'angular-typesafe-reactive-forms-helper';
import {SwagularService} from './swagular.service';
const ajv = new Ajv({ allErrors: true, $data: true });
addFormats(ajv);

@NgModule({
  imports: [  ],
  exports: [  ],
  providers: [ SwagularService, FormBuilderTypeSafe, {provide: Ajv, useValue: ajv} ]
})
export class SwagularModule { }
