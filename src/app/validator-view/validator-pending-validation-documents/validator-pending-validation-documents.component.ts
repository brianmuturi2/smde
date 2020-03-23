import { Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ValidatorService } from '../services/validator.service';
import { LoadingService } from '../../survey-department/shared-service/loading.service';
import { ToastService } from '../../survey-department/shared-service/toast.service';
import { filter_document_by_file_url } from '../../app.constants';
import { Subject } from 'rxjs';
import { DocumentsList } from '../interfaces/validator';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
@Component({
  selector: 'app-validator-pending-validation-documents',
  templateUrl: './validator-pending-validation-documents.component.html',
  styleUrls: ['./validator-pending-validation-documents.component.css']
})
export class ValidatorPendingValidationDocumentsComponent implements OnInit,OnDestroy {
  public searchForm: FormGroup;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  public dtTrigger = new Subject<any>();
  records: DocumentsList[] = [];
  constructor(private router: Router,private loadingService:LoadingService,public toastService:ToastService,public validatorService:ValidatorService,private formBuilder: FormBuilder,) {
    this.searchForm = this.formBuilder.group({
      search_value: new FormControl('', Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(100) ])),
    });
   }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      retrieve:true,
  


    }; 
   
  }
  filterdocuments(){
    if(this.searchForm.valid){
      let search_payload = {
        "file_no":this.searchForm.value['search_value']
      };
      this.loadingService.showloading();
      this.validatorService.getrecords(filter_document_by_file_url,search_payload).subscribe((res)=>{
        if(res){
          this.records = res;
          this.loadingService.hideloading();
          // this.rerenderTable();
    
          this.dtTrigger.next();
        }

      });

    }else{
      this.toastService.showToastNotification("warning","Please correct errors to proceed","")
    }
  }

   rerenderTable(): void {
     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       // Destroy the table first
       dtInstance.destroy();
     },(err)=>{
      this.toastService.showToastNotification("error","No Records Found","")

     });
   }
   
   ngOnDestroy() {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //   }
  // );
  
}
   viewdetails(request_id){
     this.router.navigate(['validator-view/validator-document-details',request_id]);

   }

}
