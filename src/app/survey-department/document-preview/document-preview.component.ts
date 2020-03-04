import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import  { FixedBoundaryCard} from '../interfaces/survey';
import {SurveyService } from '../services/survey.service';
import { LoadingService } from '../../survey-department/shared-service/loading.service';
import { document_detail_url,serverurl,fixed_boundary_document_post } from '../../app.constants';
import { DocumentsList } from '../interfaces/survey';
import { ToastService } from '../../survey-department/shared-service/toast.service';
import { Router,ActivatedRoute } from '@angular/router';
import { SweetalertService } from '../../survey-department/shared-service/sweetalerts.service';
@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.css']
})
export class DocumentPreviewComponent implements OnInit {
  public surveyForm: FormGroup;
  surveyInputRecords: Array<FixedBoundaryCard> = [];
  public show_edit:boolean = false;
  surveyrecord_info: any = {};
  preview_file :string = '';
  records: DocumentsList[] = [];
  tenant_client: string;
  reference_serial_number :string;
  constructor(private router: Router,public sweetalertsService:SweetalertService,private loadingService:LoadingService,private formBuilder: FormBuilder,public surveyService:SurveyService,private toastService:ToastService,private route: ActivatedRoute,) { 
    this.surveyForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([])),
      serial_number: new FormControl('', Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(100) ])),
      parcel_type: new FormControl('', Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(100) ])),
      plot_number: new FormControl('', Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(100) ])),
      date: new FormControl('', Validators.compose([])),
      area: new FormControl('', Validators.compose([])),
      plan_number: new FormControl('', Validators.compose([])),
      new_lr_number: new FormControl('', Validators.compose([])),
      remarks: new FormControl('', Validators.compose([])),
      file_number: new FormControl('', Validators.compose([])),
      folio_number: new FormControl('', Validators.compose([])),
      original_number: new FormControl('', Validators.compose([])),
      block_name: new FormControl('', Validators.compose([])),
      units: new FormControl('', Validators.compose([])),
      unit_number:new FormControl('', Validators.compose([])),
      
      
    });
  }

  ngOnInit(): void {
    // let tenant_client: string = this.route.params['id'];
    this.tenant_client = this.route.snapshot.paramMap.get('id');
    this.fetchRecords(this.tenant_client);

  }

  fetchRecords(payload){

    this.loadingService.showloading();
    let params = {
      "doc_id":payload
    }
     this.surveyService.getrecorddetail(document_detail_url,params).subscribe((res)=>{
      //  this.records = res;
      var alldocs = res;
       this.preview_file = serverurl +"/media/"+ alldocs['document'];
       this.loadingService.hideloading();
 
     },(err)=>{
       this.loadingService.hideloading();
       
     });
   }
  addRow() {  
    
    if(this.surveyForm.valid){
      this.reference_serial_number = this.surveyForm.value['serial_number'];
      this.surveyrecord_info = {
        id:Number(new Date()),
        serial_number:this.surveyForm.value['serial_number'],
        parcel_type:this.surveyForm.value['parcel_type'],
        plot_number:this.surveyForm.value['plot_number'],
        date:this.surveyForm.value['date'],
        area:this.surveyForm.value['area'],
        plan_number:this.surveyForm.value['plan_number'],
        new_lr_number:this.surveyForm.value['new_lr_number'],
        remarks:this.surveyForm.value['remarks'],
        file_number:this.surveyForm.value['file_number'],
        folio_number:this.surveyForm.value['folio_number'],
        original_number:this.surveyForm.value['original_number'],
        block_name:this.surveyForm.value['block_name'],
        units:this.surveyForm.value['units'],
        unit_number:this.surveyForm.value['unit_number'],
        

        
      };
  
      this.surveyInputRecords.push(this.surveyrecord_info);
      console.log(this.surveyInputRecords)
      // this.toastr.success('New row added successfully', 'New Row');
      this.surveyForm.reset();
      return true;
    }
    else{
      
      this.toastService.showToastNotification('error','Kindly Cross Check your input to proceed','');
    }
   
}

deleteRow(index) {
  var selected_obj = index.id;
  
  var matchedIndex = this.surveyInputRecords.map(function (obj) { return obj.id; }).indexOf(selected_obj);
  this.surveyInputRecords.splice(matchedIndex, 1);
  // if(this.surveyInputRecords.length ==1) {
  //   // this.toastr.error("Can't delete the row when there is only one row", 'Warning');
  //     return false;
  // } else {
  //     this.surveyInputRecords.splice(index, 1);
  //     // this.toastr.warning('Row deleted successfully', 'Delete row');
  //     return true;
  // }


}
  editRow(index){
    var selected_obj = index.id;

    // var get_specific_index = this.surveyInputRecords.find(item => item.id === selected_obj);
    var matchedIndex = this.surveyInputRecords.map(function (obj) { return obj.id; }).indexOf(selected_obj);
    // var marvelHeroes =  this.surveyInputRecords.filter(function(hero) {
    //   if(index.id == hero.id){
    //     return index;
    //   }
    // });
  
    this.show_edit = true;
    this.surveyForm.setValue(index);
    this.surveyInputRecords.splice(matchedIndex, 1);
    
  
  
  }
  saveformData(){
   
      
    let item_length = this.surveyInputRecords.length;
    if(item_length <= 0 ){
      this.toastService.showToastNotification('error','Atleast One Record Is required','');
    }
    else{
      this.sweetalertsService.showConfirmation('Data Submission','Do you to proceed saving the records?').then((res)=>{
        if(res){
          var records_passed = {
            "document_id":this.tenant_client,
            "document_type":"fixedboundarycard",
            "serial_number":this.reference_serial_number,
            "records_passed":this.surveyInputRecords
          };
          this.surveyService.postrecord(fixed_boundary_document_post,records_passed).subscribe(res =>{
            this.sweetalertsService.showAlert('Success','Successfully Submitted for Validation','success');
            // this.toastService.showToastNotification('success','Successfully Submitted for Validation','');
            this.surveyInputRecords = [];
            this.surveyForm.reset();
            this.router.navigate(['surveyofkenya/my-document']);
      
          });
  
        }
      });
 
  

    }
    

  }

}
