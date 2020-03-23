import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { CommonProfileComponent } from './containers/common-profile/common-profile.component';

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
    component: P500Component,
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
      }
    ]
  },
  
  {
    path: 'administration',
    loadChildren: () => import('./administration/administration/administration/administration.module').then(m => m.AdministrationModule)
  },

  {
    path: 'clerk-view',
    loadChildren: () => import('./clerk-view/clerk-view/clerk-view.module').then(m => m.ClerkViewModule)
  },
  {
    path: 'validator-view',
    loadChildren: () => import('./validator-view/validator/validator/validator.module').then(m => m.ValidatorModule)
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
