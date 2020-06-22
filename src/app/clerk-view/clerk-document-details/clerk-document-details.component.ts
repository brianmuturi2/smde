import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SurveyService } from '../services/survey.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { fetch_document_records_url, fetch_document_record_details_url,
  edit_document_record_url, clerk_resubmit_document_url, revoke_document_url} from '../../app.constants';
import { ActivatedRoute, Router } from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
@Component({
  selector: 'app-clerk-document-details',
  templateUrl: './clerk-document-details.component.html',
  styleUrls: ['./clerk-document-details.component.css']
})
export class ClerkDocumentDetailsComponent implements OnInit {
  @ViewChild(DynamicFormComponent) inputForm: DynamicFormComponent;
  // records: DocumentsList[] = [];
  records = [];
  doc_keyword: any;
  formSubmitted = false;
  doc_url_reference: any;
  request_id: any;
  record_instance_id: any;
  comments: [];
  searchString: string;
  commentsearchString: string;
  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('editModal') public editModal: ModalDirective;

  public DocumentActivityForm: FormGroup;
  public revokeDocumentForm: FormGroup;
  constructor(private loadingService: LoadingService,
    public toastService: ToastService, public clerkService: SurveyService,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router,
    public sweetalertService: SweetalertService, ) {
      this.revokeDocumentForm = this.formBuilder.group({
        revocation_remarks: new FormControl('',
         Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(1000)])),
      });

   }

  ngOnInit(): void {
   this.request_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.fetchRecords(this.request_id);

  }

  fetchRecords(request_id) {
    this.loadingService.showloading();
    const payload = {
      'document_id': request_id

    };
     this.clerkService.getrecorddetail(fetch_document_records_url, payload).subscribe((res) => {
       console.log(res);
       this.records = res['document_records'];
       this.comments = res['comments'];
       this.loadingService.hideloading();

     }, (err) => {
       this.loadingService.hideloading();

     });
   }
   resubmitdocument() {

    const payload = {
      'document_id': this.request_id

    };
    this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed resubmitting your edits?').then((res) => {
      if (res) {
        this.loadingService.showloading();
        this.clerkService.postrecord(clerk_resubmit_document_url, payload).subscribe((response) => {
          if (response) {
            this.loadingService.hideloading();
            this.sweetalertService.showAlert('Success', 'Successfully Resubmitted', 'success');
            this.DocumentActivityForm.reset();
          }
        });
        this.loadingService.hideloading();
      }
    });
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
        this.clerkService.postrecord(edit_document_record_url, payload).subscribe((response) => {
          if (response) {
            this.loadingService.hideloading();
            // this.sweetalertService.showAlert('Success', 'Successfully Editted', 'success');
            this.toastService.showToastNotification("success","Successfully Updated","")
            this.fetchRecords(this.request_id);
            this.createModal.hide();

          }
        });
        this.loadingService.hideloading();
      } else {

      }
    });

  }

   preview_document(record_id) {
     this.record_instance_id = record_id;
     const payload = {
       'record_id': record_id,
       'document_id': this.request_id

     };
     this.clerkService.getrecorddetail(fetch_document_record_details_url, payload).subscribe((response) => {
      const preview_form = response['record_form']['fields'];
      const formcontrol_values =  response['record_values'];
      this.doc_keyword = response['document_details']['document_keyword'];
      // this.doc_url_reference = response['document_details']['document']
      this.inputForm.initialize_form(preview_form);
      this.inputForm.setControlValue(formcontrol_values);
      this.doc_url_reference =  response['document_details']['document'];
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


     });
     this.createModal.show();

   }

   revokedocument() {
    this.editModal.show();
   }
   request_document_revoke() {
     if (this.revokeDocumentForm.valid) {
       const payload = {
         'document_id': this.request_id,
         'remarks': this.revokeDocumentForm.value['revocation_remarks'],
       };
       this.clerkService.postrecord(revoke_document_url, payload).subscribe((res) => {
         if (res) {
           this.sweetalertService.showAlert('Success', 'Document Successfully Revoked', 'success');
           this.router.navigate(['clerk-view/rejected-documents']);

         }
       });

     } else {
       this.formSubmitted =  true;
       this.toastService.showToastNotification('error',
       'Kindly Correct the errors to proceed', '');
     }

   }


}

