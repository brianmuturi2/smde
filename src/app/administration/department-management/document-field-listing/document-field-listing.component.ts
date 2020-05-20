import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import {
  edit_document_fields_url, list_document_fields_url, create_document_fields_url,
   list_department_url,
   delete_document_fields_url, detail_document_fields_url, list_input_types_url
} from '../../../app.constants';
import { Department } from '../../interfaces/administration';
import { AdministrationService } from '../../services/administration.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-document-field-listing',
  templateUrl: './document-field-listing.component.html',
  styleUrls: ['./document-field-listing.component.scss']
})
export class DocumentFieldListingComponent implements OnInit {
  public createRecordForm: FormGroup;
  public editRecordForm: FormGroup;
  validation_messages: any;
  formSubmitted = false;
  tenant_tag: string;
  deletereferenceid: any;
  selectedRow: any;
  selectedAll: boolean = false;
  department_id: string;
  document_type_id: string;
  input_type_list = [];
  document_type_name: any;
  department_name: any;
  private modalRef: NgbModalRef;
  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('editModal') public editModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;
  records: Department[] = [];
  searchString: string;
  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal, private loadingService: LoadingService,
    private router: Router, public toastService: ToastService,
    public active_router: ActivatedRoute,
    public sweetalertService: SweetalertService) {
    this.selectedRow = [];
    this.createRecordForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      label: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      input_type: new FormControl('', Validators.compose([Validators.required])),
      field_type: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      options: new FormControl('', ),
      width: new FormControl('', Validators.compose([Validators.required])),
      field_no: new FormControl('', Validators.compose([Validators.required])),
      is_mandatory: new FormControl('', Validators.compose([Validators.required])),
      is_enforced: new FormControl('', Validators.compose([Validators.required])),
    });
    this.editRecordForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      label: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      input_type: new FormControl('', Validators.compose([Validators.required])),
      field_type: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      options: new FormControl('', ),
      width: new FormControl('', Validators.compose([Validators.required])),
      field_no: new FormControl('', Validators.compose([Validators.required])),
      is_mandatory: new FormControl('', Validators.compose([Validators.required])),
      is_enforced: new FormControl('', Validators.compose([Validators.required])),
    });
    this.department_id = this.active_router.snapshot.paramMap.get('department_id');
    this.document_type_id = this.active_router.snapshot.paramMap.get('document_type_id');
  }
  ngOnInit(): void {
    this.fetchRecords();
    this.fetchinputtypes();


  }
  fetchinputtypes() {
    const params = {

    };
    this.administrationService.getrecords(list_input_types_url, params).subscribe((res) => {
      this.input_type_list = res;
      this.loadingService.hideloading();

    }, (err) => {
      this.loadingService.hideloading();

    });

  }
  selectRecord(event, recordinstance) {
    if (event.currentTarget.checked == true) {
      if (typeof (recordinstance) == 'undefined') {
        this.selectedAll = !this.selectedAll;
        this.selectedRow = [];
      } else {

        this.selectedRow.push(recordinstance);
      }
    } else {

      const selected_obj = recordinstance.id;
      const matchedIndex = this.selectedRow.map(function (obj) { return obj.id; }).indexOf(selected_obj);
      this.selectedRow.splice(matchedIndex, 1);


    }

  }


  openPopup(content, type) {

    this.ngbModal.open(content);

  }

  closeAllPopups() {
    this.modalRef.close();

  }
  resetForm() {
    this.createRecordForm.reset();
    this.formSubmitted = false;
  }



  fetchRecords() {
    this.loadingService.showloading();
    const params = {
      'document_type_id': this.document_type_id,

    };
    this.administrationService.getrecords(list_document_fields_url, params).subscribe((res) => {
      this.records = res['fields'];
      this.document_type_name = res['document_type']['name'];
      this.department_name = res['document_type']['department']['name'];


      this.loadingService.hideloading();

    });
  }

  editRecord(objectinstance) {
    const filter_params = {
      'request_id': objectinstance
    };

    this.administrationService.getrecords(detail_document_fields_url, filter_params).subscribe((res) => {

      const forminstance = {
        'id': res['id'],
        'name': res['name'],
        'keyword': res['keyword'],
        'model': res['model'],
        'is_visible': this.administrationService.getreverseBoolean(res['is_visible']),
        'department_id': res['department']['id'],


      };
      this.editRecordForm.setValue(forminstance);
      this.editModal.show();
    });
  }
  deleteInstanceRecord() {
    const filter_params = {
      'request_id': this.deletereferenceid
    };
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed deleting record? This process is irreversible').then((res) => {
        if (res) {
          this.administrationService.deleterecord(delete_document_fields_url, filter_params).subscribe((res) => {

            this.toastService.showToastNotification('success', 'Successfully Deleted', '');
            this.deleteModal.hide();
            this.fetchRecords();
          });
        }
      });

  }

  deleteRecord(objectinstance) {
    this.deletereferenceid = objectinstance;
    this.deleteModal.show();
  }
  createRecord() {
    if (this.createRecordForm.invalid) {
      console.log(this.createRecordForm.value);
      this.formSubmitted = true;
      this.toastService.showToastNotification('error',
        'Kindly Correct the errors highlighted to proceed', '');

    } else {
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed creating record?').then((res) => {
        if (res) {
          const payload = {
            'name': this.createRecordForm.get('name').value,
            'keyword': this.createRecordForm.get('keyword').value,
            'model': this.createRecordForm.get('model').value,
            'department': this.department_id,
            'is_visible': this.administrationService.getBoolean(this.createRecordForm.get('is_visible').value)
          };

          this.administrationService.postrecord(create_document_fields_url, payload).subscribe((data) => {
            if (data) {
              this.fetchRecords();
              this.toastService.showToastNotification('success', 'Successfully Created', '');
              this.createRecordForm.reset();
              this.createModal.hide();
            }

          });

        }
      });

    }
  }

  viewDocumentFields(request_id) {
    this.router.navigate(['administration/document-field-listing', this.department_id , request_id]);

  }
  saveEditChanges() {
    if (this.editRecordForm.invalid) {
      this.formSubmitted = true;

    } else {
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed updating record?').then((res) => {
        if (res) {

          const payload = {
            'request_id': this.editRecordForm.get('id').value,
            'name': this.editRecordForm.get('name').value,
            'keyword': this.editRecordForm.get('keyword').value,
            'model': this.editRecordForm.get('model').value,
            'department': this.editRecordForm.get('department_id').value,
            'is_visible': this.administrationService.getBoolean(this.editRecordForm.get('is_visible').value)
          };

          this.administrationService.updaterecord(edit_document_fields_url, payload).subscribe((data) => {
            if (data) {
              this.fetchRecords();
              this.toastService.showToastNotification('success', 'Successfully Updated', '');
              this.editRecordForm.reset();
              this.editModal.hide();
            }

          });
        }
      });

    }
  }

}
