import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { SwagularComponentModule } from 'swagular/components/src/component.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './form/form.component';
import { SwagularModule } from 'swagular/src/swagular.module';

@NgModule({
  declarations: [AppComponent, TableComponent, FormComponent],
  imports: [
    BrowserModule,
    SwagularComponentModule,
    BrowserAnimationsModule,
    SwagularModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
