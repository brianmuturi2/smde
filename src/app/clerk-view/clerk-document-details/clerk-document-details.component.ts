import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { SurveyService } from '../services/survey.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { fetch_document_records_url, fetch_document_record_details_url,
  edit_document_record_url, clerk_resubmit_document_url} from '../../app.constants';
import { Subject } from 'rxjs';
import { DocumentsList } from '../interfaces/survey';
import { FieldConfig } from '../../dynamic-form/interface/dynamic-interface';
import { ActivatedRoute } from '@angular/router';
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
  record_instance_id: any;
  comments: [];
  searchString: string;
  commentsearchString: string;
  @ViewChild('createModal') public createModal: ModalDirective;

  public DocumentActivityForm: FormGroup;
  constructor(private loadingService: LoadingService,
    public toastService: ToastService, public clerkService: SurveyService,
    private route: ActivatedRoute, private formBuilder: FormBuilder,
    public sweetalertService: SweetalertService, ) {

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
     this.clerkService.getrecorddetail(fetch_document_records_url, payload).subscribe((res) => {
       console.log(res);
       this.records = res['document_records'];
       this.comments = res['comments'];
       console.log(this.comments);
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
      } else {

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
            this.sweetalertService.showAlert('Success', 'Successfully Editted', 'success');
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


     });
     this.createModal.show();

   }





}

