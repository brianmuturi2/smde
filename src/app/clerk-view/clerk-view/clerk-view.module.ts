import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClerkViewRoutingModule } from './clerk-view-routing.module';
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
import { ClerkViewBaseComponent } from '../containers/clerk-view-base/clerk-view-base.component';
import { ClerkViewSidemenuComponent } from '../containers/clerk-view-sidemenu/clerk-view-sidemenu.component';
import { DynamicFormModule } from '../../dynamic-form/dynamic-form/dynamic-form.module';
import { SharedModule } from '../../common-module/common-module/common-module.module';
import { ClerkDocumentDetailsComponent } from '../clerk-document-details/clerk-document-details.component';
@NgModule({
  declarations: [
    UploadFileComponent,
    SafePipe,
    UploadedDocumentsComponent,
    RejectedDocumentsComponent,
    ApprovedDocumentsComponent,
    DocumentPreviewComponent,
    PendingDocumentsComponent,
    ClerkDashboardComponent,
    ClerkViewBaseComponent,
    ClerkViewSidemenuComponent,
    ClerkDocumentDetailsComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    DynamicFormModule,
    SharedModule,
    ReactiveFormsModule,DataTablesModule,
    ClerkViewRoutingModule
  ]
})
export class ClerkViewModule { }
