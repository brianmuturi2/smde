import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditorViewRoutingModule } from './auditor-view-routing.module';
import { AuditorViewBaseComponent } from './containers/auditor-view-base/auditor-view-base.component';
import { AuditorViewSidemenuComponent } from './containers/auditor-view-sidemenu/auditor-view-sidemenu.component';
import { PendingDocumentsComponent } from './pending-documents/pending-documents.component';
import { ValidateDocumentComponent } from './validate-document/validate-document.component';

import { SharedModule } from '../common-module/common-module/common-module.module';
@NgModule({
  declarations: [AuditorViewBaseComponent, AuditorViewSidemenuComponent, PendingDocumentsComponent, ValidateDocumentComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuditorViewRoutingModule
  ]
})
export class AuditorViewModule { }
