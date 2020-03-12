import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFormRoutingModule } from './dynamic-form-routing.module';
import { DynamicInputComponent } from '../dynamic-input/dynamic-input.component';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFieldDirective } from '../dynamic-field.directive';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [DynamicFieldDirective,DynamicInputComponent, DynamicFormComponent],
  imports: [
    CommonModule,
    DynamicFormRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    DynamicFieldDirective,
    DynamicFormComponent
  ],
  entryComponents: [
    DynamicInputComponent
  ]
})
export class DynamicFormModule { }
