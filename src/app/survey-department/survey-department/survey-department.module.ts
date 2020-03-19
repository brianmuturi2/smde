import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyDepartmentRoutingModule } from './survey-department-routing.module';
import { UploadFileComponent } from '../upload-file/upload-file.component';

import { DocumentPreviewComponent} from '../document-preview/document-preview.component';
import { UploadedDocumentsComponent } from '../uploaded-documents/uploaded-documents.component';
import { RejectedDocumentsComponent } from '../rejected-documents/rejected-documents.component';
import { ApprovedDocumentsComponent } from '../approved-documents/approved-documents.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SafePipe } from '../../safepipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PendingDocumentsComponent } from '../pending-documents/pending-documents.component';
import { ClerkDashboardComponent } from '../data-clerks/clerk-dashboard/clerk-dashboard.component';
import { DynamicFormModule } from '../../dynamic-form/dynamic-form/dynamic-form.module'
@NgModule({
  declarations: [
    UploadFileComponent,
    SafePipe,
    UploadedDocumentsComponent,
    RejectedDocumentsComponent,
    ApprovedDocumentsComponent,
    DocumentPreviewComponent,
    PendingDocumentsComponent,
    ClerkDashboardComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    DynamicFormModule,
    ReactiveFormsModule,DataTablesModule,
    SurveyDepartmentRoutingModule
  ]
})
export class SurveyDepartmentModule { }
