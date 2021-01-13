import { Component, ViewEncapsulation } from '@angular/core';
import { SpecialService } from './special.service';
import { AddDocument } from './add-Document';
import { IReport } from './IReport';
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
  reportDataErrors;
  reportsData: IReport[] = [];
  uploadedPdfId = null;
  uploadedPdfUrl = null;
  urlError = false;
  // step 2 variables
  signatories = [];
  addSignatory = [];
  signed = null;
  sigName = null;
  sigDate = null;
  sigDesignation = null;
  counter = 0;
  instanceId = null;

  _reportFilter: string;

  get reportFilter(): string {
    return this._reportFilter;
  }
  set reportFilter(value:string) {
    this._reportFilter = value;
    if (value === "" || value === null) {
      this.filteredReports = this.reports
    } else {
      this.filteredReports = this.reportFilter ? this.performFilter(this.reportFilter) : this.reportsData;
    }   
  }

  filteredReports:IReport[];
 
  constructor(private api: SpecialService, public toastService: ToastService, private modalService: NgbModal, public loadingService: LoadingService, private router: Router,) {
    this.getReports();
    this.getDocumentTypes();
  }

  
  performFilter(filterBy: string): IReport[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.reports.filter((data: IReport) =>
      data.report.original_file_name.toLocaleLowerCase().indexOf(filterBy) !== -1);    
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
    this.addSignatory = [this.sigName,this.signed,this.sigDate,this.sigDesignation]
    let status = true;
    for(var data of this.addSignatory)
    { 
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
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/land-special']);
  }


  handleFileupload(e) {
    this.fileData = e.target.files[0];
  }


  saveformData() {
    this.loadingService.showloading();
    const formData  =  new FormData();

    formData.append('document', this.fileData);


    if (this.documentType !== null) {
      formData.append('documentType', this.documentType);
    }  
    if (this.uploadedPdfId !== null) {
      formData.append('pdfId', this.uploadedPdfId);
    }  
    
    const signatories = {'signatories': this.signatories}

    this.api.uploadFile(formData,this.documentType).subscribe(res => {

      if (res['uploaded_pdf_id']) {
        this.uploadedPdfId = res['uploaded_pdf_id'];
        this.uploadedPdfUrl = res['uploaded_pdf_url'];
        this.toastService.showToastNotification('success', 'Upload Successful', '');
      }

      if (res['instanceId']) {
        const instanceId = res['instanceId'];
        this.saveSignatories(signatories,instanceId)
        this.uploadedPdfUrl = null;
        this.signatories = [];
        this.toastService.showToastNotification('success', 'Document successfully submitted for processing...', '');
        this.reloadComponent();
      }      
      
      this.getReports();
      this.loadingService.hideloading();
    },
      error => {
        if (error) 
        {
          this.uploadedPdfUrl = null;
          this.signatories = null;
          this.urlError = true;
        }      
      }
    );
  }


  saveSignatories = (signatories,instanceId) => {
    this.api.saveSignatories(signatories,instanceId).subscribe(
      data => {
      },
      error => {
        console.log(error);
      }
    );
  }

  getReports = () => {
    this.api.getReports().subscribe(
      data => {
        this.reports = data;
        this.filteredReports = data
        // console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  getDocumentTypes = () => {
    this.api.getDocumentTypes().subscribe(
      data => {
        this.documentTypes = data
        this.departmentId = data[0]['id']
      },
      error => {
        console.log(error);
      }
    );
  }


  getDocumentTypesFields = (departmentId) => {
    this.api.getDocumentTypesFields(departmentId ).subscribe(
      data => {
        // console.log(data)
        
      },
      error => {
        console.log(error);
      }
    );
  }

  reportClicked = (reportId) => {
    // console.log(reportId);
    this.api.reportClicked(reportId).subscribe(
      data => {
        // console.log(data)
        this.reportData = data['record'];
        this.reportDataErrors = data['errors'];
      },
      error => {
        console.log(error);
      }
    );
  }




}
