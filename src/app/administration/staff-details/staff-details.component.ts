import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import {
  list_departments, list_user_roles,
  swap_user_department_url, suspend_user_url, unsuspend_user_url,
  reset_password_url, get_user_details_url, edit_user_url
} from '../../app.constants';
import { AdministrationService } from '../services/administration.service';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
    { 'id': 'suspend', 'name': 'Suspend' },
    { 'id': 'unsuspend', 'name': 'Un-Suspend' },
  ];


  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    public sweetalertService: SweetalertService, private route: ActivatedRoute,
    public toastService: ToastService, public loadingService: LoadingService) {
    this.AccountDetailsForm = this.formBuilder.group({
      id: new FormControl(''),
      username: new FormControl(''),
      id_number: new FormControl(''),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      department_id: new FormControl(''),
      role_name: new FormControl(''),
      // role_name: new FormControl(''),
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

    const request_id = this.route.snapshot.paramMap.get('id');
    this.fetch_user_details(request_id);
    this.fetchallroles();
    this.fetchalldepartments();
  }

  fetch_user_details(id) {
    const payload = {
      'user_id': id
    };

    this.administrationService.getrecords(get_user_details_url, payload).subscribe((res) => {

      const user_groups = res['user_groups'];
      const assigned_groups = [];
      for (const role of user_groups) {
        assigned_groups.push(role['id']);

      }

      const form_payload = {
        'id': res['id'],
        'username': res['username'],
        'id_number': res['id_number'],
        'first_name': res['first_name'],
        'last_name': res['last_name'],
        'department_id': res['department']['id'],
        'role_name': assigned_groups
      };
      this.AccountDetailsForm.setValue(form_payload);
    });


  }

  fetchallroles() {
    const payload = {
    };
    this.administrationService.getrecords(list_user_roles, payload).subscribe((res) => {
      for (const record of res) {
        this.user_roles_list.push(record);
      }

    });

  }
  fetchalldepartments() {
    const payload = {
    };
    this.administrationService.getrecords(list_departments, payload).subscribe((res) => {
      for (const record of res) {
        this.department_list.push(record);
      }

    });

  }
  swapdepartment() {
    if (this.SwapDepartmentForm.valid) {
      const payload = {
        'user_id': this.AccountDetailsForm.value['id'],
        'department_id': this.SwapDepartmentForm.value['swap_department_id'],
      };
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(swap_user_department_url, payload).subscribe((response) => {
            if (response) {
              this.loadingService.hideloading();
              this.sweetalertService.showAlert('Success', 'Department Successfully Swapped', 'success');
              this.SwapDepartmentForm.reset();
            }
          });
          this.loadingService.hideloading();
        } else {

        }
      });
    } else {
      this.administrationService.markFormAsDirty(this.SwapDepartmentForm);
      this.toastService.showToastNotification('error', 'Kindly Correct the errors to proceed', '');
    }
  }
  updatebiodata() {
   const assigned_roles =  this.AccountDetailsForm.value['role_name'];
    const assigned_length = assigned_roles.length;
    if (assigned_length != 1) {
      this.sweetalertService.showAlert('Error', 'You can only assign the user one role', 'error');

    }
    if (this.AccountDetailsForm.valid) {
      const payload = {
        'account_id': this.AccountDetailsForm.value['id'],
        'id_number': this.AccountDetailsForm.value['id_number'],
        'first_name': this.AccountDetailsForm.value['first_name'],
        'last_name': this.AccountDetailsForm.value['last_name'],
        'role_id': assigned_roles

      };
      this.loadingService.showloading();
      const success_message = 'Successfully Updated';
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed?').then((res) => {
        if (res) {
          this.administrationService.postrecord(edit_user_url, payload).subscribe((response) => {
            if (response) {
              this.sweetalertService.showAlert('Success', success_message, 'success');
              this.AccountActivityForm.reset();
              this.loadingService.hideloading();
            }
          });

        }
      });


    }

  }
  actionaccount() {
    if (this.AccountActivityForm.valid) {
      const action = this.AccountActivityForm.value['action'];
      let endpoint_to_post_url = '';
      let success_message = '';
      if (action == 'suspend') {
        endpoint_to_post_url = suspend_user_url;
        success_message = 'Account Suspended Successfully';

      } else if (action == 'unsuspend') {
        endpoint_to_post_url = unsuspend_user_url;
        success_message = 'Account Un Suspended Successfully';
      }

      const payload = {
        'user_id': this.AccountDetailsForm.value['id'],
        'remarks': this.AccountActivityForm.value['remarks'],
      };
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(endpoint_to_post_url, payload).subscribe((response) => {
            if (response) {
              this.loadingService.hideloading();
              this.sweetalertService.showAlert('Success', success_message, 'success');
              this.AccountActivityForm.reset();
            }
          });
          this.loadingService.hideloading();
        } else {

        }
      });
    } else {
      this.administrationService.markFormAsDirty(this.AccountActivityForm);
      this.toastService.showToastNotification('error', 'Kindly Correct the errors to proceed', '');
    }
  }
  resetpassword() {
    const user_id = this.AccountDetailsForm.value['id'];
    if (user_id == ' ' || user_id == null) {
      this.toastService.showToastNotification('error', 'No User Selected', '');
    } else {
      const payload = {
        'user_id': user_id
      };
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to reset the user password?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(reset_password_url, payload).subscribe((response) => {
            if (response) {
              this.loadingService.hideloading();
              this.sweetalertService.showAlert('Success', 'Password Successfully Reset to Default', 'success');
            }
          });
          this.loadingService.hideloading();
        } else {

        }
      });

    }

  }

}
