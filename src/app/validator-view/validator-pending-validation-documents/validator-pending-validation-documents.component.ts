import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ValidatorService } from '../services/validator.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { filter_document_by_file_url, fetch_document_records_url,
  validators_approve_document_url, fetch_document_record_details_url,
  validators_reject_document_url } from '../../app.constants';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { DocumentsList } from '../interfaces/validator';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { NgxPermissionsService } from 'ngx-permissions';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
@Component({
  selector: 'app-validator-pending-validation-documents',
  templateUrl: './validator-pending-validation-documents.component.html',
  styleUrls: ['./validator-pending-validation-documents.component.css']
})
export class ValidatorPendingValidationDocumentsComponent implements OnInit, OnDestroy {
  public DocumentActivityForm: FormGroup;
  @ViewChild(DynamicFormComponent) inputForm: DynamicFormComponent;
  public searchForm: FormGroup;
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  records: DocumentsList[] = [];
  request_id: any;
  document_details = [];
  comments = [];
  searchString: string;
  commentsearchString: string;
  action_list = [];
  documentrecordsString: string;
  user_permissions = [];
  doc_keyword: any;
  doc_url_reference: any;

  @ViewChild('createModal') public createModal: ModalDirective;
  constructor(private router: Router, private loadingService: LoadingService,
    public toastService: ToastService, public validatorService: ValidatorService,
    private formBuilder: FormBuilder,
    public sweetalertService: SweetalertService,
    private permissionsService: NgxPermissionsService  ) {
    this.searchForm = this.formBuilder.group({
      search_value: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100) ])),
    });
    this.DocumentActivityForm = this.formBuilder.group({
      action: new FormControl('', Validators.compose([Validators.required])),
      remarks: new FormControl('', Validators.compose([Validators.required])),
    });
    this.fetch_permissions();
   }

  ngOnInit(): void {


  }
  filterdocuments() {
    if (this.searchForm.valid) {
      const search_payload = {
        'file_no': this.searchForm.value['search_value']
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

}
preview_document(record_id) {
  const payload = {
    'record_id': record_id,
    'document_id': this.request_id

  };
  this.validatorService.getrecords(fetch_document_record_details_url, payload).subscribe((response) => {
   const preview_form = response['record_form']['fields'];
   const formcontrol_values =  response['record_values'];
   this.doc_keyword = response['document_details']['document_keyword'];
 this.doc_url_reference = response['document_details']['document'];
   this.inputForm.initialize_form(preview_form);
   this.inputForm.setControlValue(formcontrol_values);


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
            this.sweetalertService.showAlert('Success', success_message, 'success');
            this.DocumentActivityForm.reset();
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

}
