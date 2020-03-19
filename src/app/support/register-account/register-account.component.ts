
import { Component, ViewChild,AfterViewInit,OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig} from '../../dynamic-form/interface/dynamic-interface';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
import { SupportService } from '../services/support.service';
import { list_departments,list_user_roles,create_user_url} from '../../app.constants';
import { SweetalertService} from '../../survey-department/shared-service/sweetalerts.service';
import { ToastService } from '../../survey-department/shared-service/toast.service';
import { LoadingService } from '../../survey-department/shared-service/loading.service';
@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})

export class RegisterAccountComponent {
  @ViewChild(DynamicFormComponent) inputForm: DynamicFormComponent;
  user_roles_list:[] = [];
  department_list:[] = [];
  constructor( public supportService:SupportService,public sweetalertService:SweetalertService,
    public toastService:ToastService,public loadingService:LoadingService){


  }
  ngOnInit(){

  
  }
  ngAfterViewInit() {
    this.fetchalldepartments();
    this.fetchallroles();
    console.log(this.department_list)
    this.populateform();
}

 fetchallroles(){
   let payload = {
   };
   this.supportService.getrecords(list_user_roles,payload).subscribe((res)=>{
     for(let record of res){
      this.user_roles_list.push(record);
     }


   
   })

 }
 fetchalldepartments(){
  let payload = {
  };
  this.supportService.getrecords(list_departments,payload).subscribe((res)=>{
    for(let record of res){
      this.department_list.push(record);
     }
 
  })

}

  registeruser() {
    let payload = this.inputForm.value;
    this.sweetalertService.showConfirmation("","Do You Wish to proceed?").then((res)=>{
    
      if(res===false){
        this.toastService.showToastNotification("warning","User Cancelled Action","");

      }else{
        this.loadingService.showloading();
        this.supportService.postrecord(create_user_url,payload).subscribe((res)=>{
          if(res){
            this.sweetalertService.showAlert("Success","User Created Successfully","success");
            this.inputForm.resetForm();
            this.loadingService.hideloading();
          }
          this.loadingService.hideloading();
        })
       
        
      }

    })
  
  }
 
  populateform(){
      let new_config = [
        {
          type: "input",
          label: "ID Number",
          inputType: "text",
          name: "id_number",
          width:6,
          validations: [
            {
              name: "required",
              validator: Validators.required,
              message: "ID Number is Required"
            }
          ]
        },
        {
          type: "input",
          label: "First Name",
          inputType: "text",
          name: "first_name",
          width:6,
          validations: [
            {
              name: "required",
              validator: Validators.required,
              message: "First Name is Required"
            }
          ]
        },
        {
          type: "input",
          label: "Last Name",
          inputType: "text",
          name: "last_name",
          width:6,
          validations: [
            {
              name: "required",
              validator: Validators.required,
              message: "Last Name is Required"
            }
          ]
        },
        {
          type: "select",
          label: "User Role",
          name: "role_name",
          width:6,
          options: this.user_roles_list,
          validations: [
            {
              name: "required",
              validator: Validators.required,
              message: " Role is Required"
            }
          ]
        },
        {
          type: "select",
          label: "Department",
          width:6,
          name: "department_id",
          options: this.department_list,
          validations: [
            {
              name: "required",
              validator: Validators.required,
              message: "Department is Required"
            }
          ]
        },
        {
          type: "button",
          width:6,
          label: "Save"
        }
      ];
      this.inputForm.initialize_form(new_config);

    
    
    // this.inputForm.resetForm();

  
}
}

