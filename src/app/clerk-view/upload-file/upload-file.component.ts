import { Component, OnInit } from '@angular/core';
import {SurveyService } from '../services/survey.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../common-module/shared-service/loading.service';
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

documentName: string;
fileData: File = null;
  constructor(public loadingService: LoadingService, private router: Router,
    public surveyService: SurveyService, private toastService: ToastService,
    public sweetalertsService: SweetalertService) { }

  ngOnInit(): void {
  }
  handleFileupload(e) {
    this.fileData = e.target.files[0];

  }
  saveformData() {


        this.loadingService.showloading();
        const formData  =  new FormData();
    formData.append('document', this.fileData);
    this.surveyService.uploadFile(formData).subscribe(res => {

      this.toastService.showToastNotification('success', 'Upload Successful', '');
      // this.sweetalertsService.showAlert('Success', 'File Has Been Successfully Uploaded', 'success');
      this.loadingService.hideloading();
      this.router.navigate(['clerk-view/upload-file']);



    });
    // this.sweetalertsService.showConfirmation('File Upload','Upload the selected file?').then((res)=>{
    //   if(res){
    //     this.loadingService.showloading();
    //     const formData  =  new FormData();
    // formData.append('document',this.fileData);
    // this.surveyService.uploadFile(formData).subscribe(res =>{

    //   // this.toastService.showToastNotification('success','File Successfully uploaded','')
    //   this.sweetalertsService.showAlert('Success','File Has Been Successfully Uploaded','success');
    //   this.loadingService.hideloading();
    //   this.router.navigate(['clerk-view/upload-file']);




    // });
    //   }

    // });




  }


}
