import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { CleanerService } from '../services/cleaner.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { filter_document_by_file_url } from '../../app.constants';
import { Subject } from 'rxjs';
import { DocumentList } from '../interfaces/cleaner';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-cleaner-capture-data',
  templateUrl: './cleaner-capture-data.component.html',
  styleUrls: ['./cleaner-capture-data.component.scss']
})
export class CleanerCaptureDataComponent implements OnInit, OnDestroy {
  public searchForm: FormGroup;
  public datacleaningForm: FormGroup;
  public isDocumentSearchCollapsed = false;
  public isDocumentTypeCollapsed = false;
  public isParcelCollapsed = false;
  records: DocumentList[] = [];
  public DocumentTypeForm: FormGroup;
  department_documents = [
    {
    'id': 'certificateoftitle',
    'name': 'Certificate of Title'
  },
  {
    'id': 'grant',
    'name': 'Grant'
  },
  {
    'id': 'leasedocument',
    'name': 'Lease Document'
  }
];
validation_status = [
  {
    'id': 'yes',
    'name': 'Yes'
  },
  {
    'id': 'no',
    'name': 'No'
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
  formInputRecords = [];
  searchString: string;
  docsearchString: string;
  constructor(private router: Router, private loadingService: LoadingService,
     public toastService: ToastService, public cleanerService: CleanerService,
     private formBuilder: FormBuilder, ) {
    this.searchForm = this.formBuilder.group({
      search_value: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100) ])),
    });
    this.datacleaningForm = this.formBuilder.group({
      search_value: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100) ])),
    });
    this.DocumentTypeForm = this.formBuilder.group({
      document_type: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100) ])),
      validity_status: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100) ])),
      document_type_remarks: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100) ])),
    });
   }

  ngOnInit(): void {



  }
  addRow() {
    const payload = this.DocumentTypeForm.value;
    console.log('>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<', payload);
    payload['id'] = Number(new Date());
    this.formInputRecords.push(payload);

    this.DocumentTypeForm.reset();
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

    this.DocumentTypeForm.patchValue(index);
    this.formInputRecords.splice(matchedIndex, 1);



  }
  filterdocuments() {
    if (this.searchForm.valid) {
      const search_payload = {
        'file_no': this.searchForm.value['search_value']
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


   ngOnDestroy() {

}
   viewdetails(request_id) {
     this.router.navigate(['validator-view/validator-document-details', request_id]);

   }

}
