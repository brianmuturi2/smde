import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { StaffregistrationComponent } from '../../staffregistration/staffregistration.component';
import { StafflistingComponent } from '../../stafflisting/stafflisting.component';
import { RevokeDocumentComponent } from '../../revoke-document/revoke-document.component';
import { StaffDetailsComponent } from '../../staff-details/staff-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DataTablesModule } from 'angular-datatables';

import { SharedModule } from '../../../common-module/common-module/common-module.module';

import { DynamicFormModule } from '../../../dynamic-form/dynamic-form/dynamic-form.module';
import { DepartmentListingComponent } from '../../department-management/department-listing/department-listing.component';
import { DocumentTypeListingComponent } from '../../department-management/document-type-listing/document-type-listing.component';
import { DocumentFieldListingComponent } from '../../department-management/document-field-listing/document-field-listing.component';

@NgModule({
  declarations: [

    StaffregistrationComponent,
    StafflistingComponent,
    RevokeDocumentComponent,
    StaffDetailsComponent,
    DepartmentListingComponent,
    DocumentTypeListingComponent,
DocumentFieldListingComponent



  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    DynamicFormModule,
    ReactiveFormsModule, DataTablesModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
