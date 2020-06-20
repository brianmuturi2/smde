import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicNestedFormRoutingModule } from './dynamic-nested-form-routing.module';
import { DynamicNestedFormComponent } from './dynamic-nested-form/dynamic-nested-form.component';
import { SharedModule } from '../common-module/common-module/common-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeysPipe } from '../common-module/shared-pipes/key.pipe';
@NgModule({
  declarations: [DynamicNestedFormComponent, KeysPipe],
  exports: [DynamicNestedFormComponent, KeysPipe],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    DynamicNestedFormRoutingModule
  ]
})
export class DynamicNestedFormModule { }
