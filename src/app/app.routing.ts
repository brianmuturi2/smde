import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P403Component } from './views/error/403.component';
import { CommonProfileComponent } from './containers/common-profile/common-profile.component';
import { AuthenticationGuard } from './authentication/guards/authguard.guard';
import { ChangePasswordGuard } from './authentication/guards/change-password.guard';
import { TrustComponent} from './validator-view/perpetual-succession-register/app.component';
import { SpecialComponent} from './validator-view/land-special/app.component';
export const routes: Routes = [
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P403Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication/authentication.module').then(m => m.AuthenticationModule
    )
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'profile',
        component: CommonProfileComponent,
        data: {
          title: 'Profile Details'
        }
      },
      {
        path: 'perpetual-succession-register',
        component: TrustComponent,
        data: {
          title: 'perpetual-succession-register'
        },
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },
      {
        path: 'land-special',
        component: SpecialComponent,
        data: {
          title: 'land-special'
        },
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },
      {
        path: 'landing',
        loadChildren:
        () => import('./landing/landing/landing.module').then(m => m.LandingModule),
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },
      {
        path: 'clerk-view',
        loadChildren:
        () => import('./clerk-view/clerk-view/clerk-view.module').then(m => m.ClerkViewModule),
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },
      {
        path: 'administration',
        loadChildren:
        () => import('./administration/administration/administration/administration.module').then(m => m.AdministrationModule),
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },
      {
        path: 'validator-view',
        loadChildren: () => import('./validator-view/validator/validator/validator.module').then(m => m.ValidatorModule),
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },
      {
        path: 'analyst-view',
        loadChildren: () => import('./businessanalyst/businessanalyst/businessanalyst.module').then(m => m.BusinessanalystModule),
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },
      {
        path: 'cleaner-view',
        loadChildren: () => import('./cleaner-view/cleaner-view/cleaner-view.module').then(m => m.CleanerViewModule),
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },
      {
        path: 'auditor-view',
        loadChildren: () => import('./auditor-view/auditor-view.module').then(m => m.AuditorViewModule),
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },
    ]
  },





  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [TrustComponent,SpecialComponent];
