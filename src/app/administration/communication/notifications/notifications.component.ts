import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import {
  create_notifications_url,edit_notifications_url,list_notifications_url,
  delete_notifications_url,detail_notifications_url
} from '../../../app.constants';
import { Department } from '../../interfaces/administration';
import { AdministrationService } from '../../services/administration.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
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
      headline: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      message: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(1000)])),
      order: new FormControl('', Validators.compose([Validators.required])),
      is_visible: new FormControl('', Validators.compose([Validators.required])),
    });
    this.editRecordForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      headline: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      message: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(1000)])),
      order: new FormControl('', Validators.compose([Validators.required])),
      is_visible: new FormControl('', Validators.compose([Validators.required])),
    });
  }
  ngOnInit(): void {
    this.fetchRecords();
 


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
      const matchedIndex = this.selectedRow.map(function (obj) {
        return obj.id; }).indexOf(selected_obj);
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
    this.administrationService.getrecords(list_notifications_url,
      params).subscribe((res) => {
      this.records = res;


      this.loadingService.hideloading();

    });
  }

  editRecord(objectinstance) {
    const filter_params = {
      'request_id': objectinstance
    };

    this.administrationService.getrecords(detail_notifications_url,
      filter_params).subscribe((res) => {

      const forminstance = {

        'id': res['id'],
        'headline': res['headline'],
        'message': res['message'],
        'order': res['order'],
        'is_visible': this.administrationService.getreverseBoolean(res['is_visible'])

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
          this.administrationService.deleterecord(delete_notifications_url,
            filter_params).subscribe((res) => {

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
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed creating record?').then((res) => {
        if (res) {
          const payload = {
            'headline': this.createRecordForm.get('headline').value,
            'message': this.createRecordForm.get('message').value,
            'order': this.createRecordForm.get('order').value,
            'is_visible':
             this.administrationService.getBoolean(this.createRecordForm.get('is_visible').value)

          };

        

          this.administrationService.postrecord(create_notifications_url,
            payload).subscribe((data) => {
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
    this.router.navigate(['administration/document-field-listing',
     this.department_id , request_id]);

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
            'headline': this.editRecordForm.get('headline').value,
            'message': this.editRecordForm.get('message').value,
            'order': this.editRecordForm.get('order').value,
            'is_visible':
             this.administrationService.getBoolean(this.editRecordForm.get('is_visible').value)
          };
console.log(payload)
          this.administrationService.updaterecord(edit_notifications_url, payload).subscribe((data) => {
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
