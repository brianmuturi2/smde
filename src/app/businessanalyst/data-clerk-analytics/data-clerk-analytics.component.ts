import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { DateService } from '../../common-module/shared-service/date.service';
import { AnalyticsService } from '../services/analytics.service';
import { document_status_analytics_url } from '../../app.constants';
@Component({
  selector: 'app-data-clerk-analytics',
  templateUrl: './data-clerk-analytics.component.html',
  styleUrls: ['./data-clerk-analytics.component.css']
})
export class DataClerkAnalyticsComponent implements OnInit {
  public filterForm:FormGroup;
  filterformstatus = false;
  constructor(private formBuilder: FormBuilder,public loadingService: LoadingService, public toastService: ToastService, public sweetalertService: SweetalertService,public dateService:DateService,public analyticsService:AnalyticsService) {
    this.filterForm = this.formBuilder.group({
      from_date: new FormControl('', Validators.compose([Validators.required])),
      to_date: new FormControl('', Validators.compose([Validators.required])),
      department: new FormControl(''),
      user: new FormControl(''),
    });
   }
   

  ngOnInit(): void {

  }
  filterrecords(){
    if(this.filterForm.valid){
      let payload = {
        "from_date":this.dateService.convertDate(this.filterForm.value['from_date']),
        "to_date":this.dateService.convertDate(this.filterForm.value['to_date']),
        "department_id":this.dateService.convertDate(this.filterForm.value['from_date']),
      }
      this.analyticsService.postrecord(document_status_analytics_url,payload)
     
 
    }else{
      this.filterformstatus = true;
      
    }

    
  }
}
