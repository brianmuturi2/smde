import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffregistrationComponent } from '../../staffregistration/staffregistration.component';
import { StafflistingComponent } from '../../stafflisting/stafflisting.component';
import { RevokeDocumentComponent } from '../../revoke-document/revoke-document.component';
import { StaffDetailsComponent } from '../../staff-details/staff-details.component';
import { AuthenticationGuard } from '../../../authentication/guards/authguard.guard';

const routes: Routes = [
  
  {
    path: 'staff-registration',
    component: StaffregistrationComponent,
    data: {
      title: 'Staff Registration'
    },
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'staff-listing',
    component: StafflistingComponent,
    data: {
      title: 'Staff Listing'
    },
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'staff-details/:id',
    component: StaffDetailsComponent,
    data: {
      title: 'Staff Details'
    },
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'revoke-document',
    component: RevokeDocumentComponent,
    data: {
      title: 'Revoke Document'
    },
    canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
