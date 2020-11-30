import { Component, ViewEncapsulation } from '@angular/core';
import { SpecialService } from './special.service';
import { AddDocument } from './add-Document';
import { ITrust } from './trust';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  // styleUrls: ['./app.component.css'],
  // template: '<router-outlet></router-outlet>',
  providers: [SpecialService]
})

export class SpecialComponent {

  leveloneData: ITrust[] = [];

  addDocumentModel = new AddDocument(null,null);
  fileData: File = null;
  fileData2: File = null;
  documentName1: string;
  documentName2: string;
  reports;
  documentType = null;
  documentTypes;
  departmentId = null
  reportData;
  uploadedPdfId = null;
  uploadedPdfUrl = null;
  // step 2 variables
  signatories = [];
  addSignatory = [];
  signed = null;
  sigName = null;
  sigDate = null;
  sigDesignation = null;
  counter = 0;
  


  

  constructor(private api: SpecialService, public toastService: ToastService, private modalService: NgbModal, public loadingService: LoadingService, private router: Router,) {
    this.getReports();
    this.getDocumentTypes();
  }

  resetSignatory() {
    this.signed = null;
    this.sigName = null;
    this.sigDate = null;
    this.sigDesignation = null;
  }

  incrementCounter() {
    this.counter += 1;
    console.log(this.counter);
  }

  deleteSignatory(counter) {
    console.log(counter);
  }

  addSignatories = () => {
    console.log(this.signatories);
    this.addSignatory = [this.sigName,this.signed,this.sigDate,this.sigDesignation]
    let status = true;
    for(var data of this.addSignatory)
    { 
        console.log(data);  
        if (data === null)
        {
          this.toastService.showToastNotification('error', 'Fill All Signatory Detatils', '');
          status = false;
          break;
        } 
    }
    if (status === true) 
    {
      let addSignatory = {'name':this.sigName, 'signed':this.signed, 'date':this.sigDate, 'designation': this.sigDesignation}
      this.signatories.push(addSignatory);
      this.resetSignatory();
    }
    console.log(this.signatories);
  }

  handleFileupload(e) {
    this.fileData = e.target.files[0];
  }
  handleFileupload2(e) {
    this.fileData2 = e.target.files[0];
  }

  saveformData() {
    console.log(this.documentType);
    this.loadingService.showloading();
    const formData  =  new FormData();

    formData.append('document', this.fileData);

    if (this.documentType !== null) {
      formData.append('documentType', this.documentType);
    }  
    
    if (this.signatories.length > 0) {
      formData.append('documentType', this.documentType);
    }  

    this.api.uploadFile(formData, this.documentType, this.signatories).subscribe(res => {
      console.log(res);

      if (res['uploaded_pdf_id']) {
        this.uploadedPdfId = res['uploaded_pdf_id'];
        this.uploadedPdfUrl = res['uploaded_pdf_url'];
      }
      
      this.toastService.showToastNotification('success', 'Upload Successful', '');
      this.getReports();
      this.loadingService.hideloading();
    });
  }


  getReports = () => {
    this.api.getReports().subscribe(
      data => {
        this.reports = data
        // console.log(data)
      },
      error => {
        console.log(error);
      }
    );
  }

  getDocumentTypes = () => {
    this.api.getDocumentTypes().subscribe(
      data => {
        // console.log(data)
        this.documentTypes = data
        this.departmentId = data[0]['id']
        // console.log(this.departmentId)
        // this.getDocumentTypesFields(this.departmentId);

      },
      error => {
        console.log(error);
      }
    );
  }


  getDocumentTypesFields = (departmentId) => {
    this.api.getDocumentTypesFields(departmentId ).subscribe(
      data => {
        console.log(data)
        
      },
      error => {
        console.log(error);
      }
    );
  }

  reportClicked = (reportId) => {
    this.api.reportClicked(reportId).subscribe(
      data => {
        console.log(data)
        this.reportData = data;
      },
      error => {
        console.log(error);
      }
    );
  }




}
