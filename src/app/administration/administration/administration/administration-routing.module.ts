import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffregistrationComponent } from '../../staffregistration/staffregistration.component';
import { StafflistingComponent } from '../../stafflisting/stafflisting.component';
import { RevokeDocumentComponent } from '../../revoke-document/revoke-document.component';
import { StaffDetailsComponent } from '../../staff-details/staff-details.component';
import { AdministrationManagementBaseComponent } from '../../containers/administration-management-base/administration-management-base.component';
import { DepartmentListingComponent } from '../../department-management/department-listing/department-listing.component';
import { DocumentTypeListingComponent } from '../../department-management/document-type-listing/document-type-listing.component';
import { DocumentFieldListingComponent } from '../../department-management/document-field-listing/document-field-listing.component';

import { ChangePasswordGuard } from '../../../authentication/guards/change-password.guard';
import { AuthenticationGuard } from '../../../authentication/guards/authguard.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';
const routes: Routes = [
  {
    path: '',
    component: AdministrationManagementBaseComponent,
    data: {
      title: 'Administration Home'
    },
    children: [
      {
        path: 'staff-registration',
        component: StaffregistrationComponent,
        data: {
          title: 'Staff Registration',
          permissions: {
            only: ['DATA_DEPARTMENT_HEAD'],
              redirectTo: '/500'
              }
        },
       canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
      },
      {
        path: 'staff-listing',
        component: StafflistingComponent,
        data: {
          title: 'Staff Listing',
          permissions: {
            only: ['DATA_DEPARTMENT_HEAD'],
              redirectTo: '/500'
              }
        },
       canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
      },
      {
        path: 'staff-details/:id',
        component: StaffDetailsComponent,
        data: {
          title: 'Staff Details',
          permissions: {
            only: ['DATA_DEPARTMENT_HEAD'],
              redirectTo: '/500'
              }
        },
       canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
      },
      {
        path: 'revoke-document',
        component: RevokeDocumentComponent,
        data: {
          title: 'Revoke Document',
          permissions: {
            only: ['DATA_DEPARTMENT_HEAD'],
              redirectTo: '/500'
              }
        },
       canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
      },
      {
        path: 'department-listing',
        component: DepartmentListingComponent,
        data: {
          title: 'Department Listing',
          permissions: {
            only: ['DATA_DEPARTMENT_HEAD'],
              redirectTo: '/500'
              }
        },
       canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
      },
      {
        path: 'document-type-listing/:department_id',
        component: DocumentTypeListingComponent,
        data: {
          title: 'Document Type Listing',
          permissions: {
            only: ['DATA_DEPARTMENT_HEAD'],
              redirectTo: '/500'
              }
        },
       canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
      },
      {
        path: 'document-field-listing/:department_id/:document_type_id',
        component: DocumentFieldListingComponent,
        data: {
          title: 'Document Field Listing',
          permissions: {
            only: ['DATA_DEPARTMENT_HEAD'],
              redirectTo: '/500'
              }
        },
       canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
      },



    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
