import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../authentication/guards/authguard.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuditorViewBaseComponent } from './containers/auditor-view-base/auditor-view-base.component';
import { AuditorViewSidemenuComponent } from './containers/auditor-view-sidemenu/auditor-view-sidemenu.component';
import { ChangePasswordGuard } from '../authentication/guards/change-password.guard';
import { PendingDocumentsComponent } from './pending-documents/pending-documents.component';
import { ValidateDocumentComponent } from './validate-document/validate-document.component';
const routes: Routes = [
  {
    path: '',
    component: AuditorViewBaseComponent,
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
    children: [
  {
    path: 'pending-document',
    component: PendingDocumentsComponent,
    data: {
      title: 'Validator Analytics',
      permissions: {
        only: ['DATA_AUDITOR'],
          redirectTo: '/500'
          }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'validate-document',
    component: ValidateDocumentComponent,
    data: {
      title: 'File Audit',
      permissions: {
        only: ['DATA_AUDITOR'],
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
export class AuditorViewRoutingModule { }
