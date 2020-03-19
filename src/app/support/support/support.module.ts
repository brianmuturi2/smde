import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { DynamicFormModule } from '../../dynamic-form/dynamic-form/dynamic-form.module'
import { RegisterAccountComponent } from '../register-account/register-account.component';
import { SharedModule } from '../../common-module/common-module/common-module.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [RegisterAccountComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule, ReactiveFormsModule ,
    DynamicFormModule,
    SupportRoutingModule
  ]
})
export class SupportModule { }
