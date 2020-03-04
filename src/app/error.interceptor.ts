import { Injectable } from '@angular/core';
import {
HttpInterceptor, HttpRequest,
HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from './survey-department/shared-service/toast.service';
import { LoadingService } from './survey-department/shared-service/loading.service';
import { AuthenticationService } from './authentication/services/authentication.service';
@Injectable({
providedIn: 'root'
})
export class ErrorHandler{
    public onlineFlag =navigator.onLine;
 constructor(private toastService:ToastService,private loadingService:LoadingService,public authenticationService:AuthenticationService) { }
 public handleError(err: any) {
     console.log(err.status)
     if(err.status == 0){

        this.toastService.showToastNotification('error','Connection Refused','');
        this.loadingService.hideloading();
     }
     else if (err.status==401){
        //  logout user
        this.toastService.showToastNotification('error','Session Expired.Logging Out','');
        this.authenticationService.logout();

     }
     else if (err.status==404){
      //  logout user
      this.toastService.showToastNotification('error','Reference Not Found','')

   }
   else if (err.status==403){

      //  logout user

      this.toastService.showToastNotification('error','You do not have permissions to perform action','');
      this.authenticationService.logout();

   }
   else if (err.status==400){
      let error = err.error;
      let errordetail = error['details'];
      console.log(errordetail);
      this.toastService.showToastNotification('error',errordetail,'')

   }

   else {
    this.toastService.showToastNotification('error',err.message,'')
   }
  }

}