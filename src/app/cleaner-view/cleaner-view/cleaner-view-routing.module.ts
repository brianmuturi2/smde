import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileSearchComponent } from '../file-search/file-search.component';
import { CleanerViewBaseComponent } from '../containers/cleaner-view-base/cleaner-view-base.component';
import { CleanerViewSidemenuComponent } from '../containers/cleaner-view-sidemenu/cleaner-view-sidemenu.component';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { CleanerCaptureDataComponent } from '../cleaner-capture-data/cleaner-capture-data.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
const routes: Routes = [
  {
    path: '',
    component:  CleanerViewBaseComponent,

    children: [
  {
    path: 'cleaner-dashboard',
    component: FileSearchComponent,
    data: {
      title: 'Cleaner Dashboard',
      extraParameter: 'dashboardMenu',
      permissions: {
      only: ['DATA_ClEANER'],
        redirectTo: '/500'
          }
    },
    canActivate: [AuthenticationGuard, NgxPermissionsGuard],
  },
  // {
  //   path: 'file-search',
  //   component: FileSearchComponent,
  //   data: {
  //     title: 'File Search',
  //     // permissions: {
  //     //   only: ['DATA_CLERK'],
  //     //     redirectTo: '/500'
  //     //       }
  //   },
  //   // canActivate: [AuthenticationGuard],
  // },
  {
    path: 'capture-data',
    component: CleanerCaptureDataComponent,
    data: {
      title: 'Document Capture',
      // permissions: {
      //   only: ['DATA_CLERK'],
      //     redirectTo: '/500'
      //       }
    },
    // canActivate: [AuthenticationGuard],
  },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CleanerViewRoutingModule { }
