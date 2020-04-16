import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidatorRoutingModule } from './validator-routing.module';
import { ValidatorRejectedDocumentsComponent } from '../../validator-rejected-documents/validator-rejected-documents.component';
import { ValidatorPendingValidationDocumentsComponent } from '../../validator-pending-validation-documents/validator-pending-validation-documents.component';
import { ValidatorApprovedDocumentsComponent } from '../../validator-approved-documents/validator-approved-documents.component';
import { ValidatorAnalyticsComponent } from '../../validator-analytics/validator-analytics.component';
import { ValidatorDocumentDetailsComponent } from '../../validator-document-details/validator-document-details.component';
import { SharedModule } from '../../../common-module/common-module/common-module.module';
import { ValidatorViewBaseComponent } from '../../containers/validator-view-base/validator-view-base.component';
import { ValidatorViewSidemenuComponent } from '../../containers/validator-view-sidemenu/validator-view-sidemenu.component';
import { DynamicFormModule } from '../../../dynamic-form/dynamic-form/dynamic-form.module';

@NgModule({
  declarations: [ValidatorViewBaseComponent, ValidatorViewSidemenuComponent,
    ValidatorRejectedDocumentsComponent, ValidatorPendingValidationDocumentsComponent, ValidatorApprovedDocumentsComponent, ValidatorAnalyticsComponent, ValidatorDocumentDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    DynamicFormModule,
    ValidatorRoutingModule
  ]
})
export class ValidatorModule { }
