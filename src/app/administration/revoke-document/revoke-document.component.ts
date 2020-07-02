import { Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { AdministrationService } from '../services/administration.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { list_document_pending_revokation_url,fetch_document_records_url,
  document_approve_revoke_url } from '../../app.constants';
import { Subject } from 'rxjs';
import { DocumentList } from '../interfaces/administration';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
@Component({
  selector: 'app-revoke-document',
  templateUrl: './revoke-document.component.html',
  styleUrls: ['./revoke-document.component.css']
})
export class RevokeDocumentComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  public searchForm: FormGroup;
  public DocumentActivityForm: FormGroup;
  records: DocumentList[] = [];
  request_id: any;
  document_details = [];
  comments = [];
  documentrecordsString:any;
  commentsearchString:any;
  constructor(private router: Router,
    private loadingService:LoadingService,
    public toastService:ToastService,
    public administrationService:AdministrationService,
    private formBuilder: FormBuilder,
    public sweetalertService:SweetalertService) {
    this.searchForm = this.formBuilder.group({
      search_value: new FormControl('', Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(100) ])),
    });
    this.DocumentActivityForm = this.formBuilder.group({
      action: new FormControl('', Validators.compose([Validators.required])),
      // remarks: new FormControl('', Validators.compose([Validators.required])),
      remarks: new FormControl('', ),
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
  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }
  
  viewdetails(request_id) {
    this.selectTab(1);
    this.fetchRecords(request_id);
  }
  fetchRecords(request_id) {
    this.request_id = request_id;
   this.loadingService.showloading();
   const payload = {
     'document_id': request_id
  
   };
    this.administrationService.getrecords(fetch_document_records_url, payload).subscribe((res) => {
      this.document_details = res['document_records'];
      this.comments = res['comments'];
      this.loadingService.hideloading();
  
  
    }, (err) => {
      this.loadingService.hideloading();
  
    });
  }
  approverequest(){
    let payload = {
      "document_id":this.request_id,
    }
    this.sweetalertService.showConfirmation('Revoke Confirmation', 'Proceed Revoking Document?').then((res) => {
      if (res) {
        
        this.administrationService.postrecord(document_approve_revoke_url, payload).subscribe(res => {
          // this.sweetalertsService.showAlert('Success', 'Successfully Submitted for Validation', 'success');
          this.toastService.showToastNotification('success', 'Successfully Revoked', '');
          this.fetchRecords(this.request_id);
          

        });

      }
    });
   

  }

}
