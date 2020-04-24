import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CleanerService } from '../services/cleaner.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { document_detail_url,
  serverurl, fixed_boundary_document_post,
   fetch_user_document_types_url , fetch_document_type_fields_url, post_document_fields_url} from '../../app.constants';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';

import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-cleaner-capture-data',
  templateUrl: './cleaner-capture-data.component.html',
  styleUrls: ['./cleaner-capture-data.component.scss']
})
export class CleanerCaptureDataComponent implements OnInit {
  @ViewChild(DynamicFormComponent) inputForm: DynamicFormComponent;
  public surveyForm: FormGroup;
  public documentTypeForm: FormGroup;
  formInputRecords = [];
  public show_edit: boolean = false;
  surveyrecord_info: any = {};
  preview_file: string = '';
  document_list_items = [];
  tenant_client: string;
  reference_serial_number: string;
  records: [];
  constructor(private router: Router, public sweetalertsService: SweetalertService,
     private loadingService: LoadingService, private formBuilder: FormBuilder,
     public cleanerService: CleanerService, private toastService: ToastService,
      private route: ActivatedRoute, ) {
    this.documentTypeForm = this.formBuilder.group({
      document_type: new FormControl('', Validators.compose([Validators.required])),
    });

  }

  ngOnInit(): void {
    // let tenant_client: string = this.route.params['id'];
    this.tenant_client = this.route.snapshot.paramMap.get('id');
    this.fetch_document_types();

  }
  fetch_document_types() {
    const payload = {

    };
    this.cleanerService.getrecorddetail(fetch_user_document_types_url, payload).subscribe((res) => {

      // this.document_list_items.push(res);
      this.document_list_items = res;
    });

  }
  fetchdocumenttypeform(value) {
    const payload = {
      'doc_key_word': value
    };
    this.cleanerService.getrecorddetail(fetch_document_type_fields_url, payload).subscribe((res) => {
      this.formInputRecords = [];
      const form_values = res['fields'];
      this.inputForm.initialize_form(form_values);

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
            this.cleanerService.postrecord(post_document_fields_url, records_passed).subscribe(res => {
              this.sweetalertsService.showAlert('Success', 'Successfully Submitted for Validation', 'success');
              // this.toastService.showToastNotification('success','Successfully Submitted for Validation','');
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
