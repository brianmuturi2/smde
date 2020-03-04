import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { NgxPermissionsModule } from 'ngx-permissions';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from "ngx-spinner";
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AdministrationManagementBaseComponent } from '../../administration/containers/administration-management-base/administration-management-base.component';


// import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [],
  imports: [
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
    CollapseModule,
    CommonModule,
    PerfectScrollbarModule,
    TabsModule,
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    BsDatepickerModule,
    NgxSpinnerModule,
    AlertModule,
    
  ],
  exports:[
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
    CollapseModule,
    CommonModule,
    PerfectScrollbarModule,
    TabsModule,
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    BsDatepickerModule,
    NgxSpinnerModule,
    AlertModule,
    ModalModule


  ]
})
export class SharedModule { }

