import { Component, OnInit, OnDestroy, ViewChild,ChangeDetectorRef} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ValidatorService } from '../services/validator.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { filter_document_by_file_url, fetch_document_records_url,
  validators_approve_document_url, fetch_document_record_details_url,
  validators_reject_document_url,
  edit_document_record_url,validators_submit_for_approval_document_url,
  edit_main_document_record_url} from '../../app.constants';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { DocumentsList } from '../interfaces/validator';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { NgxPermissionsService } from 'ngx-permissions';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
import { DynamicNestedFormComponent } from '../../dynamic-nested-form/dynamic-nested-form/dynamic-nested-form.component';
import { is_register } from '../perpetual-succession-register/app.component'
@Component({
  selector: 'app-validator-pending-validation-documents',
  templateUrl: './validator-pending-validation-documents.component.html',
  styleUrls: ['./validator-pending-validation-documents.component.css']
})
export class ValidatorPendingValidationDocumentsComponent implements OnInit, OnDestroy {
  public DocumentActivityForm: FormGroup;
  @ViewChild(DynamicNestedFormComponent, {static: false}) mainDocumentForm: DynamicNestedFormComponent;
  @ViewChild(DynamicFormComponent) inputForm: DynamicFormComponent;
  public is_main_document_field = false;
  public searchForm: FormGroup;
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  records: DocumentsList[] = [];
  request_id: any;
  record_instance_id: any;
  document_details = [];
  comments = [];
  searchString: string;
  commentsearchString: string;
  action_list = [];
  documentrecordsString: string;
  user_permissions = [];
  doc_keyword: any;
  doc_url_reference: any;
  filtered_file_number:any;
  can_edit_metadata:Boolean = false;

  @ViewChild('createModal') public createModal: ModalDirective;
  constructor(private router: Router, private loadingService: LoadingService,
    public toastService: ToastService, public validatorService: ValidatorService,
    private formBuilder: FormBuilder,
    public sweetalertService: SweetalertService,
    private permissionsService: NgxPermissionsService,
    private cdRef: ChangeDetectorRef   ) {
    this.searchForm = this.formBuilder.group({
      search_value: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100) ])),
      search_by: new FormControl('', Validators.compose([Validators.required])),
    });
    this.DocumentActivityForm = this.formBuilder.group({
      action: new FormControl('', Validators.compose([Validators.required])),
      // remarks: new FormControl('', Validators.compose([Validators.required])),
      remarks: new FormControl('', ),
    });
    this.fetch_permissions();
   }

  ngOnInit(): void {


  }
  filterdocuments() {
    if (this.searchForm.valid) {
      this.filtered_file_number =  this.searchForm.value['search_value'];
      const search_payload = {
        'search_value': this.searchForm.value['search_value'],
        'search_by': this.searchForm.value['search_by']
      };
      this.loadingService.showloading();
      this.validatorService.getrecords(filter_document_by_file_url, search_payload).subscribe((res) => {
        if (res) {
          this.records = res;
          this.loadingService.hideloading();
        }

      });

    } else {
      this.toastService.showToastNotification('warning', 'Please correct errors to proceed', '');
    }
  }



   ngOnDestroy() {

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
  this.validatorService.getrecords(fetch_document_records_url, payload).subscribe((res) => {
    this.document_details = res['document_records'];
    this.comments = res['comments'];
    this.loadingService.hideloading();


  }, (err) => {
    this.loadingService.hideloading();

  });
}
fetch_permissions() {
  const allowable_approve_roles = 'DATA_ANALYST';
  const allowable_edit_roles = 'DATA_PREVALIDATOR';

  this.permissionsService.permissions$.subscribe((permissions) => {
    const assigned_perm = permissions;
    const keys =  Object.keys(permissions);
    const permission_key = keys[0];

    this.user_permissions.push(permission_key);
});
const can_approve = this.user_permissions.includes(allowable_approve_roles);

    if (can_approve) {
     this.action_list = [
          {'id': 'approve', 'name': 'Approve'},
          {'id': 'reject', 'name': 'Reject'},
        ];

    } else {
      this.action_list = [
        {'id': 'reject', 'name': 'Reject'},
      ];

    }
    const can_edit_clerk_metadata = this.user_permissions.includes(allowable_edit_roles);

    if (can_edit_clerk_metadata) {
    this.can_edit_metadata = true;

    } else {
      this.can_edit_metadata = false;

    }



    

}
preview_document(record_id) {
  this.doc_url_reference = '';
  // this.cdRef.detectChanges();
  this.record_instance_id = record_id;
  const payload = {
    'record_id': record_id,
    'document_id': this.request_id

  };
  this.validatorService.getrecords(fetch_document_record_details_url, payload).subscribe((response) => {
   const preview_form = response['record_form']['fields'];
   const formcontrol_values =  response['record_values'];
   this.doc_keyword = response['document_details']['document_keyword'];
   const doc_ref_id = response['document_details']['document'];
   this.doc_url_reference = doc_ref_id;
 this.cdRef.detectChanges();
 const is_main_document = response['record_form']['is_main_document'];
 if (is_main_document) {
  this.is_main_document_field = true;



//   const is_main_document = response['record_form']['is_main_document'];
//  if (is_main_document) {
//   this.is_main_document_field = true;

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
actiondocument() {
  if (this.DocumentActivityForm.valid) {
    const action = this.DocumentActivityForm.value['action'];
    let endpoint_to_post_url = '';
    let success_message  = '';
    let confirmation_message = '';
    if (action == 'approve') {
      endpoint_to_post_url = validators_approve_document_url;
      success_message  = 'Document Approved Successfully';
      confirmation_message = 'Do you wish to proceed approving the document?';

    } else if (action == 'reject') {
      endpoint_to_post_url = validators_reject_document_url;
      success_message  = 'Document Rejected Successfully';
      confirmation_message = 'Do you wish to proceed rejecting the document?';
    }

    const payload = {
      'document_id': this.request_id,
      'remarks': this.DocumentActivityForm.value['remarks'],
    };
    this.sweetalertService.showConfirmation('Confirmation', confirmation_message).then((res) => {
      if (res) {
        this.loadingService.showloading();
        this.validatorService.postrecord(endpoint_to_post_url, payload).subscribe((response) => {
          if (response) {
            this.loadingService.hideloading();
           this.filterdocuments();
            this.sweetalertService.showAlert('Success', success_message, 'success');
            this.DocumentActivityForm.reset();
            this.selectTab(0);
          }
        });
        this.loadingService.hideloading();
      } else {

      }
    });
  } else {
    this.validatorService.markFormAsDirty(this.DocumentActivityForm);
    this.toastService.showToastNotification('error', 'Kindly Correct the errors to proceed', '');
  }
}
editRecord() {
  const payload = {
    'document_id': this.request_id,
    'record_id': this.record_instance_id,
    'metadata_records': [this.inputForm.value]
  };
  this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to edit record?').then((res) => {
    if (res) {
      this.loadingService.showloading();
      this.validatorService.postrecord(edit_document_record_url, payload).subscribe((response) => {
        if (response) {
          this.loadingService.hideloading();
          // this.sweetalertService.showAlert('Success', 'Successfully Editted', 'success');
          this.createModal.hide();
          this.toastService.showToastNotification("success","Successfully Updated","")
            this.fetchRecords(this.request_id);

        }
      });
      this.loadingService.hideloading();
    } else {

    }
  });

}
editMainForm() {
  

    const form_data = this.mainDocumentForm.filterForm.value;
    const payload = {
      'document_id': this.request_id,
      'record_id': this.record_instance_id,
      'metadata_records': form_data
    };
    this.sweetalertService.showConfirmation('Data Submission', 'Do you to posting the records?').then((res) => {
      if (res) {
        
        this.validatorService.postrecord(edit_main_document_record_url, payload).subscribe(res => {
          // this.sweetalertsService.showAlert('Success', 'Successfully Submitted for Validation', 'success');
          this.toastService.showToastNotification('success', 'Successfully Updated', '');
          this.fetchRecords(this.request_id);
          

        });

      }
    });
   



}





edit_main_document_record_url
submitforapproval(){
  const payload = {
    'document_id': this.request_id,
    'record_id': this.record_instance_id
  };
  this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to submit the document for approval?').then((res) => {
    if (res) {
      this.loadingService.showloading();
      this.validatorService.postrecord(validators_submit_for_approval_document_url, payload).subscribe((response) => {
        if (response) {
          this.loadingService.hideloading();
          // this.sweetalertService.showAlert('Success', 'Successfully Editted', 'success');
          this.createModal.hide();
          this.filterdocuments();
          this.toastService.showToastNotification("success","Successfully Submitted","")
          this.selectTab(0);

        }
      });
      this.loadingService.hideloading();
    } else {

    }
  });

}

}
