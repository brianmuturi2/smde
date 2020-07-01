import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { CleanerCaptureDataComponent } from '../cleaner-capture-data/cleaner-capture-data.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ReceiveFileComponent } from '../receive-file/receive-file.component';
const routes: Routes = [

  
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
  {
    path: 'receive-file',
    component: ReceiveFileComponent,
    data: {
      title: 'Receive File',
      // permissions: {
      //   only: ['DATA_CLERK'],
      //     redirectTo: '/500'
      //       }
    },
    // canActivate: [AuthenticationGuard],
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CleanerViewRoutingModule { }
