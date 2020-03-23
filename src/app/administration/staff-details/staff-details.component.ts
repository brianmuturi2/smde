import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { list_departments, list_user_roles, swap_user_department_url,suspend_user_url,unsuspend_user_url,reset_password_url,get_user_details_url } from '../../app.constants';
import { AdministrationService } from '../services/administration.service';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.css']
})
export class StaffDetailsComponent implements OnInit {
  user_roles_list: [] = [];
  department_list: [] = [];
  public AccountDetailsForm: FormGroup;
  public SwapDepartmentForm: FormGroup;
  public AccountActivityForm: FormGroup;
  action_list = [
    {"id":"suspend","name":"Suspend"},
    {"id":"unsuspend","name":"Un-Suspend"},
  ]


  constructor(public administrationService: AdministrationService, private formBuilder: FormBuilder, public sweetalertService: SweetalertService,private route: ActivatedRoute,
    public toastService: ToastService, public loadingService: LoadingService) {
    this.AccountDetailsForm = this.formBuilder.group({
      id: new FormControl(''),
      id_number: new FormControl(''),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      department_id: new FormControl(''),
      role_name: new FormControl(''),
    });
    this.SwapDepartmentForm = this.formBuilder.group({
      swap_department_id: new FormControl('', Validators.compose([Validators.required])),
    });
    this.AccountActivityForm = this.formBuilder.group({
      action: new FormControl('', Validators.compose([Validators.required])),
      remarks: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  ngOnInit(): void {
    
    var request_id = this.route.snapshot.paramMap.get('id');
    this.fetch_user_details(request_id);
    this.fetchalldepartments();
  }

  fetch_user_details(id){
    let payload = {
      "user_id":id
    }
    
    this.administrationService.getrecords(get_user_details_url,payload).subscribe((res)=>{
      
      let form_payload = {
        "id":res['id'],
        "id_number":res['id_number'],
        "first_name":res['first_name'],
        "last_name":res['last_name'],
        "department_id":res['department']['id'],
        "role_name":res['last_name']
      }
      this.AccountDetailsForm.setValue(form_payload);
    });


  }

  fetchallroles() {
    let payload = {
    };
    this.administrationService.getrecords(list_user_roles, payload).subscribe((res) => {
      for (let record of res) {
        this.user_roles_list.push(record);
      }

    })

  }
  fetchalldepartments() {
    let payload = {
    };
    this.administrationService.getrecords(list_departments, payload).subscribe((res) => {
      for (let record of res) {
        this.department_list.push(record);
      }

    })

  }
  swapdepartment() {
    if (this.SwapDepartmentForm.valid) {
      let payload = {
        "user_id": this.AccountDetailsForm.value['id'],
        "department_id": this.SwapDepartmentForm.value['swap_department_id'],
      };
      this.sweetalertService.showConfirmation("Confirmation", "Do you wish to proceed?").then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(swap_user_department_url, payload).subscribe((response) => {
            if (response) {
              this.loadingService.hideloading();
              this.sweetalertService.showAlert('Success', "Department Successfully Swapped", "success");
              this.SwapDepartmentForm.reset();
            }
          });
          this.loadingService.hideloading();
        }
        else {

        }
      });
    } else {
      this.administrationService.markFormAsDirty(this.SwapDepartmentForm);
      this.toastService.showToastNotification("error", "Kindly Correct the errors to proceed", "");
    }
  }
  actionaccount() {
    if (this.AccountActivityForm.valid) {
      var action = this.AccountActivityForm.value['action'];
      var endpoint_to_post_url = "";
      let success_message  = "";
      if(action == "suspend"){
        endpoint_to_post_url = suspend_user_url;
        success_message  = "Account Suspended Successfully";

      }
      else if(action == "unsuspend"){
        endpoint_to_post_url = unsuspend_user_url;
        success_message  = "Account Un Suspended Successfully"
      }

      let payload = {
        "user_id": this.AccountDetailsForm.value['id'],
        "remarks": this.AccountActivityForm.value['remarks'],
      };
      this.sweetalertService.showConfirmation("Confirmation", "Do you wish to proceed?").then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(endpoint_to_post_url, payload).subscribe((response) => {
            if (response) {
              this.loadingService.hideloading();
              this.sweetalertService.showAlert('Success', success_message, "success");
              this.AccountActivityForm.reset();
            }
          });
          this.loadingService.hideloading();
        }
        else {

        }
      });
    } else {
      this.administrationService.markFormAsDirty(this.AccountActivityForm);
      this.toastService.showToastNotification("error", "Kindly Correct the errors to proceed", "");
    }
  }
  resetpassword(){
    var user_id = this.AccountDetailsForm.value['id'];
    if(user_id == " " || user_id == null){
      this.toastService.showToastNotification("error", "No User Selected", "");
    }else{
      let payload = {
        "user_id":user_id
      }
      this.sweetalertService.showConfirmation("Confirmation", "Do you wish to reset the user password?").then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(reset_password_url, payload).subscribe((response) => {
            if (response) {
              this.loadingService.hideloading();
              this.sweetalertService.showAlert('Success', "Password Successfully Reset to Default", "success");
            }
          });
          this.loadingService.hideloading();
        }
        else {

        }
      });

    }

  }

}
