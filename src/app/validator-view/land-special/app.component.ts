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
  reports
  documentType


  

  constructor(private api: SpecialService, public toastService: ToastService, private modalService: NgbModal, public loadingService: LoadingService, private router: Router,) {
    this.getReports();
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
    formData.append('document1', this.fileData);
    formData.append('document2', this.fileData2);
    formData.append('documentType', this.documentType);

    this.api.uploadFile(formData).subscribe(res => {

      this.toastService.showToastNotification('success', 'Upload Successful', '');
      this.getReports();
      // this.sweetalertsService.showAlert('Success', 'File Has Been Successfully Uploaded', 'success');
      this.loadingService.hideloading();
      // this.router.navigate(['/land-special']);
    });
  }


  getReports = () => {
    this.api.getReports().subscribe(
      data => {
        console.log(data)
        this.reports = data
      },
      error => {
        console.log(error);
      }
    );
  }




}
