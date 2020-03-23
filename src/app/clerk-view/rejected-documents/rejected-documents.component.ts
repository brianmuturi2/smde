import { Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import {SurveyService } from '../services/survey.service';
import { LoadingService } from '../../survey-department/shared-service/loading.service';
import { ToastService } from '../../survey-department/shared-service/toast.service';
import { clerk_rejected_documents_url } from '../../app.constants';
import { Subject } from 'rxjs';
import { DocumentsList } from '../interfaces/survey';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rejected-documents',
  templateUrl: './rejected-documents.component.html',
  styleUrls: ['./rejected-documents.component.css']
})
export class RejectedDocumentsComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  public dtTrigger = new Subject<any>();
  records: DocumentsList[] = [];
  constructor(private router: Router,private loadingService:LoadingService,public toastService:ToastService,public surveyService:SurveyService,) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      retrieve:true,
  


    }; 
    this.fetchRecords();
  }

  fetchRecords(){
    this.loadingService.showloading();
     this.surveyService.getrecord(clerk_rejected_documents_url).subscribe((res)=>{
       this.records = res;
       this.loadingService.hideloading();
 
       this.dtTrigger.next();
 
     },(err)=>{
       this.loadingService.hideloading();
       
     });
   }
   rerenderTable(): void {
     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       // Destroy the table first
       dtInstance.destroy();
     });
   }
   capture_metadata(file_id){
     this.router.navigate(['surveyofkenya/document-preview',file_id]);

   }

}
