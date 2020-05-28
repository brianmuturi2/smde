import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadFileComponent } from '../upload-file/upload-file.component';

import { DocumentPreviewComponent} from '../document-preview/document-preview.component';
import { UploadedDocumentsComponent } from '../uploaded-documents/uploaded-documents.component';
import { RejectedDocumentsComponent } from '../rejected-documents/rejected-documents.component';
import { ApprovedDocumentsComponent } from '../approved-documents/approved-documents.component';
import { PendingDocumentsComponent } from '../pending-documents/pending-documents.component';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { ClerkGuard } from '../../authentication/guards/clerk.guard';
import { ClerkDashboardComponent } from '../data-clerks/clerk-dashboard/clerk-dashboard.component';
import { ClerkViewBaseComponent } from '../containers/clerk-view-base/clerk-view-base.component';
import { ClerkDocumentDetailsComponent } from '../clerk-document-details/clerk-document-details.component';
import { ClerkViewSidemenuComponent } from '../containers/clerk-view-sidemenu/clerk-view-sidemenu.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ResubmittedDocumentsComponent } from '../resubmitted-documents/resubmitted-documents.component';
const routes: Routes = [
  {
    path: '',
    component: ClerkViewBaseComponent,
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],

    children: [
  {
    path: 'clerk-dashboard',
    component: ClerkDashboardComponent,
    data: {
      title: 'Clerk Dashboard',
      extraParameter: 'dashboardMenu',
      permissions: {
      only: ['DATA_CLERK'],
        redirectTo: '/500'
          }
    },
   canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'upload-file',
    component: UploadFileComponent,
    data: {
      title: 'Upload New Document',
      permissions: {
        only: ['DATA_CLERK'],
          redirectTo: '/500'
            }
    },
   canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'document-preview/:id',
    component: DocumentPreviewComponent,
    data: {
      title: 'Preview Document',
      permissions: {
        only: ['DATA_CLERK'],
          redirectTo: '/500'
            }
    },
   canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'document-detail/:id',
    component: ClerkDocumentDetailsComponent,
    data: {
      title: 'Document Detail',
      permissions: {
        only: ['DATA_CLERK'],
          redirectTo: '/500'
            }
    },
   canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'pending-validation',
    component: PendingDocumentsComponent,
    data: {
      title: 'Pending Validation Documents',
      permissions: {
        only: ['DATA_CLERK'],
          redirectTo: '/500'
            }
    },
   canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'my-document',
    component: UploadedDocumentsComponent,
    data: {
      title: 'Uploaded Documents',
      permissions: {
        only: ['DATA_CLERK'],
          redirectTo: '/500'
            }
    },
   canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'rejected-documents',
    component: RejectedDocumentsComponent,
    data: {
      title: 'Rejected Documents',
      permissions: {
        only: ['DATA_CLERK'],
          redirectTo: '/500'
            }
    },
   canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'resubmitted-documents',
    component: ResubmittedDocumentsComponent,
    data: {
      title: 'Resubmitted Documents',
      permissions: {
        only: ['DATA_CLERK'],
          redirectTo: '/500'
            }
    },
   canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },

  {
    path: 'approved-documents',
    component: ApprovedDocumentsComponent,
    data: {
      title: 'Approved Documents',
      permissions: {
        only: ['DATA_CLERK'],
          redirectTo: '/500'
            }
    },
   canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClerkViewRoutingModule { }
