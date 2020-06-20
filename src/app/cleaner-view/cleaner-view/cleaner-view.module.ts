import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../common-module/common-module/common-module.module';
import { CleanerViewRoutingModule } from './cleaner-view-routing.module';
import { FileSearchComponent } from '../file-search/file-search.component';
import { CleanerCaptureDataComponent } from '../cleaner-capture-data/cleaner-capture-data.component';
import { DynamicFormModule } from '../../dynamic-form/dynamic-form/dynamic-form.module';

@NgModule({
  declarations: [FileSearchComponent,
    CleanerCaptureDataComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CleanerViewRoutingModule,
    DynamicFormModule
  ]
})
export class CleanerViewModule { }
