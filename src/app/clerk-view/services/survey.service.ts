import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { fileuploadurl } from '../../app.constants';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(public http: HttpClient,) { }
  uploadFile(payload){
    // let applicationurl = this.tenancyGuard.getbackendserverurl('sacco_url');
    // if(!applicationurl){
    //   this.toastService.showToastNotification('error','Product not activated,Contact System Administrator','')

    // }
    // let serverurl = applicationurl + endpointurl;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(fileuploadurl, payload);
  }
  getrecord(endpointurl){

    return this.http.get<[]>(endpointurl);

  }
  getrecorddetail(endpointurl,payload){
    let options = {
      params : payload
    }


    return this.http.get<[]>(endpointurl,options);

  }
  postrecord(endpointurl,payload){
 
    return this.http.post<[]>(endpointurl, payload);
  }
  markFormAsDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
    
      // control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

}


