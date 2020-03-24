import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffregistrationComponent } from '../../staffregistration/staffregistration.component';
import { StafflistingComponent } from '../../stafflisting/stafflisting.component';
import { RevokeDocumentComponent } from '../../revoke-document/revoke-document.component';
import { StaffDetailsComponent } from '../../staff-details/staff-details.component';
import { AuthenticationGuard } from '../../../authentication/guards/authguard.guard';
import { AdministrationManagementBaseComponent } from '../../containers/administration-management-base/administration-management-base.component';
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
        canActivate: [AuthenticationGuard],
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
        canActivate: [AuthenticationGuard],
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
        canActivate: [AuthenticationGuard],
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
        canActivate: [AuthenticationGuard],
      },

      
    ]
  },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
