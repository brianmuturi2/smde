import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { RegisterAccountComponent } from '../register-account/register-account.component';
const routes: Routes = [
  {
    path: 'register-account',
    component: RegisterAccountComponent,
    data: {
      title: 'Register Account'
    },
    canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
