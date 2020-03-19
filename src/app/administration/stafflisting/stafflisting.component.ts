

import { Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { AdministrationService } from '../services/administration.service';
import { LoadingService } from '../../survey-department/shared-service/loading.service';
import { ToastService } from '../../survey-department/shared-service/toast.service';
import { list_staff_url } from '../../app.constants';
import { Subject } from 'rxjs';
import { UserList } from '../interfaces/administration';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
@Component({
  selector: 'app-stafflisting',
  templateUrl: './stafflisting.component.html',
  styleUrls: ['./stafflisting.component.css']
})
export class StafflistingComponent implements OnInit {
  public searchForm: FormGroup;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  public dtTrigger = new Subject<any>();
  records: UserList[] = [];
  constructor(private router: Router,private loadingService:LoadingService,public toastService:ToastService,public administrationService:AdministrationService,private formBuilder: FormBuilder,) {
    this.searchForm = this.formBuilder.group({
      search_value: new FormControl('', Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(100) ])),
    });
   }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      // pageLength: 5,
      // responsive: true,
      // retrieve:true,
  


    }; 
   
  }
  filterusers(){
    if(this.searchForm.valid){
      let search_payload = {
        "username":this.searchForm.value['search_value']
      };
      this.loadingService.showloading();
      this.administrationService.getrecords(list_staff_url,search_payload).subscribe((res)=>{
        if(res){
          this.records = res;
          this.loadingService.hideloading();
          this.rerenderTable();
    
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
     });
   }
   viewdetails(request_id){
     this.router.navigate(['administration/staff-details',request_id]);

   }

}
