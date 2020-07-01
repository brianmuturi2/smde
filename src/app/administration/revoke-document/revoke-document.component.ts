import { Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { AdministrationService } from '../services/administration.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { list_document_pending_revokation_url } from '../../app.constants';
import { Subject } from 'rxjs';
import { DocumentList } from '../interfaces/administration';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
@Component({
  selector: 'app-revoke-document',
  templateUrl: './revoke-document.component.html',
  styleUrls: ['./revoke-document.component.css']
})
export class RevokeDocumentComponent implements OnInit {
  public searchForm: FormGroup;
  records: DocumentList[] = [];
  constructor(private router: Router,private loadingService:LoadingService,public toastService:ToastService,public administrationService:AdministrationService,private formBuilder: FormBuilder,) {
    this.searchForm = this.formBuilder.group({
      search_value: new FormControl('', Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(100) ])),
    });
   }

  ngOnInit(): void {
    this.filterdocuments();
   
  }
  filterdocuments(){
    const search_payload = {

    };
    this.loadingService.showloading();
    this.administrationService.getrecords(list_document_pending_revokation_url,search_payload).subscribe((res)=>{
      if(res){
        this.records = res;
        this.loadingService.hideloading();
        // this.rerenderTable();
  
        
      }

    });
  }

   viewdetails(request_id){
   this.router.navigate(['clerk-view/document-detail', request_id]);
   }

}
