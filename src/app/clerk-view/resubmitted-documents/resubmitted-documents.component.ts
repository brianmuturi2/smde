
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import {SurveyService } from '../services/survey.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { clerk_resubmitted_url } from '../../app.constants';
import { Subject } from 'rxjs';
import { DocumentsList } from '../interfaces/survey';
import { Router } from '@angular/router';
@Component({
  selector: 'app-resubmitted-documents',
  templateUrl: './resubmitted-documents.component.html',
  styleUrls: ['./resubmitted-documents.component.scss']
})
export class ResubmittedDocumentsComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  public dtTrigger = new Subject<any>();
  records: DocumentsList[] = [];
  searchString: string;
  constructor(private router: Router, private loadingService: LoadingService,
     public toastService: ToastService, public surveyService: SurveyService, ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      retrieve: true,



    };
    this.fetchRecords();
  }

  fetchRecords() {
    this.loadingService.showloading();
     this.surveyService.getrecord(clerk_resubmitted_url).subscribe((res) => {
       this.records = res;
       this.loadingService.hideloading();

       this.dtTrigger.next();

     }, (err) => {
       this.loadingService.hideloading();

     });
   }
   rerenderTable(): void {
     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       // Destroy the table first
       dtInstance.destroy();
     });
   }
   capture_metadata(file_id) {
     this.router.navigate(['clerk-view/document-detail', file_id]);

   }

}

