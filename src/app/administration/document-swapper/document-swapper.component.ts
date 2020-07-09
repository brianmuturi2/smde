import { Component, OnInit } from '@angular/core';
import { list_department_url,list_document_types_url,
  post_document_swap_url } from '../../app.constants';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { AdministrationService } from '../services/administration.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-document-swapper',
  templateUrl: './document-swapper.component.html',
  styleUrls: ['./document-swapper.component.scss']
})
export class DocumentSwapperComponent implements OnInit {
  public filterForm: FormGroup;
  public filterformstatus = false;
  public document_types = [];
  public department_records:[];
  public document_status = [
    {
      "id":"DOCUMENT_UPLOADED",
      "name":"DOCUMENT_UPLOADED",
     },
     {
      "id":"DOCUMENT_RECAPTURE",
      "name":"DOCUMENT_RECAPTURE",
     },
     
     {
      "id":"DATA_CAPTURED",
      "name":"DATA_CAPTURED",
     },
     {
      "id":"DATA_PREVALIDATION",
      "name":"DATA_PREVALIDATION",
     },
     {
      "id":"DATA_VALIDATION",
      "name":"DATA_VALIDATION",
     },
     {
      "id":"DATA_RESUBMITTED",
      "name":"DATA_RESUBMITTED",
     },
     {
      "id":"ESCALATED",
      "name":"ESCALATED",
     },
     {
      "id":"APPROVED",
      "name":"APPROVED",
     },
     {
      "id":"REJECTED",
      "name":"REJECTED",
     },
     {
      "id":"PENDING_REVOKATION",
      "name":"PENDING_REVOKATION",
     }
];
  constructor( private formBuilder: FormBuilder,
    public administrationService: AdministrationService,
    private loadingService: LoadingService,
     public toastService: ToastService,
    public sweetalertService: SweetalertService) { 
      this.filterForm = this.formBuilder.group({
        department_name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
        document_type: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
        new_document_status: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
        file_number:new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      });

    }

  ngOnInit() {
    this.fetchDepartments();
  }
  fetchDepartmentRecords(event){
    const payload = {
      "department_id":event
    };
    this.administrationService.getrecords(list_document_types_url,payload).subscribe((res)=>{
      this.document_types =res; 
    });
   


  }
  fetchDepartments() {
    this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(list_department_url, params).subscribe((res) => {
      this.department_records = res;

      this.loadingService.hideloading();

    });
  }
  swapDocument(){
    const default_password = 'edms2020#?DocumentConsole??@@@';
    // const default_password = '1234';
    if(this.filterForm.valid){
      this.sweetalertService.
    showConfirmation("warning","Kindly Note that this process is irreversible").then(
      (res)=>{

        if(res){
          var passwordprompt = prompt("Please enter the swapping code");
          if(passwordprompt == default_password){
            const payload = {
              "department_name":this.filterForm.get('department_name').value,
              "document_type":this.filterForm.get('document_type').value,
              "new_document_status":this.filterForm.get('new_document_status').value,
              "file_number":this.filterForm.get('file_number').value,
              
            }
            this.administrationService.postrecord(post_document_swap_url,payload).subscribe((res)=>{
              this.toastService.showToastNotification("success","Document Successfully Swapped",'')
            });

          }else{
            this.filterformstatus = true;
            this.toastService.showToastNotification("error","Invalid Swap Code Entered",'')
          }
    


        }
      }

    );



    }else{
      this
      this.toastService.showToastNotification("error","Kindly Correct the errors to proceed","")
    }
    
  }

}
