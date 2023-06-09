import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { data } from 'jquery';
import { serverurl,API_VERSION } from '../../app.constants';


@Injectable({
  providedIn: 'root'
})
export class SpecialService {
  dept = 'land-special/';
  baseurl = serverurl + API_VERSION;
  // baseurl = 'http://127.0.0.1:8000/api/v1/';
  // baseurl = 'http://192.168.17.253:5600/api/v1/';
  // baseurl = 'http://192.168.18.253:5600/api/v1/';
  // baseurl = 'http://192.168.19.253:5600/api/v1/';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  uploadFile(payload, type){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    if (type !== null)
    {
      return this.http.post(this.baseurl + this.dept + 'upload-excel', payload);
    }

    // return this.http.post(this.baseurl + this.dept + 'upload-excel', payload);
    return this.http.post(this.baseurl + this.dept + 'upload-pdf', payload);
  }

  saveSignatories(payload,instanceId): Observable<any> {
    // const body = {'instanceId': instanceId, 'signatories':signatories};
    console.log(payload)
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body = {'payload':payload,'instanceId':instanceId}
    // console.log(body);
    return this.http.post(this.baseurl + this.dept + 'signatory', body,httpOptions);
  }

  getReports(): Observable<any>  {
    return this.http.get(this.baseurl +  this.dept + 'reports', {headers: this.httpHeaders});
  }
  
  getDocumentTypes(): Observable<any>  {
    return this.http.get(this.baseurl +  this.dept + 'user-document-types', {headers: this.httpHeaders});
  }

  getDocumentTypesFields(id): Observable<any>  {
    // console.log(id);
    return this.http.get(this.baseurl +  this.dept + 'list-document-fields/' + id, {headers: this.httpHeaders});
  }

  reportClicked(id): Observable<any>  {
    // console.log(id);
    return this.http.get(this.baseurl +  this.dept + 'report-data/' + id, {headers: this.httpHeaders});
  }


  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
