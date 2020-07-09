import { Component, OnInit,OnDestroy,ViewChild,ChangeDetectorRef } from '@angular/core';
import { AdministrationService } from '../services/administration.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { list_document_pending_revokation_url,fetch_document_records_url,
  document_approve_revoke_url ,fetch_document_record_details_url,
  filter_revoked_document_by_file_url} from '../../app.constants';
import { Subject } from 'rxjs';
import { DocumentList } from '../interfaces/administration';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
import { DynamicNestedFormComponent } from '../../dynamic-nested-form/dynamic-nested-form/dynamic-nested-form.component';
import {ModalDirective} from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-revoke-document',
  templateUrl: './revoke-document.component.html',
  styleUrls: ['./revoke-document.component.css']
})
export class RevokeDocumentComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  public searchForm: FormGroup;
  @ViewChild(DynamicNestedFormComponent, {static: false}) mainDocumentForm: DynamicNestedFormComponent;
  @ViewChild(DynamicFormComponent) inputForm: DynamicFormComponent;
  public is_main_document_field = false;
  public DocumentActivityForm: FormGroup;
  records: DocumentList[] = [];
  request_id: any;
  document_details = [];
  comments = [];
  record_instance_id:any;
  documentrecordsString:any;
  commentsearchString:any;
  doc_url_reference:any;
  doc_keyword:any
  @ViewChild('createModal') public createModal: ModalDirective;
  constructor(private router: Router,
    private loadingService:LoadingService,
    public toastService:ToastService,
    public administrationService:AdministrationService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef ,
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
    const search_payload = {

    };
   this.filterdocuments(search_payload);
  }
  searchfiles(){
    if (this.searchForm.valid) {
      
      const search_payload = {
        'file_no': this.searchForm.value['search_value']
      };
      this.loadingService.showloading();
      this.administrationService.getrecords(filter_revoked_document_by_file_url, search_payload).subscribe((res) => {
        if (res) {
          this.records = res;
          this.loadingService.hideloading();
        }

      });

    } else {
      this.toastService.showToastNotification('warning', 'Please correct errors to proceed', '');
    }

  }
  filterdocuments(search_payload) {
      this.loadingService.showloading();
      this.administrationService.getrecords(list_document_pending_revokation_url, search_payload).subscribe((res) => {
        if (res) {
          this.records = res;
          this.loadingService.hideloading();
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
  preview_document(record_id) {
    this.doc_url_reference = '';
    // this.cdRef.detectChanges();
    this.record_instance_id = record_id;
    const payload = {
      'record_id': record_id,
      'document_id': this.request_id
  
    };
    this.administrationService.getrecords(fetch_document_record_details_url, payload).subscribe((response) => {
     const preview_form = response['record_form']['fields'];
     const formcontrol_values =  response['record_values'];
     this.doc_keyword = response['document_details']['document_keyword'];
     const doc_ref_id = response['document_details']['document'];
     this.doc_url_reference = doc_ref_id;
   this.cdRef.detectChanges();
   const is_main_document = response['record_form']['is_main_document'];
   if (is_main_document) {
    this.is_main_document_field = true;
  
    const main_document_fields = response['record_form']['main_document_fields'];
    const main_forsm_name = main_document_fields['formgroup'];
    const patchvalues = response['record_values']
   
    // this.mainDocumentForm.main_form_name = main_forsm_name;
  
    this.mainDocumentForm.showform(main_document_fields);
    this.mainDocumentForm.update_form_values(patchvalues);
    // this.update_values();
  }
  else{
    this.is_main_document_field = false;
    this.inputForm.initialize_form(preview_form);
    this.inputForm.setControlValue(formcontrol_values);
   //  if(this.can_edit_metadata){
     const save_button_value = {
       'field_no': '',
       'field_type': 'button',
       'input_type': 'button',
       'is_enforced': true,
       'is_mandatory': true,
       'label': 'Update',
       'name': 'save',
       'options': '',
       'validations': [],
       'width': 12
     };
     preview_form.push(save_button_value);
  }
  
  
   
       
    //  }
  
  
    });
    this.createModal.show();
  
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
