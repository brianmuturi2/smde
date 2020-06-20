import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { DataClerkAnalyticsComponent } from '../data-clerk-analytics/data-clerk-analytics.component';
import { DataAnalystAnalyticsComponent } from '../data-analyst-analytics/data-analyst-analytics.component';
import { DocumentAnalyticsComponent } from '../document-analytics/document-analytics.component';
import { DepartmentAnalyticsComponent } from '../department-analytics/department-analytics.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
const routes: Routes = [

      {
        path: 'data-clerk-analytics',
        component: DataClerkAnalyticsComponent,
        data: {
          title: 'Data Clerk Analytics',
          permissions: {
            only: ['BUSINESS_ANALYST'],
              redirectTo: '/500'
              }
        },
        canActivate: [AuthenticationGuard, NgxPermissionsGuard],
      },
      {
        path: 'data-validator-analytics',
        component: DataAnalystAnalyticsComponent,
        data: {
          title: 'Data Validator Analytics',
          permissions: {
            only: ['BUSINESS_ANALYST'],
              redirectTo: '/500'
              }
        },
        canActivate: [AuthenticationGuard, NgxPermissionsGuard],
      },
      {
        path: 'data-document-analytics',
        component: DocumentAnalyticsComponent,
        data: {
          title: 'Documents By Status Analytics',
          permissions: {
            only: ['BUSINESS_ANALYST'],
              redirectTo: '/500'
              }
        },
        canActivate: [AuthenticationGuard, NgxPermissionsGuard],
      },
      {
        path: 'data-department-analytics',
        component: DepartmentAnalyticsComponent,
        data: {
          title: 'Data Department Analytics',
          permissions: {
            only: ['BUSINESS_ANALYST'],
              redirectTo: '/500'
              }
        },
        canActivate: [AuthenticationGuard, NgxPermissionsGuard],
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessanalystRoutingModule { }


