import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicNestedFormRoutingModule } from './dynamic-nested-form-routing.module';
import { DynamicNestedFormComponent } from './dynamic-nested-form/dynamic-nested-form.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [DynamicNestedFormComponent],
  exports:[DynamicNestedFormComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    DynamicNestedFormRoutingModule
  ]
})
export class DynamicNestedFormModule { }
