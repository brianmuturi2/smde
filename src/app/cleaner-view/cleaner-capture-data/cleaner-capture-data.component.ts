import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { CleanerService } from '../services/cleaner.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { filter_document_by_file_url, fetch_user_document_types_url,
  fetch_document_records_url, fetch_document_record_details_url, cleaner_post_validation_data_url } from '../../app.constants';
import { Subject } from 'rxjs';
import { DocumentList } from '../interfaces/cleaner';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
import {ModalDirective} from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-cleaner-capture-data',
  templateUrl: './cleaner-capture-data.component.html',
  styleUrls: ['./cleaner-capture-data.component.scss']
})
export class CleanerCaptureDataComponent implements OnInit, OnDestroy {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  @ViewChild(DynamicFormComponent) inputForm: DynamicFormComponent;
  @ViewChild('createModal') public createModal: ModalDirective;
  public searchForm: FormGroup;
  public datacleaningForm: FormGroup;
  public isDocumentSearchCollapsed = false;
  public isDocumentTypeCollapsed = false;
  public parceldetailsformstatus  = false;
  public parcelownershipformstatus  = false;
  public documenttypeformstatus  = false;
  public remarkformstatus  = false;
  records: DocumentList[] = [];
  public DocumentTypeForm: FormGroup;
  public parcelDetailsForm: FormGroup;
  public parcelOwnershipForm: FormGroup;
  public remarksForm: FormGroup;


  department_documents = [];
validation_status = [
  {
    'id': 'YES',
    'name': 'YES'
  },
  {
    'id': 'NO',
    'name': 'NO'
  }
];
parcel_numbering_type = [
  {
    'id': 'BLOCK_NUMBER',
    'name': 'BLOCK_NUMBER'
  },
  {
    'id': 'PLOT_NUMBER',
    'name': 'PLOT_NUMBER'
  },
  {
    'id': 'PARCEL_NUMBER',
    'name': 'PARCEL_NUMBER'
  },

];
ownership_type = [
  {
    'id': 'SOLE',
    'name': 'SOLE'
  },
  {
    'id': 'JOINT',
    'name': 'JOINT'
  },
  {
    'id': 'COMMON',
    'name': 'COMMON'
  },

];
owner_identification_type = [
  {
    'id': 'NATIONAL_ID',
    'name': 'National Identification Number'
  },
  {
    'id': 'PASSPORT',
    'name': 'Passport'
  },
  {
    'id': 'BUSINESS_REGISTRATION_NUMBER',
    'name': 'Business Registration Number'
  },

];
document_general_status = [
  {
    'id': 'FINAL_APPROVAL',
    'name': 'Approved'
  },
  {
    'id': 'REJECTED',
    'name': 'Rejected'
  },
  {
    'id': 'AWAITING_CONFIRMATION',
    'name': 'Awaiting Confirmation'
  },
  {
    'id': 'PENDING_LIMS_CONFIRMATION',
    'name': 'Pending LIMS Confirmation'
  },

];
parcel_status = [
  {
    'id': 'ACTIVE',
    'name': 'Active'
  },
  {
    'id': 'REVOKED',
    'name': 'Revoked'
  },
  {
    'id': 'CANCELLED',
    'name': 'Cancelled'
  }, {
    'id': 'SUSPENDED',
    'name': 'Suspended'
  }

];
system = [
  {
    'id': 'EDMS',
    'name': 'EDMS'
  },
  {
    'id': 'LIMS',
    'name': 'LIMS'
  }

];
document_details = [];
  formInputRecords = [];
  parcelInputRecords = [];
  comments = [];
  searchString: string;
  docsearchString: string;
  commentsearchString: string;
  documentrecordsString: string;
  parcelrecordsString: string;
  doc_keyword: any;
  doc_url_reference: any;
  request_id: any;
  constructor(private router: Router, private loadingService: LoadingService,
     public toastService: ToastService, public cleanerService: CleanerService,
     private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService ) {
    this.searchForm = this.formBuilder.group({
      search_value: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100) ])),
    });
    this.datacleaningForm = this.formBuilder.group({
      search_value: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100) ])),
    });
    this.DocumentTypeForm = this.formBuilder.group({
      document_type: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100) ])),
      validity_status: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100) ])),
    });
    this.parcelDetailsForm = this.formBuilder.group({
      parcel_numbering_type: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100) ])),
      parcel_prefix: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100) ])),
      parcel_number: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
      block_number: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),

      parcel_owner_type: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
      file_number: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
      parcel_status: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
    });
    this.parcelOwnershipForm = this.formBuilder.group({
      parcel_system: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
      parcel_owner_identification_type: new FormControl('',
       Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
       parcel_owner_identification_number: new FormControl('',
       Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
       parcel_owner_name: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
    });
    this.remarksForm = this.formBuilder.group({
      remarks: new FormControl('',
       Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
      general_status: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
    });
   }

  ngOnInit(): void {
this.fetchdocumenttypes();


  }
  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }
  addDocumenttypeRow() {
    if (this.DocumentTypeForm.valid) {
      this.documenttypeformstatus = false;
    const payload = this.DocumentTypeForm.value;
    payload['id'] = Number(new Date());
    this.formInputRecords.push(payload);

    this.DocumentTypeForm.reset();
    return true;
  } else {
    this.documenttypeformstatus = true;
  }
}
deleteDocumenttypeRow(index) {
  const selected_obj = index.id;
  const matchedIndex = this.formInputRecords.map(function (obj) { return obj.id; }).indexOf(selected_obj);
  this.formInputRecords.splice(matchedIndex, 1);

}
  editDocumenttypeRow(index) {
    const selected_obj = index.id;
    const matchedIndex = this.formInputRecords.map(function (obj) { return obj.id; }).indexOf(selected_obj);
    this.DocumentTypeForm.patchValue(index);
    this.formInputRecords.splice(matchedIndex, 1);

  }
  addparcelownerRow() {
    if (this.parcelOwnershipForm.valid) {
      this.parcelownershipformstatus = false;
      const payload = this.parcelOwnershipForm.value;
      payload['id'] = Number(new Date());
      this.parcelInputRecords.push(payload);

      this.parcelOwnershipForm.reset();
      return true;
    } else {
      this.parcelownershipformstatus = true;
    }

}
deleteparcelownerRow(index) {
  const selected_obj = index.id;
  const matchedIndex = this.parcelInputRecords.map(function (obj) { return obj.id; }).indexOf(selected_obj);
  this.parcelInputRecords.splice(matchedIndex, 1);

}
  editparceownerlRow(index) {
    const selected_obj = index.id;
    const matchedIndex = this.parcelInputRecords.map(function (obj) { return obj.id; }).indexOf(selected_obj);
    this.parcelOwnershipForm.patchValue(index);
    this.parcelInputRecords.splice(matchedIndex, 1);

  }
  filterdocuments() {
    if (this.searchForm.valid) {
      const file_number_input = this.searchForm.value['search_value'];
      const search_payload = {
        'file_no': file_number_input
      };
      this.loadingService.showloading();
      this.cleanerService.getrecord(filter_document_by_file_url, search_payload).subscribe((res) => {
        if (res) {
          this.records = res;
          const response_file_number = res['file_no'];

          this.filenumberchange(file_number_input);
          this.loadingService.hideloading();

        }

      });

    } else {
      this.toastService.showToastNotification('warning', 'Please correct errors to proceed', '');
    }
  }


   ngOnDestroy() {

}
fetchdocumenttypes() {
  const payload = {

  };
  this.cleanerService.getrecord(fetch_user_document_types_url, payload ).subscribe((records) => {
    this.department_documents = records;
  });
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
     this.cleanerService.getrecord(fetch_document_records_url, payload).subscribe((res) => {
       this.document_details = res['document_records'];
       this.comments = res['comments'];
       this.loadingService.hideloading();


     }, (err) => {
       this.loadingService.hideloading();

     });
   }
   preview_document(record_id) {
    const payload = {
      'record_id': record_id,
      'document_id': this.request_id

    };
    this.cleanerService.getrecord(fetch_document_record_details_url, payload).subscribe((response) => {
     const preview_form = response['record_form']['fields'];
     const formcontrol_values =  response['record_values'];
     this.doc_keyword = response['document_details']['document_keyword'];
   this.doc_url_reference = response['document_details']['document'];
     this.inputForm.initialize_form(preview_form);
     this.inputForm.setControlValue(formcontrol_values);


    });
    this.createModal.show();

  }
  submitparcel() {
    const doc_type_length = this.formInputRecords.length;
    const parcel_length = this.parcelInputRecords.length;
    if (doc_type_length <= 0) {
      this.toastService.showToastNotification('error', 'Atleast One Record Is required', '');
      this.selectTab(2);
      this.documenttypeformstatus = true;

    } else if (parcel_length <= 0) {
      this.toastService.showToastNotification('error', 'Atleast One Parcel Record Is required', '');
      this.selectTab(3);
      this.parcelownershipformstatus = true;
    } else if (!this.parcelDetailsForm.valid) {
      this.toastService.showToastNotification('error', 'Kindly Correct the errors highlighted to proceed', '');
      this.selectTab(3);
      this.parceldetailsformstatus = true;
    } else if (!this.remarksForm.valid) {
      this.toastService.showToastNotification('error', 'Kindly Correct the errors highlighted to proceed', '');
      this.selectTab(4);
      this.remarkformstatus = true;
    } else {
      const payload = {
        'parcel_info': {
          'file_no': this.parcelDetailsForm.value['file_number'],
        'parcel_numbering_type': this.parcelDetailsForm.value['parcel_numbering_type'],
        'parcel_prefix': this.parcelDetailsForm.value['parcel_prefix'],
        'parcel_number': this.parcelDetailsForm.value['parcel_number'],
        'block_number': this.parcelDetailsForm.value['block_number'],
        'parcel_ownership_type': this.parcelDetailsForm.value['parcel_owner_type'],
        'parcel_status': this.parcelDetailsForm.value['parcel_status']
        },
        'document_type_details': this.formInputRecords,
        'parcel_owners': this.parcelInputRecords,
        'cleaning_section': {
          'remarks': this.remarksForm.value['remarks'],
        'general_status': this.remarksForm.value['general_status'],
        },




      };
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed submitting the data').then((res) => {
        if (res) {
          this.cleanerService.postrecord(cleaner_post_validation_data_url, payload).subscribe((res) => {
            if (res) {
              this.sweetalertService.showAlert('Success', 'Successfully Submitted', 'success');
              this.parcelDetailsForm.reset();
              this.remarksForm.reset();
              this.formInputRecords = [];
              this.parcelInputRecords = [];
              this.document_details = [];
              this.selectTab(0);

            }
          });
        }
      });
    }


  }
  filenumberchange(file_number) {

      const new_form_data = {
        'file_number': file_number

      };
      this.parcelDetailsForm.patchValue(new_form_data);

  }
  saveformData() {}

}
