import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ValidatorService } from '../services/validator.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { fetch_document_records_url,
  fetch_document_record_details_url, validators_approve_document_url,
   validators_reject_document_url } from '../../app.constants';
import { Subject } from 'rxjs';
import { DocumentsList } from '../interfaces/validator';
import { FieldConfig } from '../../dynamic-form/interface/dynamic-interface';
import { ActivatedRoute } from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
@Component({
  selector: 'app-validator-document-details',
  templateUrl: './validator-document-details.component.html',
  styleUrls: ['./validator-document-details.component.css']
})
export class ValidatorDocumentDetailsComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  @ViewChild(DynamicFormComponent) inputForm: DynamicFormComponent;
  dtElement: DataTableDirective;
  dtOptions: any = {};
  public dtTrigger = new Subject<any>();
  // records: DocumentsList[] = [];
  records = [];
  doc_keyword: any;
  doc_url_reference: any;
  request_id: any;
  searchString: string;
  comments: [];
  commentsearchString: string;
  @ViewChild('createModal') public createModal: ModalDirective;
  action_list = [
    {'id': 'approve', 'name': 'Approve'},
    {'id': 'reject', 'name': 'Reject'},
  ];
  public DocumentActivityForm: FormGroup;
  constructor(private loadingService: LoadingService, public toastService: ToastService, public validatorService: ValidatorService, private route: ActivatedRoute, private formBuilder: FormBuilder, public sweetalertService: SweetalertService, ) {
    this.DocumentActivityForm = this.formBuilder.group({
      action: new FormControl('', Validators.compose([Validators.required])),
      remarks: new FormControl('', Validators.compose([Validators.required])),
    });
   }

  ngOnInit(): void {
   this.request_id = this.route.snapshot.paramMap.get('id');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      retrieve: true,
    };
    this.fetchRecords(this.request_id);

  }

  fetchRecords(request_id) {
    this.loadingService.showloading();
    const payload = {
      'document_id': request_id

    };
     this.validatorService.getrecords(fetch_document_records_url, payload).subscribe((res) => {
       this.records = res['document_records'];
       this.comments = res['comments'];
       this.loadingService.hideloading();


     }, (err) => {
       this.loadingService.hideloading();

     });
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
      // this.doc_url_reference = "http://127.0.0.1:8000/media/documents/735e33c8-8983-41cd-b061-8827af53eac6.pdf"


     });
     this.createModal.show();

   }





}

