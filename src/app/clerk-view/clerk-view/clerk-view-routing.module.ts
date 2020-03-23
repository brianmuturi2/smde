import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadFileComponent } from '../upload-file/upload-file.component';

import { DocumentPreviewComponent} from '../document-preview/document-preview.component';
import { UploadedDocumentsComponent } from '../uploaded-documents/uploaded-documents.component';
import { RejectedDocumentsComponent } from '../rejected-documents/rejected-documents.component';
import { ApprovedDocumentsComponent } from '../approved-documents/approved-documents.component';
import { PendingDocumentsComponent } from '../pending-documents/pending-documents.component';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ClerkDashboardComponent } from '../data-clerks/clerk-dashboard/clerk-dashboard.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'upload-file',
    pathMatch: 'full',
  },
  {
    path: 'clerk-dashboard',
    component: ClerkDashboardComponent,
    data: {
      title: 'Clerk Dashboard'
    },
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'upload-file',
    component: UploadFileComponent,
    data: {
      title: 'Upload New Document'
    },
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'document-preview/:id',
    component: DocumentPreviewComponent,
    data: {
      title: 'Preview Document'
    },
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'pending-validation',
    component: PendingDocumentsComponent,
    data: {
      title: 'Pending Validation Documents'
    },
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'my-document',
    component: UploadedDocumentsComponent,
    data: {
      title: 'Uploaded Documents'
    },
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'rejected',
    component: RejectedDocumentsComponent,
    data: {
      title: 'Rejected Documents'
    },
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'approved',
    component: ApprovedDocumentsComponent,
    data: {
      title: 'Approved Documents'
    },
    canActivate: [AuthenticationGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClerkViewRoutingModule { }
