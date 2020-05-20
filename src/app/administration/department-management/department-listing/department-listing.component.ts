import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import {
  edit_department_url, list_department_url, create_department_url,
  delete_department_url, department_detail_url
} from '../../../app.constants';
import { Department } from '../../interfaces/administration';
import { AdministrationService } from '../../services/administration.service';
@Component({
  selector: 'app-department-listing',
  templateUrl: './department-listing.component.html',
  styleUrls: ['./department-listing.component.scss']
})

export class DepartmentListingComponent implements OnInit {
  public createRecordForm: FormGroup;
  public editRecordForm: FormGroup;
  validation_messages: any;
  formSubmitted = false;
  tenant_tag: string;
  deletereferenceid: any;
  selectedRow: any;
  selectedAll: boolean = false;

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
    public sweetalertService: SweetalertService) {
    this.selectedRow = [];
    this.createRecordForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      keyword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      application_name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
    });
    this.editRecordForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      keyword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      application_name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
    });

  }
  ngOnInit(): void {
    this.fetchRecords();
  }
  selectRecord(event, recordinstance) {
    if (event.currentTarget.checked == true) {
      console.log('changed value' + event.currentTarget.checked);
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
  assign_role() {
    console.log(this.selectedRow);
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

    };
    this.administrationService.getrecords(list_department_url, params).subscribe((res) => {
      this.records = res;

      this.loadingService.hideloading();

    });
  }

  editRecord(objectinstance) {
    const filter_params = {
      'request_id': objectinstance
    };
    this.administrationService.getrecords(department_detail_url, filter_params).subscribe((res) => {
      const forminstance = {
        'id': res['id'],
        'name': res['name'],
        'keyword': res['keyword'],
        'application_name': res['application_name'],


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
          this.administrationService.deleterecord(delete_department_url, filter_params).subscribe((res) => {

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
      this.formSubmitted = true;
      this.toastService.showToastNotification('error',
        'Kindly Correct the errors highlighted to proceed', '');

    } else {
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed creating record?').then((res) => {
        if (res) {
          const payload = {
            'name': this.createRecordForm.get('name').value,
            'keyword': this.createRecordForm.get('keyword').value,
            'application_name': this.createRecordForm.get('application_name').value

          };

          this.administrationService.postrecord(create_department_url, payload).subscribe((data) => {
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

  viewDocumentTypes(request_id) {
    this.router.navigate(['administration/document-type-listing', request_id]);

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
            'application_name': this.editRecordForm.get('application_name').value
          };
          this.administrationService.updaterecord(edit_department_url, payload).subscribe((data) => {
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
