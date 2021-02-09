import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { data } from 'jquery';
import { serverurl,API_VERSION,fetch_user_document_types_url } from '../../app.constants';


@Injectable({
  providedIn: 'root'
})
export class UpdatorService {
  dept = 'document-updator/';
  // baseurl = 'http://127.0.0.1:8000/api/v1/';
  baseurl =  serverurl + API_VERSION  + this.dept
  // baseurl = 'http://192.168.17.253:5600/api/v1/';
  // baseurl = 'http://192.168.18.253:5600/api/v1/';
  // baseurl = 'http://192.168.19.253:5600/api/v1/';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }



  getDocumentTypes(): Observable<any>  {
    // return this.http.get(this.baseurl +  this.dept + 'user-document-types', {headers: this.httpHeaders});
    return this.http.get(fetch_user_document_types_url, {headers: this.httpHeaders});
  }

  updator(keywords): Observable<any> {
    // const body = {ps_number: levelone.ps_number, trust_name: levelone.trust_name, status: levelone.status, date_of_incorporation: levelone.date_of_incorporation, date_of_registration: levelone.date_of_registration, register: levelone.register };
    return this.http.post(this.baseurl + 'update-document', keywords,  {headers: this.httpHeaders});
  }


  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
