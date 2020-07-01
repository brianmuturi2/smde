import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClerkViewRoutingModule } from './clerk-view-routing.module';
import { UploadFileComponent } from '../upload-file/upload-file.component';

import { DocumentPreviewComponent} from '../document-preview/document-preview.component';
import { UploadedDocumentsComponent } from '../uploaded-documents/uploaded-documents.component';
import { RejectedDocumentsComponent } from '../rejected-documents/rejected-documents.component';
import { ApprovedDocumentsComponent } from '../approved-documents/approved-documents.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PendingDocumentsComponent } from '../pending-documents/pending-documents.component';
import { ClerkDashboardComponent } from '../data-clerks/clerk-dashboard/clerk-dashboard.component';
import { DynamicFormModule } from '../../dynamic-form/dynamic-form/dynamic-form.module';
import { DynamicNestedFormModule } from '../../dynamic-nested-form/dynamic-nested-form.module';
import { SharedModule } from '../../common-module/common-module/common-module.module';
import { ClerkDocumentDetailsComponent } from '../clerk-document-details/clerk-document-details.component';
import { ResubmittedDocumentsComponent } from '../resubmitted-documents/resubmitted-documents.component';
@NgModule({
  declarations: [
    UploadFileComponent,

    UploadedDocumentsComponent,
    RejectedDocumentsComponent,
    ApprovedDocumentsComponent,
    DocumentPreviewComponent,
    PendingDocumentsComponent,
    ClerkDashboardComponent,
    ResubmittedDocumentsComponent,
    ClerkDocumentDetailsComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    DynamicFormModule,
    DynamicNestedFormModule,
    SharedModule,
    ReactiveFormsModule, DataTablesModule,
    ClerkViewRoutingModule
  ]
})
export class ClerkViewModule { }
