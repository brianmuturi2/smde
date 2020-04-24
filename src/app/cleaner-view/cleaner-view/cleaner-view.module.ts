import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../common-module/common-module/common-module.module';
import { CleanerViewRoutingModule } from './cleaner-view-routing.module';
import { FileSearchComponent } from '../file-search/file-search.component';
import { CleanerViewBaseComponent } from '../containers/cleaner-view-base/cleaner-view-base.component';
import { CleanerViewSidemenuComponent } from '../containers/cleaner-view-sidemenu/cleaner-view-sidemenu.component';
import { CleanerCaptureDataComponent } from '../cleaner-capture-data/cleaner-capture-data.component';
import { DynamicFormModule } from '../../dynamic-form/dynamic-form/dynamic-form.module';

@NgModule({
  declarations: [FileSearchComponent,
    CleanerViewBaseComponent,
    CleanerViewSidemenuComponent, CleanerCaptureDataComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CleanerViewRoutingModule,
    DynamicFormModule
  ]
})
export class CleanerViewModule { }
