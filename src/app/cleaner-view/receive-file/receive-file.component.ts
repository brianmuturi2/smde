import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { CleanerService } from '../services/cleaner.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { list_department_url } from '../../app.constants';
@Component({
  selector: 'app-receive-file',
  templateUrl: './receive-file.component.html',
  styleUrls: ['./receive-file.component.scss']
})
export class ReceiveFileComponent implements OnInit {
  public receiveFileForm: FormGroup;
  all_departments = [];
  formstatus= false;
  constructor(public formBuilder:FormBuilder,
    public cleanerService:CleanerService,
    public toastService:ToastService,
    public loadingService:LoadingService,
    public sweetalertService:SweetalertService) {
    this.receiveFileForm = this.formBuilder.group({
      file_number: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(200) ])),
      department: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(200) ])),
    });
   }

  ngOnInit() {
    this.fetch_departments();
    

  }
  fetch_departments(){
    const payload = {};
    this.loadingService.showloading();
    this.cleanerService.getrecord(list_department_url,payload).subscribe((res)=>{
      this.all_departments = res;
      this.loadingService.hideloading();
    })
  }
  receivefile(){
    alert("sdsd")
  }

}
