import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { CleanerService } from '../services/cleaner.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import {
  data_cleaning_file_filter_url, fetch_user_document_types_url, create_document_comment_url,
  fetch_document_records_url, fetch_document_record_details_url, cleaner_post_validation_data_url,
  filter_document_by_file_url, cleaning_create_document_types_url,
  cleaning_delete_document_types_url, cleaning_update_document_types_url,
  cleaning_create_parcel_owner_url, cleaning_edit_parcel_owner_url
  , cleaning_delete_parcel_owner_url, list_department_url, start_data_cleaning_url,
  change_data_cleaning_file_status_url, data_cleaning_file_comments_url,
  cleaning_create_parcel_information_url, cleaning_edit_parcel_information_url,
  data_cleaning_fetch_file_parcel_information_url, data_cleaning_fetch_document_type_verification_information_url,
  list_cleaning_entity_types_url, list_cleaning_parcel_numbering_types_url,
  list_cleaning_parcel_ownership_types_url, list_cleaning_parcel_status_url,
  list_cleaning_system_types_url, list_cleaning_ownership_rights_url,
  list_cleaning_ownership_identification_types_url, list_cleaning_file_status_url,
  cleaning_create_parcel_beneficiary_url, cleaning_filter_parcel_owners_url, cleaning_edit_parcel_beneficiary_url,
  cleaning_delete_parcel_beneficiary_url, cleaning_filter_parcel_owners_beneficiaries_url

} from '../../app.constants';
import { Subject } from 'rxjs';
import { DocumentList } from '../interfaces/cleaner';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DynamicNestedFormComponent } from '../../dynamic-nested-form/dynamic-nested-form/dynamic-nested-form.component';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
  selector: 'app-cleaner-capture-data',
  templateUrl: './cleaner-capture-data.component.html',
  styleUrls: ['./cleaner-capture-data.component.scss']
})
export class CleanerCaptureDataComponent implements OnInit, OnDestroy {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  @ViewChild(DynamicNestedFormComponent, { static: false }) mainDocumentForm: DynamicNestedFormComponent;
  @ViewChild(DynamicFormComponent) inputForm: DynamicFormComponent;
  public is_main_document_field = false;
  @ViewChild('startCleaningTaskModal') public startCleaningTaskModal: ModalDirective;
  @ViewChild('createModal') public createModal: ModalDirective;
  public searchForm: FormGroup;
  public startDataCleaningForm: FormGroup;
  public datacleaningForm: FormGroup;
  public beneficiaryForm: FormGroup;
  public DocumentCommentForm: FormGroup;
  public isDocumentSearchCollapsed = false;
  public isDocumentTypeCollapsed = false;
  public parceldetailsformstatus = false;
  public parcelownershipformstatus = false;
  public documenttypeformstatus = false;
  public remarkformstatus = false;
  isownershipSectionCollapsed = true;
  isparcelSectionCollapsed = false;
  isbeneficiarySectionCollapsed = true;
  show_beneficiary_field = true;
  show_beneficiary_create = true;
  beneficiaryformstatus = false;
  records: DocumentList[] = [];
  public DocumentTypeForm: FormGroup;
  public parcelDetailsForm: FormGroup;
  public parcelOwnershipForm: FormGroup;
  public remarksForm: FormGroup;
  requires_parcel_information = true;
  start_file_cleaning_task = false;
  file_comment_records = [];
  filecommentsearchString: string;
  department_documents = [];
  show_parcel_owners_create = true;
  ownership_type_option = false;
  datacleaningstartformstatus = false;
  show_parcel_details_create = true;
  show_ir_field = false;
  show_gla_field = false;
  show_block_field = true;
  department_list = [];
  beneficiaryInputRecords = [];
  all_minor_trustees = [];
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
  parcel_numbering_type = [];
  ownership_type = [];
  owner_identification_type = [];
  document_general_status = [];
  cleaner_general_status = [];
  parcel_status = [];
  system = [];
  entity_type_list = [];
  ownership_rights_list = [];



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
  data_cleaning_request_id: any;
  request_id: any;
  parcel_ownership_request_id: any;
  reference_file_number: any;
  reference_file_status: any;
  create_document_type_state: any;
  show_document_type_create = true;
  constructor(private router: Router, private loadingService: LoadingService,
    public toastService: ToastService, public cleanerService: CleanerService,
    private formBuilder: FormBuilder,
    public sweetalertService: SweetalertService,
    private cdRef: ChangeDetectorRef,
    private permissionsService: NgxPermissionsService,) {
    this.searchForm = this.formBuilder.group({
      search_value: new FormControl('',
        Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
    });

    this.startDataCleaningForm = this.formBuilder.group({
      department_id: new FormControl('',
        Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
    });
    this.datacleaningForm = this.formBuilder.group({
      search_value: new FormControl('',
        Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
    });
    this.DocumentTypeForm = this.formBuilder.group({
      id: new FormControl('',),
      document_type: new FormControl('',
        Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      validity_status: new FormControl('',
        Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
    });
    this.parcelDetailsForm = this.formBuilder.group({

      parcel_numbering_type: new FormControl('',
        Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      parcel_prefix: new FormControl('',),
      parcel_number: new FormControl('',),
      block_number: new FormControl('',),
      parcel_owner_type: new FormControl('',),
      ir_number: new FormControl('',),
      lr_number: new FormControl('',),
      gla_number: new FormControl('',),
      file_number: new FormControl('',
        Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])),
      parcel_status: new FormControl('',),
      parcel_id: new FormControl('',),
    });
    this.parcelOwnershipForm = this.formBuilder.group({
      id: new FormControl('',),
      parcel_system: new FormControl('',
      ),
      entity_type: new FormControl('',
      ),
      share_denominator: new FormControl('',
      ),
      share_numerator: new FormControl('',
      ),
      owner_identification_type: new FormControl('',),
      owner_identification_number: new FormControl('',
      ),
      owner_name: new FormControl('',),
      ownership_rights: new FormControl('',),
    });
    this.remarksForm = this.formBuilder.group({
      remarks: new FormControl('',
        Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])),
      general_status: new FormControl('',
        Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])),
    });
    this.DocumentCommentForm = this.formBuilder.group({
      remarks: new FormControl('',),
    });
    this.beneficiaryForm = this.formBuilder.group({
      id: new FormControl('',),
      parcel_owner: new FormControl('',
      ),
      name: new FormControl('',
      ),
      share_denominator: new FormControl('',
      ),
      share_numerator: new FormControl('',
      ),
    });

  }

  ngOnInit(): void {
    this.fetchdocumenttypes();
    this.fetchDepartments();
    // this.fetchroles();
    this.fetchEntitytypes();
    this.fetchParcelNumberingTypes();
    this.fetchParcelOwnershipTypes();
    this.fetchParcelStatus();
    this.fetchCleaningSystems();
    this.fetchOwnershipRights();
    this.fetchOwnershipIdentificationTypes();
    this.fetchFileStatus();


  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }
  ownership_rights_change() {
    const ownership_rights = this.parcelOwnershipForm.value['ownership_rights'];
    if (ownership_rights === 'TRUSTEE_FOR_MINOR') {
      this.show_beneficiary_field = true;
      this.isbeneficiarySectionCollapsed = false;


    } else {

      this.show_beneficiary_field = false;
      this.isbeneficiarySectionCollapsed = true;
    }


  }
  fetch_owners_by_ownership_rights(parcel_ownership_id) {
    this.loadingService.showloading();
    const params = {
      'request_id': parcel_ownership_id,
      'search_name': 'ownership_rights',
      'search_value': 'TRUSTEE_FOR_MINOR'

    };
    this.cleanerService.getrecord(cleaning_filter_parcel_owners_url, params).subscribe((res) => {
      this.all_minor_trustees = res;

      this.loadingService.hideloading();

    });
  }
  fetchDepartments() {
    this.loadingService.showloading();
    const params = {

    };
    this.cleanerService.getrecord(list_department_url, params).subscribe((res) => {
      this.department_list = res;

      this.loadingService.hideloading();

    });
  }
  fetchFileStatus() {
    this.loadingService.showloading();
    const params = {

    };
    this.cleanerService.getrecord(list_cleaning_file_status_url, params).subscribe((res) => {
      this.document_general_status = res;

      this.loadingService.hideloading();

    });
  }
  fetchEntitytypes() {
    this.loadingService.showloading();
    const params = {

    };
    this.cleanerService.getrecord(list_cleaning_entity_types_url, params).subscribe((res) => {
      this.entity_type_list = res;

      this.loadingService.hideloading();

    });
  }
  fetchParcelNumberingTypes() {
    this.loadingService.showloading();
    const params = {

    };
    this.cleanerService.getrecord(list_cleaning_parcel_numbering_types_url, params).subscribe((res) => {
      this.parcel_numbering_type = res;

      this.loadingService.hideloading();

    });
  }
  filterparcelbeneficiaries(event) {
    console.log(event);
    this.beneficiaryInputRecords = [];
    this.loadingService.showloading();
    const params = {
      'request_id': event.target.value

    };
    this.cleanerService.getrecord(cleaning_filter_parcel_owners_beneficiaries_url, params).subscribe((res) => {
      this.beneficiaryInputRecords = res;
      this.loadingService.hideloading();

    });

  }
  fetchParcelOwnershipTypes() {
    this.loadingService.showloading();
    const params = {

    };
    this.cleanerService.getrecord(list_cleaning_parcel_ownership_types_url, params).subscribe((res) => {
      this.ownership_type = res;

      this.loadingService.hideloading();

    });
  }
  fetchParcelStatus() {
    this.loadingService.showloading();
    const params = {

    };
    this.cleanerService.getrecord(list_cleaning_parcel_status_url, params).subscribe((res) => {
      this.parcel_status = res;

      this.loadingService.hideloading();

    });
  }
  fetchCleaningSystems() {
    this.loadingService.showloading();
    const params = {

    };
    this.cleanerService.getrecord(list_cleaning_system_types_url, params).subscribe((res) => {
      this.system = res;

      this.loadingService.hideloading();

    });
  }
  fetchOwnershipRights() {
    this.loadingService.showloading();
    const params = {

    };
    this.cleanerService.getrecord(list_cleaning_ownership_rights_url, params).subscribe((res) => {
      this.ownership_rights_list = res;

      this.loadingService.hideloading();

    });
  }
  fetchOwnershipIdentificationTypes() {
    this.loadingService.showloading();
    const params = {

    };
    this.cleanerService.getrecord(list_cleaning_ownership_identification_types_url, params).subscribe((res) => {
      this.owner_identification_type = res;

      this.loadingService.hideloading();

    });
  }

  addDocumenttypeRow() {
    if (this.DocumentTypeForm.valid) {
      this.documenttypeformstatus = false;
      const payload = this.DocumentTypeForm.value;
      payload['request_id'] = this.data_cleaning_request_id;
      this.create_verified_document_types(payload).then((response) => {
        const saved_id = response;
        payload['id'] = saved_id;
        this.formInputRecords.push(payload);
        this.DocumentTypeForm.reset();
        this.fetch_document_type_information(this.data_cleaning_request_id);
      });

    } else {
      this.documenttypeformstatus = true;
    }
  }
  deleteDocumenttypeRow(index) {
    const selected_obj = index;
    const delete_payload = {
      'request_id': index.id
    };
    this.delete_verified_document_types(delete_payload).then((response) => {
      const matchedIndex = this.formInputRecords.map(function (obj) { return obj.id; }).indexOf(selected_obj);
      this.formInputRecords.splice(matchedIndex, 1);
      this.fetch_document_type_information(this.data_cleaning_request_id);
    });
  }
  editDocumenttypeRow(index) {
    const selected_obj = index.id;
    const matchedIndex = this.formInputRecords.map(function (obj) { return obj.id; }).indexOf(selected_obj);
    this.DocumentTypeForm.patchValue(index);
    this.formInputRecords.splice(matchedIndex, 1);
    this.show_document_type_create = false;


  }
  updateDocumenttypeRow() {
    if (this.DocumentTypeForm.valid) {
      this.documenttypeformstatus = false;
      const payload = this.DocumentTypeForm.value;
      payload['request_id'] = payload['id'];
      this.update_verified_document_types(payload).then((response) => {
        const matchedIndex = this.formInputRecords.map(function (obj) { return obj.id; }).indexOf(response);
        this.formInputRecords.splice(matchedIndex, 1);
        const saved_id = response;
        payload['id'] = saved_id;
        this.formInputRecords.push(response);
        this.DocumentTypeForm.reset();
        this.show_document_type_create = true;
        this.fetch_document_type_information(this.data_cleaning_request_id);
      });

    } else {
      this.documenttypeformstatus = true;
    }
  }

  addparcelownerRow() {
    if (this.parcelOwnershipForm.valid) {
      this.parcelownershipformstatus = false;
      const payload = this.parcelOwnershipForm.value;
      payload['request_id'] = this.parcelDetailsForm.value['parcel_id'];
      this.create_new_parcel_owner(payload).then((response) => {
        const saved_id = response;
        payload['id'] = saved_id;
        this.parcelInputRecords.push(payload);

        this.parcelOwnershipForm.reset();
        this.fetch_parcel_information(this.data_cleaning_request_id);
      });

    } else {
      this.parcelownershipformstatus = true;
    }
  }



  deleteparcelownerRow(index) {
    const selected_obj = index;
    const delete_payload = {
      'request_id': index.id
    };
    this.delete_parcel_owner(delete_payload).then((response) => {
      const matchedIndex = this.parcelInputRecords.map(function (obj) { return obj.id; }).indexOf(selected_obj);
      this.parcelInputRecords.splice(matchedIndex, 1);
      // this.fetch_parcel_information(this.request_id);
    });
  }

  editparcelownerRow(index) {
    const selected_obj = index.id;
    const matchedIndex = this.parcelInputRecords.map(function (obj) { return obj.id; }).indexOf(selected_obj);
    this.parcelOwnershipForm.patchValue(index);
    this.parcelInputRecords.splice(matchedIndex, 1);
    // this.fetch_parcel_information(this.request_id);
    this.show_parcel_owners_create = false;

  }
  updateparcelownerRow() {
    if (this.parcelOwnershipForm.valid) {
      this.parcelownershipformstatus = false;
      const payload = this.parcelOwnershipForm.value;
      payload['request_id'] = payload['id'];
      this.update_parcel_owner(payload).then((response) => {
        console.log('ownership info', response);
        const matchedIndex = this.parcelInputRecords.map(function (obj) { return obj.id; }).indexOf(response);
        this.parcelInputRecords.splice(matchedIndex, 1);
        const saved_id = response;
        payload['id'] = saved_id;
        this.parcelInputRecords.push(response);
        this.parcelOwnershipForm.reset();
        this.fetch_parcel_information(this.data_cleaning_request_id);
        this.show_parcel_owners_create = true;
      });

    } else {
      this.parcelownershipformstatus = true;
    }
  }
  filterdocuments() {
    this.request_id = '';
    this.data_cleaning_request_id = '';

    if (this.searchForm.valid) {
      this.document_details = [];
      const file_number_input = this.searchForm.value['search_value'];
      const search_payload = {
        'file_no': file_number_input
      };
      this.loadingService.showloading();
      this.cleanerService.getrecord(data_cleaning_file_filter_url, search_payload).subscribe((res) => {
        if (res) {
          // this.records = res;

          this.records = res['file_details'];
          const file_cleaning_status = res['file_cleaning_status'];
          this.reference_file_number = file_number_input;
          this.filenumberchange(file_number_input);
          if (!file_cleaning_status) {
            this.show_parcel_details_create = true;

            this.toastService.showToastNotification('error',
              'File Does Not Exist,Start File Cleaning', '');
            this.formInputRecords = [];
            this.parcelInputRecords = [];
            this.document_details = [];
            this.file_comment_records = [];
            this.startDataCleaningForm.reset();
            this.DocumentTypeForm.reset();
            this.parcelDetailsForm.reset();
            this.parcelOwnershipForm.reset();
            this.remarksForm.reset();


            this.start_file_cleaning_task = true;
          } else {
            this.start_file_cleaning_task = false;

            this.toastService.showToastNotification('success',
              'File Details Found', '');
            const data_cleaning_datasets = res['data_cleaning_datasets'];
            const document_status = data_cleaning_datasets['document_status'];

            this.reference_file_status = document_status;
            const document_id = data_cleaning_datasets['id'];
            this.data_cleaning_request_id = document_id;
            this.fetchfilecomments(this.data_cleaning_request_id);
            const documents_types_verified = data_cleaning_datasets['documents_verified'];
            this.formInputRecords = documents_types_verified;
            const parcel_ownership_info = data_cleaning_datasets['parcel_ownership_info'];
            const ownership_id = parcel_ownership_info['id'];

            const parcel_numbering_type = parcel_ownership_info['parcel_numbering_type'];
            const parcel_prefix = parcel_ownership_info['parcel_prefix'];
            const parcel_number = parcel_ownership_info['parcel_number'];
            const block_number = parcel_ownership_info['block_number'];
            const parcel_ownership_type = parcel_ownership_info['parcel_ownership_type'];
            const parcel_status = parcel_ownership_info['parcel_status'];
            const ir_number = parcel_ownership_info['ir_number'];
            const lr_number = parcel_ownership_info['lr_number'];
            const gla_number = parcel_ownership_info['gla_number'];

            const parcel_date_captured = parcel_ownership_info['date_captured'];
            const parcel_owners = parcel_ownership_info['parcel_owners'];
            // this.show_parcel_details_create = false;
            if (ownership_id) {
              this.show_parcel_details_create = false;
            } else {
              this.show_parcel_details_create = true;
            }
            this.fetch_owners_by_ownership_rights(ownership_id);
            this.parcel_ownership_request_id = ownership_id;
            const parcel_details_form_info = {
              'parcel_numbering_type': parcel_numbering_type,
              'parcel_prefix': parcel_prefix,
              'parcel_number': parcel_number,
              'block_number': block_number,
              'parcel_owner_type': parcel_ownership_type,
              'parcel_status': parcel_status,
              'ir_number': ir_number,
              'lr_number': lr_number,
              'gla_number': gla_number,


              'parcel_id': ownership_id,
              'id': ownership_id
            };
            const input_parcel_owners = [];
            if (parcel_owners) {
              for (const owners of parcel_owners) {
                const owners_obj = {
                  'id': owners['id'],
                  'parcel_system': owners['parcel_system'],
                  'owner_identification_type': owners['owner_identification_type'],
                  'owner_identification_number': owners['owner_identification_number'],
                  'owner_name': owners['owner_name'],
                  'share_denominator': owners['share_denominator'],
                  'share_numerator': owners['share_numerator'],
                  'entity_type': owners['entity_type'],
                  'ownership_rights': owners['ownership_rights'],

                };
                input_parcel_owners.push(owners_obj);

              }
            } else {

            }

            this.parcelInputRecords = input_parcel_owners;
            this.parcelDetailsForm.patchValue(parcel_details_form_info);
            this.ownership_type_change();
            this.parcel_type_change();
          }





          this.loadingService.hideloading();

        }

      });

    } else {
      this.toastService.showToastNotification('warning', 'Please correct errors to proceed', '');
    }
  }


  ngOnDestroy() {

  }
  fetchroles() {

    this.permissionsService.hasPermission('DATA_AUDITOR').then((res) => {
      console.log(res);
      // if (res) {
      //   // this.document_general_status = this.auditor_general_status;
      // } else {
      //   // this.document_general_status = this.cleaner_general_status;
      // }

    });



  }
  fetchdocumenttypes() {
    const payload = {

    };
    this.cleanerService.getrecord(fetch_user_document_types_url, payload).subscribe((records) => {
      this.department_documents = records;
    });
  }
  viewdetails(request_id) {
    this.selectTab(2);
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
    this.doc_url_reference = '';
    const payload = {
      'record_id': record_id,
      'document_id': this.request_id

    };
    this.cleanerService.getrecord(fetch_document_record_details_url, payload).subscribe((response) => {

      const preview_form = response['record_form']['fields'];
      const formcontrol_values = response['record_values'];
      this.doc_keyword = response['document_details']['document_keyword'];
      const doc_ref_id = response['document_details']['document'];

      this.doc_url_reference = doc_ref_id;
      // this.cdRef.detectChanges();
      const is_main_document = response['record_form']['is_main_document'];
      if (is_main_document) {
        this.is_main_document_field = true;

        const main_document_fields = response['record_form']['main_document_fields'];
        const main_forsm_name = main_document_fields['formgroup'];
        const patchvalues = response['record_values'];

        // this.mainDocumentForm.main_form_name = main_forsm_name;

        this.mainDocumentForm.showform(main_document_fields);
        this.mainDocumentForm.update_form_values(patchvalues);
        // this.update_values();
      } else {
        this.is_main_document_field = false;
        this.inputForm.initialize_form(preview_form);
        this.inputForm.setControlValue(formcontrol_values);
        //  if(this.can_edit_metadata){
        //  const save_button_value = {
        //    'field_no': '',
        //    'field_type': 'button',
        //    'input_type': 'button',
        //    'is_enforced': true,
        //    'is_mandatory': true,
        //    'label': 'Update',
        //    'name': 'save',
        //    'options': '',
        //    'validations': [],
        //    'width': 12
        //  };
        //  preview_form.push(save_button_value);
      }



    });
    this.createModal.show();

  }
  submitparcel() {
    const doc_type_length = this.formInputRecords.length;
    const parcel_length = this.parcelInputRecords.length;
    if (doc_type_length <= 0) {
      this.toastService.showToastNotification('error', 'Atleast One Record Is required', '');
      this.selectTab(3);
      this.documenttypeformstatus = true;

    } else if (!this.parcelDetailsForm.valid) {
      this.toastService.showToastNotification('error', 'Kindly Correct the errors highlighted to proceed', '');
      this.selectTab(4);
      this.parceldetailsformstatus = true;
    } else if (!this.remarksForm.valid) {
      this.toastService.showToastNotification('error', 'Kindly Correct the errors highlighted to proceed', '');
      this.selectTab(5);
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
  createcomment() {
    if (this.DocumentCommentForm.valid) {
      const action = this.DocumentCommentForm.value['action'];
      const success_message = '';
      const confirmation_message = 'Comment on Document?';

      const payload = {
        'document_id': this.request_id,
        'remarks': this.DocumentCommentForm.value['remarks'],
      };
      this.sweetalertService.showConfirmation('Confirmation', confirmation_message).then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.cleanerService.postrecord(create_document_comment_url, payload).subscribe((response) => {
            if (response) {
              this.loadingService.hideloading();
              this.viewdetails(this.request_id);
              this.toastService.showToastNotification('success', 'Success', '');
              this.DocumentCommentForm.reset();

              // this.selectTab(0);
            }
          });
          this.loadingService.hideloading();
        } else {

        }
      });
    } else {
      this.cleanerService.markFormAsDirty(this.DocumentCommentForm);
      this.toastService.showToastNotification('error', 'Kindly Correct the errors to proceed', '');
    }
  }

  filenumberchange(file_number) {

    const new_form_data = {
      'file_number': file_number

    };
    this.parcelDetailsForm.patchValue(new_form_data);

  }

  fetchfilerecords() {
    if (this.searchForm.valid) {
      const file_number_input = this.searchForm.value['search_value'];
      const search_payload = {
        'file_no': file_number_input
      };
      this.loadingService.showloading();
      this.cleanerService.getrecord(filter_document_by_file_url, search_payload).subscribe((res) => {
        if (res) {
          this.records = res;
          this.loadingService.hideloading();
        }

      });

    } else {
      this.toastService.showToastNotification('warning', 'Please correct errors to proceed', '');
    }
  }


  create_verified_document_types(payload: any) {
    return new Promise((resolve, reject) => {
      this.cleanerService.postrecord(cleaning_create_document_types_url, payload).subscribe((res) => {
        resolve(res);

      }, (err) => {
        reject(false);
      });
    });
  }
  delete_verified_document_types(payload: any) {
    return new Promise((resolve, reject) => {
      this.cleanerService.postrecord(cleaning_delete_document_types_url, payload).subscribe((res) => {
        resolve(true);

      }, (err) => {
        reject(false);
      });
    });
  }
  update_verified_document_types(payload: any) {
    return new Promise((resolve, reject) => {
      this.cleanerService.postrecord(cleaning_update_document_types_url, payload).subscribe((res) => {
        resolve(res);

      }, (err) => {
        reject(false);
      });
    });
  }


  create_new_parcel_owner(payload: any) {
    return new Promise((resolve, reject) => {
      this.cleanerService.postrecord(cleaning_create_parcel_owner_url, payload).subscribe((res) => {
        resolve(res);

      }, (err) => {
        reject(false);
      });
    });
  }
  delete_parcel_owner(payload: any) {
    return new Promise((resolve, reject) => {
      this.cleanerService.postrecord(cleaning_delete_parcel_owner_url, payload).subscribe((res) => {
        resolve(true);

      }, (err) => {
        reject(false);
      });
    });
  }
  update_parcel_owner(payload: any) {
    return new Promise((resolve, reject) => {
      this.cleanerService.postrecord(cleaning_edit_parcel_owner_url, payload).subscribe((res) => {
        resolve(res);

      }, (err) => {
        reject(false);
      });
    });
  }
  ownership_type_change() {
    const ownership_type = this.parcelDetailsForm.value['parcel_owner_type'];
    if (ownership_type === 'COMMON') {
      this.ownership_type_option = true;

    } else {

      this.ownership_type_option = false;
    }


  }
  parcel_type_change() {
    const parcel_type = this.parcelDetailsForm.value['parcel_numbering_type'];
    alert(parcel_type)
    if (parcel_type === 'IR') {
      this.show_ir_field = true;
      this.show_gla_field = false;
      this.show_block_field = false;
    }
    else if (parcel_type === 'PARCEL_NUMBER' || parcel_type === 'BLOCK_NUMBER' || parcel_type === 'PLOT_NUMBER') {
      this.show_block_field = true;
      this.show_gla_field = false;
      this.show_ir_field = false;


    }
    else if (parcel_type === 'GLA_NUMBER') {

      this.show_gla_field = true;
      this.show_block_field = false;
      this.show_ir_field = false;

    }


  }



  startdatacleaningTask() {
    if (!this.startDataCleaningForm.valid) {
      this.toastService.showToastNotification('error', 'Kindly Correct the errors highlighted to proceed', '');

      this.datacleaningstartformstatus = true;
    } else {
      const payload = {
        'department_id': this.startDataCleaningForm.value['department_id'],
        'file_number': this.searchForm.value['search_value']


      };
      this.sweetalertService.showConfirmation('Confirmation',
        'Do you wish to proceed starting cleaning exercise').then((res) => {
          if (res) {
            this.cleanerService.postrecord(start_data_cleaning_url, payload).subscribe((res) => {
              if (res) {
                this.toastService.showToastNotification('success',
                  'Successfully Started Cleaning', '');
                this.startDataCleaningForm.reset();
                this.datacleaningstartformstatus = false;
                this.filterdocuments();

              }
            });
          }
        });
    }


  }

  change_file_status() {
    if (!this.remarksForm.valid) {
      this.toastService.showToastNotification('error', 'Kindly Correct the errors highlighted to proceed', '');
      this.remarkformstatus = true;
    } else {
      const payload = {
        'remarks': this.remarksForm.value['remarks'],
        'general_status': this.remarksForm.value['general_status'],
        'request_id': this.data_cleaning_request_id


      };
      this.sweetalertService.showConfirmation('Confirmation',
        'Do you wish to proceed submitting the data').then((res) => {
          if (res) {
            this.cleanerService.postrecord(change_data_cleaning_file_status_url, payload).subscribe((res) => {
              if (res) {
                this.toastService.showToastNotification('success',
                  'Successfully Saved', '');
                this.startDataCleaningForm.reset();
                this.parcelDetailsForm.reset();
                this.remarksForm.reset();
                this.formInputRecords = [];
                this.parcelInputRecords = [];
                this.document_details = [];
                this.filterdocuments();
                this.selectTab(0);

              }
            });
          }
        });
    }


  }

  fetchfilecomments(file_request_id) {
    const search_payload = {
      'request_id': file_request_id
    };
    this.loadingService.showloading();
    this.cleanerService.getrecord(data_cleaning_file_comments_url, search_payload).subscribe((res) => {
      if (res) {
        this.file_comment_records = res;
        this.loadingService.hideloading();
      }

    });
  }

  fetch_parcel_information(file_request_id) {
    const search_payload = {
      'request_id': file_request_id
    };
    this.loadingService.showloading();
    this.cleanerService.getrecord(data_cleaning_fetch_file_parcel_information_url, search_payload).subscribe((res) => {
      if (res) {

        const parcel_info_id = res['id'];
        const parcel_numbering_type = res['parcel_numbering_type'];
        const parcel_prefix = res['parcel_prefix'];
        const parcel_number = res['parcel_number'];
        const block_number = res['block_number'];
        const parcel_ownership_type = res['parcel_ownership_type'];
        const parcel_status = res['parcel_status'];
        const ir_number = res['ir_number'];
        const lr_number = res['lr_number'];
        const gla_number = res['gla_number'];
        const parcel_owners = res['parcel_owners'];
        const parcel_ownership_details = {
          'parcel_numbering_type': parcel_numbering_type,
          'parcel_prefix': parcel_prefix,
          'parcel_number': parcel_number,
          'block_number': block_number,
          'parcel_owner_type': parcel_ownership_type,
          'parcel_status': parcel_status,
          'ir_number': ir_number,
          'lr_number': lr_number,
          'gla_number': gla_number,
          'parcel_id': parcel_info_id,
          'id': parcel_info_id
        };
        this.fetch_owners_by_ownership_rights(parcel_info_id);
        const input_parcel_owners = [];
        if (parcel_owners) {
          for (const owners of parcel_owners) {
            const owners_obj = {
              'id': owners['id'],
              'parcel_system': owners['parcel_system'],
              'owner_identification_type': owners['owner_identification_type'],
              'owner_identification_number': owners['owner_identification_number'],
              'owner_name': owners['owner_name'],
              'share_denominator': owners['share_denominator'],
              'share_numerator': owners['share_numerator'],
              'entity_type': owners['entity_type'],
              'ownership_rights': owners['ownership_rights'],

            };

            input_parcel_owners.push(owners_obj);

          }
        } else {

        }
        this.parcelInputRecords = input_parcel_owners;
        this.parcelDetailsForm.patchValue(parcel_ownership_details);
        this.ownership_type_change();
        this.parcel_type_change();
        this.loadingService.hideloading();


      }

    });
  }


  fetch_document_type_information(file_request_id) {
    const search_payload = {
      'request_id': file_request_id
    };
    this.loadingService.showloading();
    this.cleanerService.getrecord(data_cleaning_fetch_document_type_verification_information_url, search_payload).subscribe((res) => {
      this.formInputRecords = res;
      this.loadingService.hideloading();
    });
  }








  create_parcel_information() {
    if (!this.parcelDetailsForm.valid) {
      this.toastService.showToastNotification('error', 'Kindly Correct the errors highlighted to proceed', '');
      this.parceldetailsformstatus = true;
    } else {
      const payload = {
        'parcel_numbering_type': this.parcelDetailsForm.value['parcel_numbering_type'],
        'parcel_prefix': this.parcelDetailsForm.value['parcel_prefix'],
        'parcel_number': this.parcelDetailsForm.value['parcel_number'],
        'block_number': this.parcelDetailsForm.value['block_number'],
        'parcel_ownership_type': this.parcelDetailsForm.value['parcel_owner_type'],
        'parcel_status': this.parcelDetailsForm.value['parcel_status'],
        'parcel_id': this.parcelDetailsForm.value['parcel_id'],
        'ir_number': this.parcelDetailsForm.value['ir_number'],
        'lr_number': this.parcelDetailsForm.value['lr_number'],
        'gla_number': this.parcelDetailsForm.value['gla_number'],

        'request_id': this.data_cleaning_request_id


      };
      this.sweetalertService.showConfirmation('Confirmation',
        'Do you wish to proceed submitting the data').then((res) => {
          if (res) {
            this.cleanerService.postrecord(cleaning_create_parcel_information_url, payload).subscribe((res) => {
              if (res) {
                this.toastService.showToastNotification('success',
                  'Successfully Saved', '');
                this.parcelDetailsForm.reset();
                this.fetch_parcel_information(this.data_cleaning_request_id);

              }
            });
          }
        });
    }


  }

  update_parcel_information() {
    if (!this.parcelDetailsForm.valid) {
      this.toastService.showToastNotification('error', 'Kindly Correct the errors highlighted to proceed', '');
      this.parceldetailsformstatus = true;
    } else {
      const payload = {
        'parcel_numbering_type': this.parcelDetailsForm.value['parcel_numbering_type'],
        'parcel_prefix': this.parcelDetailsForm.value['parcel_prefix'],
        'parcel_number': this.parcelDetailsForm.value['parcel_number'],
        'block_number': this.parcelDetailsForm.value['block_number'],
        'parcel_ownership_type': this.parcelDetailsForm.value['parcel_owner_type'],
        'parcel_status': this.parcelDetailsForm.value['parcel_status'],
        'parcel_id': this.parcelDetailsForm.value['parcel_id'],
        'ir_number': this.parcelDetailsForm.value['ir_number'],
        'lr_number': this.parcelDetailsForm.value['lr_number'],
        'gla_number': this.parcelDetailsForm.value['gla_number'],



        'request_id': this.parcelDetailsForm.value['parcel_id']


      };
      this.sweetalertService.showConfirmation('Confirmation',
        'Do you wish to proceed submitting the data').then((res) => {
          if (res) {
            this.cleanerService.postrecord(cleaning_edit_parcel_information_url, payload).subscribe((res) => {
              if (res) {
                this.toastService.showToastNotification('success',
                  'Successfully Saved', '');
                this.parcelDetailsForm.reset();
                this.fetch_parcel_information(this.data_cleaning_request_id);

              }
            });
          }
        });
    }


  }
  addparcelbeneficiaryRow() {
    if (this.beneficiaryForm.valid) {
      this.beneficiaryformstatus = false;
      const payload = this.beneficiaryForm.value;
      // payload['request_id'] = this.beneficiaryForm.value['parcel_id'];
      this.create_new_parcel_beneficiary(payload).then((response) => {
        const saved_id = response;
        payload['id'] = saved_id;
        this.beneficiaryInputRecords.push(response);
        this.beneficiaryForm.reset();
        this.fetch_parcel_information(this.data_cleaning_request_id);
      });

    } else {
      this.beneficiaryformstatus = true;
    }
  }

  create_new_parcel_beneficiary(payload: any) {
    return new Promise((resolve, reject) => {
      this.cleanerService.postrecord(cleaning_create_parcel_beneficiary_url, payload).subscribe((res) => {
        resolve(res);

      }, (err) => {
        reject(false);
      });
    });
  }

  editparcelBeneficiaryRow(index) {
    const selected_obj = index.id;
    const matchedIndex = this.beneficiaryInputRecords.map(function (obj) { return obj.id; }).indexOf(selected_obj);
    this.beneficiaryForm.patchValue(index);
    this.beneficiaryInputRecords.splice(matchedIndex, 1);
    // this.fetch_parcel_information(this.request_id);
    this.show_beneficiary_create = false;

  }
  deleteparcelBeneficiaryRow(index) {
    const selected_obj = index;
    const delete_payload = {
      'request_id': index.id
    };
    this.delete_parcel_owner_beneficiary(delete_payload).then((response) => {
      const matchedIndex = this.beneficiaryInputRecords.map(function (obj) { return obj.id; }).indexOf(selected_obj);
      this.beneficiaryInputRecords.splice(matchedIndex, 1);
      // this.fetch_parcel_information(this.request_id);
    });
  }

  delete_parcel_owner_beneficiary(payload: any) {
    return new Promise((resolve, reject) => {
      this.cleanerService.postrecord(cleaning_delete_parcel_beneficiary_url, payload).subscribe((res) => {
        resolve(true);

      }, (err) => {
        reject(false);
      });
    });
  }
  update_parcel_beneficiary(payload: any) {
    return new Promise((resolve, reject) => {
      this.cleanerService.postrecord(cleaning_edit_parcel_beneficiary_url, payload).subscribe((res) => {
        resolve(res);

      }, (err) => {
        reject(false);
      });
    });
  }
  updateparcelBeneficiaryRow() {
    if (this.beneficiaryForm.valid) {
      this.beneficiaryformstatus = false;
      const payload = this.beneficiaryForm.value;
      payload['request_id'] = payload['id'];
      this.update_parcel_beneficiary(payload).then((response) => {
        console.log('ownership info', response);
        const matchedIndex = this.beneficiaryInputRecords.map(function (obj) { return obj.id; }).indexOf(response);
        this.beneficiaryInputRecords.splice(matchedIndex, 1);
        const saved_id = response;
        this.beneficiaryInputRecords.push(response);
        this.beneficiaryForm.reset();
        this.fetch_parcel_information(this.data_cleaning_request_id);
        this.show_beneficiary_create = true;
      });

    } else {
      this.beneficiaryformstatus = true;
    }
  }

}
