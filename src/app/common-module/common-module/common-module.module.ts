import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule
} from 'ng-pick-datetime';
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
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AdministrationManagementBaseComponent } from '../../administration/containers/administration-management-base/administration-management-base.component';
import { CommonErrorComponent } from '../../containers/common-error/common-error.component';
import { CommonHeaderComponent } from '../../containers/common-header/common-header.component';
import { CommonLoaderComponent } from '../../containers/common-loader/common-loader.component';
import { CommonFooterComponent } from '../../containers/common-footer/common-footer.component';
import { CommonProfileComponent } from '../../containers/common-profile/common-profile.component';
// import { ToastrModule } from 'ngx-toastr';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DatePipe } from '@angular/common';
export const MY_CUSTOM_FORMATS = {
  fullPickerInput: 'YYYY-MM-DD HH:mm:ss',
  parseInput: 'YYYY-MM-DD HH:mm:ss',
  datePickerInput: 'YYYY-MM-DD HH:mm:ss',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'
  };
import { SafePipe } from '../../safepipe';

import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
@NgModule({
  declarations: [CommonErrorComponent, CommonLoaderComponent,
    CommonFooterComponent, CommonHeaderComponent, CommonProfileComponent, SafePipe],
  imports: [
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
    CollapseModule.forRoot(),
    CommonModule,
    PerfectScrollbarModule,
    TabsModule, NgxPermissionsModule,
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BsDatepickerModule,
    NgxSpinnerModule,
    AlertModule,
    ModalModule,

  ],
  exports: [
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
    CollapseModule,
    CommonModule,
    NgxPermissionsModule,
    PerfectScrollbarModule,
    TabsModule,
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    BsDatepickerModule,
    NgxSpinnerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AlertModule,
    ModalModule,
    CommonErrorComponent,
    CommonLoaderComponent,
    CommonFooterComponent, CommonHeaderComponent,
    CommonProfileComponent,
SafePipe


  ],
  providers: [
    DatePipe
    ]

})
export class SharedModule { }

