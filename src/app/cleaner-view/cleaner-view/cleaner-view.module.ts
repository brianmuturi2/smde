import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../common-module/common-module/common-module.module';
import { CleanerViewRoutingModule } from './cleaner-view-routing.module';
import { CleanerCaptureDataComponent } from '../cleaner-capture-data/cleaner-capture-data.component';
import { DynamicFormModule } from '../../dynamic-form/dynamic-form/dynamic-form.module';
import { ReceiveFileComponent } from '../receive-file/receive-file.component';
import { DynamicNestedFormModule } from '../../dynamic-nested-form/dynamic-nested-form.module';
@NgModule({
  declarations: [
    CleanerCaptureDataComponent,
    ReceiveFileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CleanerViewRoutingModule,
    DynamicFormModule,
    DynamicNestedFormModule
  ]
})
export class CleanerViewModule { }
