import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { DynamicFormModule } from '../../dynamic-form/dynamic-form/dynamic-form.module'
import { RegisterAccountComponent } from '../register-account/register-account.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [RegisterAccountComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule ,
    DynamicFormModule,
    SupportRoutingModule
  ]
})
export class SupportModule { }
