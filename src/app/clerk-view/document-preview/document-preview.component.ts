import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import  { FixedBoundaryCard} from '../interfaces/survey';
import {SurveyService } from '../services/survey.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { document_detail_url, serverurl,
   fixed_boundary_document_post, fetch_user_document_types_url ,
   fetch_document_type_fields_url, post_document_fields_url} from '../../app.constants';
import { DocumentsList } from '../interfaces/survey';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';

import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.css']
})
export class DocumentPreviewComponent implements OnInit {
  @ViewChild(DynamicFormComponent) inputForm: DynamicFormComponent;
  public surveyForm: FormGroup;
  public documentTypeForm: FormGroup;
  formInputRecords = [];
  searchString: string;
  documenttypeformstatus = false;
  public show_edit: boolean = false;
  surveyrecord_info: any = {};
  preview_file: string = '';
  records: DocumentsList[] = [];
  document_list_items = [];
  tenant_client: string;
  reference_serial_number: string;
  exampleJsonObject = {
    'first_name': 'Jane', 'last_name': 'Doe', 'age': 25, 'is_company': false,
    'address': {
      'street_1': '123 Main St.', 'street_2': null,
      'city': 'Las Vegas', 'state': 'NV', 'zip_code': '89123'
    },
    'phone_numbers': [
      { 'number': '702-123-4567', 'type': 'cell' },
      { 'number': '702-987-6543', 'type': 'work' }
    ], 'notes': ''
  };
  constructor(private router: Router, public sweetalertsService: SweetalertService,
    private loadingService: LoadingService, private formBuilder: FormBuilder,
    public surveyService: SurveyService, private toastService: ToastService, private route: ActivatedRoute, ) {
    this.documentTypeForm = this.formBuilder.group({
      document_type: new FormControl('', Validators.compose([Validators.required])),
    });

  }

  ngOnInit(): void {
    // let tenant_client: string = this.route.params['id'];
    this.tenant_client = this.route.snapshot.paramMap.get('id');
    this.fetchRecords(this.tenant_client);
    this.fetch_document_types();

  }
  fetch_document_types() {
    const payload = {

    };
    this.surveyService.getrecorddetail(fetch_user_document_types_url, payload).subscribe((res) => {
      // this.document_list_items.push(res);
      this.document_list_items = res;
    });

  }
  fetchdocumenttypeform(value) {
    const payload = {
      'doc_key_word': value
    };
    this.surveyService.getrecorddetail(fetch_document_type_fields_url, payload).subscribe((res) => {
      this.formInputRecords = [];
      const form_details = res;
      const is_main_document = form_details['is_main_document'];
      if (is_main_document) {
        alert('woi woit');
      } else {
        const form_values = res['fields'];
        const save_button_value = {
          'field_no': '',
          'field_type': 'button',
          'input_type': 'button',
          'is_enforced': true,
          'is_mandatory': true,
          'label': 'Add New',
          'name': 'save',
          'options': '',
          'validations': [],
          'width': 12
        };
      form_values.push(save_button_value);
        this.inputForm.initialize_form(form_values);
      }


    });

  }

  fetchRecords(payload) {

    this.loadingService.showloading();
    const params = {
      'doc_id': payload
    };
     this.surveyService.getrecorddetail(document_detail_url, params).subscribe((res) => {
      //  this.records = res;
      const alldocs = res;
       this.preview_file = alldocs['document'];
       this.loadingService.hideloading();

     }, (err) => {
       this.loadingService.hideloading();
     });
   }
  addRow() {
    const payload = this.inputForm.value;
    payload['id'] = Number(new Date());
    this.formInputRecords.push(payload);
    this.inputForm.resetForm();
    return true;
}
deleteRow(index) {
  const selected_obj = index.id;
  const matchedIndex = this.formInputRecords.map(function (obj) { return obj.id; }).indexOf(selected_obj);
  this.formInputRecords.splice(matchedIndex, 1);

}
  editRow(index) {
    const selected_obj = index.id;
    const matchedIndex = this.formInputRecords.map(function (obj) { return obj.id; }).indexOf(selected_obj);
    this.show_edit = true;
    this.inputForm.setControlValue(index);
    this.formInputRecords.splice(matchedIndex, 1);



  }
  saveformData() {
    if (!this.documentTypeForm.valid) {
      this.toastService.showToastNotification('error', 'Invalid Document Type Selected', '');
    } else {
      const item_length = this.formInputRecords.length;
      if (item_length <= 0 ) {
        this.toastService.showToastNotification('error', 'Atleast One Record Is required', '');
      } else {
        this.sweetalertsService.showConfirmation('Data Submission', 'Do you to proceed saving the records?').then((res) => {
          if (res) {
            const records_passed = {
              'document_id': this.tenant_client,
              'document_keyword': this.documentTypeForm.value['document_type'],
              'metadata_records': this.formInputRecords
            };
            this.surveyService.postrecord(post_document_fields_url, records_passed).subscribe(res => {
              // this.sweetalertsService.showAlert('Success', 'Successfully Submitted for Validation', 'success');
              this.toastService.showToastNotification('success', 'Successfully Submitted for Validation', '');
              this.formInputRecords = [];
              this.inputForm.resetForm();
              this.router.navigate(['clerk-view/my-document']);

            });

          }
        });



      }

    }



  }

}
