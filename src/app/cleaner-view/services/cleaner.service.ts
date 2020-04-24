import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { fileuploadurl } from '../../app.constants';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CleanerService {

  constructor(public http: HttpClient, ) { }
  getrecord(endpointurl) {

    return this.http.get<[]>(endpointurl);

  }
  getrecorddetail(endpointurl, payload) {
    const options = {
      params : payload
    };


    return this.http.get<[]>(endpointurl, options);

  }
  postrecord(endpointurl, payload) {

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


