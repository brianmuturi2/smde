import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidatorRejectedDocumentsComponent } from '../../validator-rejected-documents/validator-rejected-documents.component';
import { ValidatorPendingValidationDocumentsComponent } from '../../validator-pending-validation-documents/validator-pending-validation-documents.component';
import { ValidatorApprovedDocumentsComponent } from '../../validator-approved-documents/validator-approved-documents.component';
import { ValidatorAnalyticsComponent } from '../../validator-analytics/validator-analytics.component';
import { ValidatorViewBaseComponent } from '../../containers/validator-view-base/validator-view-base.component';
import { ValidatorDocumentDetailsComponent } from '../../validator-document-details/validator-document-details.component';

import { AuthenticationGuard } from '../../../authentication/guards/authguard.guard';

const routes: Routes = [
  {
    path: '',
    component: ValidatorViewBaseComponent,
    data: {
      
    },
    children: [
  {
    path: 'analytics',
    component: ValidatorAnalyticsComponent,
    data: {
      title: 'Validator Analytics',
      permissions: {
        only: ['DATA_ANALYST'],
          redirectTo: '/500'
          }
    },
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'pending-documents',
    component: ValidatorPendingValidationDocumentsComponent,
    data: {
      title: 'Pending Validation Documents',
      permissions: {
        only: ['DATA_ANALYST'],
          redirectTo: '/500'
          }
    },
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'rejected-documents',
    component: ValidatorRejectedDocumentsComponent,
    data: {
      title: 'Rejected Documents',
      permissions: {
        only: ['DATA_ANALYST'],
          redirectTo: '/500'
          }
    },
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'approved-documents',
    component: ValidatorApprovedDocumentsComponent,
    data: {
      title: 'Approved Documents',
      permissions: {
        only: ['DATA_ANALYST'],
          redirectTo: '/500'
          }
    },
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'validator-document-details/:id',
    component: ValidatorDocumentDetailsComponent,
    data: {
      title: 'Document Details',
      permissions: {
        only: ['DATA_ANALYST'],
          redirectTo: '/500'
          }
    },
    canActivate: [AuthenticationGuard],
  },
]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidatorRoutingModule { }
