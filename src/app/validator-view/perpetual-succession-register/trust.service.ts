import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TrustService {
  dept = 'land-registration/';
  baseurl = 'http://127.0.0.1:8000/api/v1/';
  // baseurl = 'http://192.168.17.253:5600';
  // baseurl = 'http://192.168.214.157:8000/api/v1/';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getFileCleaningStatus(): Observable<any>  {
    return this.http.get(this.baseurl + this.dept + 'list-file-cleaning-status', {headers: this.httpHeaders});
  }

  getAllLevelOne(): Observable<any>  {
    return this.http.get(this.baseurl +  this.dept + 'level-one-data', {headers: this.httpHeaders});
  }


  getAllIncomingTrustee(): Observable<any> {
    return this.http.get(this.baseurl + this.dept + 'incoming-trustee-data', {headers: this.httpHeaders});
  }

  getAllOutgoingTrustee(): Observable<any> {
    return this.http.get(this.baseurl + this.dept + 'all-outgoing-trustees', {headers: this.httpHeaders});
  }

  getOneLevelone(id): Observable<any> {
    return this.http.get(this.baseurl + this.dept + 'level-one-data/' + id , {headers: this.httpHeaders});
  }

  getOneLevelthree(id): Observable<any> {
    return this.http.get(this.baseurl + this.dept + 'incoming-trustee-data/' + id , {headers: this.httpHeaders});
  }

  getOneTrust(id): Observable<any> {
    return this.http.get(this.baseurl + this.dept + 'incoming/' + id, {headers: this.httpHeaders});
  }

  getFile(file_no): Observable<any> {
    return this.http.get(this.baseurl + this.dept + 'document-info/' + file_no,  {headers: this.httpHeaders});
  }

  getFileComments(file_no): Observable<any> {
    return this.http.get(this.baseurl + this.dept + 'get-comments/' + file_no,  {headers: this.httpHeaders});
  }

  getOneTrustData(id): Observable<any> {
    return this.http.get(this.baseurl + this.dept + 'trustdata/' + id, {headers: this.httpHeaders});
  }

  getOneActiveTrust(id): Observable<any> {
    return this.http.get(this.baseurl + this.dept + 'members/' + id, {headers: this.httpHeaders});
  }

  createLevelone(levelone): Observable<any> {
    const body = {ps_number: levelone.ps_number, trust_name: levelone.trust_name, status: levelone.status, date_of_incorporation: levelone.date_of_incorporation, date_of_registration: levelone.date_of_registration, register: levelone.register };
    return this.http.post(this.baseurl + this.dept + 'level-one', body,  {headers: this.httpHeaders});
  }

  updateLevelone(levelone): Observable<any> {
    const body = {id: levelone.id, ps_number: levelone.ps_number, trust_name: levelone.trust_name, status: levelone.status, date_of_incorporation: levelone.date_of_incorporation, date_of_registration: levelone.date_of_registration };
    return this.http.post(this.baseurl + this.dept + 'level-one-update', body,  {headers: this.httpHeaders});
  }

  deleteLevelone(id): Observable<any> {
    const body = {id: id};
    return this.http.post(this.baseurl + this.dept + 'level-one-delete', body,  {headers: this.httpHeaders});
  }

  deleteMember(id): Observable<any> {
    const body = {id: id};
    return this.http.post(this.baseurl + this.dept + 'delete-member', body,  {headers: this.httpHeaders});
  }

  createLevelthree(incomingTrustee): Observable<any> {
    const body = {trustee_name: incomingTrustee.trustee_name, date_registered: incomingTrustee.date_registered, endorsement_date: incomingTrustee.endorsement_date,status: incomingTrustee.status, trust:incomingTrustee.trust};
    return this.http.post(this.baseurl + this.dept + 'incoming-trustee', body,  {headers: this.httpHeaders});
  }

  updateLevelthree(incomingTrustee,id): Observable<any> {
    const body = {trustee_id: id, trustee_name: incomingTrustee.trustee_name, date_registered: incomingTrustee.date_registered, endorsement_date: incomingTrustee.endorsement_date,status: incomingTrustee.status, trust:incomingTrustee.trust};
    return this.http.post(this.baseurl + this.dept + 'incoming-trustee-update', body,  {headers: this.httpHeaders});
  }

  createLevelfour(outgoingTrustee): Observable<any> {
    const body = {trustee_name: outgoingTrustee.trustee_name, replaced_by: outgoingTrustee.replaced_by, date_deregistered: outgoingTrustee.date_deregistered};
    return this.http.post(this.baseurl + this.dept + 'outgoing-trustee', body,  {headers: this.httpHeaders}).pipe(catchError(this.errorHandler));
  }

  addComments(postComments): Observable<any> {
    const body = {document: postComments.document_id, comments: postComments.remarks, general_status: postComments.general_status};
    const submiturl = 'comments';
    return this.http.post(this.baseurl + this.dept + submiturl, body,  {headers: this.httpHeaders}).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
