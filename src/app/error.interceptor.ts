import { Injectable } from '@angular/core';
import {
HttpInterceptor, HttpRequest,
HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoadingService } from './common-module/shared-service/loading.service';
import { ToastService } from './common-module/shared-service/toast.service';
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
      let error_type = typeof(errordetail)
      if(error_type == "string"){
         this.toastService.showToastNotification('error',errordetail,'')

      }
      else{
         let error_log = []
         for(let items of Object.keys(errordetail)){
            let selected_items = errordetail[items];
            for(let [newitems,newvalues] of Object.entries(selected_items)){
              
               error_log.push({
                  "key":newitems,
                  "error":newvalues
   
               })
   
            }
            //     }
   
         }
         for(let item of error_log){
            let arraykey = item.key;
            this.toastService.showToastNotification('error',item.error,arraykey.toUpperCase())
   
      }
      

     
      }
      // for (let [key, value] of Object.entries(errordetail)) {
      //    console.log(`${key}: ${value}`);
      //  }
      // this.toastService.showToastNotification('error',errordetail,'')

   }

   else {
    this.toastService.showToastNotification('error',err.message,'')
   }
  }

}