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
import { AdministrationManagementBaseComponent } from '../../containers/administration-management-base/administration-management-base.component';
import { AdministrationManagementSidemenuComponent } from '../../containers/administration-management-sidemenu/administration-management-sidemenu.component';
import { DynamicFormModule } from '../../../dynamic-form/dynamic-form/dynamic-form.module';
@NgModule({
  declarations: [
    AdministrationManagementBaseComponent,
    AdministrationManagementSidemenuComponent,
    StaffregistrationComponent,
    StafflistingComponent,
    RevokeDocumentComponent,
    StaffDetailsComponent



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
