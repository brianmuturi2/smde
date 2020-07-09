import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { StaffregistrationComponent } from '../../staffregistration/staffregistration.component';
import { StafflistingComponent } from '../../stafflisting/stafflisting.component';
import { RevokeDocumentComponent } from '../../revoke-document/revoke-document.component';
import { StaffDetailsComponent } from '../../staff-details/staff-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { SharedModule } from '../../../common-module/common-module/common-module.module';

import { DynamicFormModule } from '../../../dynamic-form/dynamic-form/dynamic-form.module';
import { DepartmentListingComponent } from '../../department-management/department-listing/department-listing.component';
import { DocumentTypeListingComponent } from '../../department-management/document-type-listing/document-type-listing.component';
import { DocumentFieldListingComponent } from '../../department-management/document-field-listing/document-field-listing.component';
import { NotificationsComponent } from '../../communication/notifications/notifications.component';
import { DocumentSwapperComponent } from '../../document-swapper/document-swapper.component';
import { DynamicNestedFormModule } from '../../../dynamic-nested-form/dynamic-nested-form.module';
@NgModule({
  declarations: [

    StaffregistrationComponent,
    StafflistingComponent,
    RevokeDocumentComponent,
    StaffDetailsComponent,
    DepartmentListingComponent,
    DocumentTypeListingComponent,
DocumentFieldListingComponent,
NotificationsComponent,
DocumentSwapperComponent



  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    DynamicFormModule,DynamicNestedFormModule,
    ReactiveFormsModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
