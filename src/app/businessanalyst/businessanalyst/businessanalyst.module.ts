import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessanalystRoutingModule } from './businessanalyst-routing.module';

import { DataClerkAnalyticsComponent } from '../data-clerk-analytics/data-clerk-analytics.component';
import { DataAnalystAnalyticsComponent } from '../data-analyst-analytics/data-analyst-analytics.component';
import { DocumentAnalyticsComponent } from '../document-analytics/document-analytics.component';
import { DepartmentAnalyticsComponent } from '../department-analytics/department-analytics.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../../common-module/common-module/common-module.module';
@NgModule({
  declarations: [DataClerkAnalyticsComponent, DataAnalystAnalyticsComponent,
    DocumentAnalyticsComponent, DepartmentAnalyticsComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    ReactiveFormsModule, DataTablesModule,
    BusinessanalystRoutingModule
  ]
})
export class BusinessanalystModule { }
